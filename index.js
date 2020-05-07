const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuidv1 = require('uuid/v1');
const path = require('path');
const fs = require('fs');

const typeArtistArray = ['rock-artists', 'pop-artists', 'disco-artists', 'rap-artists', 'jazz-artists', 
                         'techno-artists', 'raggae-artists', 'trap-artists', 'lautareasca-artists', 'populara-artists'];

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());

function create(typeArtist) {
    app.post('/' + typeArtist, (req, res) => {
        const artistsList = readJSONFile(typeArtist);
        const newArtist = req.body;
        newArtist.id = uuidv1();
        const newArtistList = [...artistsList, newArtist];

        const musicTypes = readAllJSONFile();
        musicTypes[typeArtist] = newArtistList;
        writeJSONFile(musicTypes);

        res.json(newArtist);
    });
}

function readOne(typeArtist) {
    app.get('/' + typeArtist + '/:id', (req, res) => {
        const artistsList = readJSONFile(typeArtist);
        const id = req.params.id;
        let idFound = false;
        let artistFound;

        artistsList.forEach(artist => {
            if (id == artist.id) {
                idFound = true;
                artistFound = artist;
            }
        });

        if (idFound) res.json(artistFound);
        else res.status(404).send(`Artist ${id} was not found`);
    });
}

function readAll(typeArtist) {
    app.get('/' + typeArtist, (req, res) => {
        const artistsList = readJSONFile(typeArtist);
        res.json(artistsList);
    });
}

function update(typeArtist) {
    app.put('/' + typeArtist + '/:id', (req, res) => {
        const artistsList = readJSONFile(typeArtist);
        const id = req.params.id;
        const newArtist = req.body;
        newArtist.id = id;
        idFound = false;

        const newArtistList = artistsList.map((artist) => {
            if (artist.id == id) {
                idFound = true;
                return newArtist;
            }
            return artist;
        })

        const musicTypes = readAllJSONFile();
        musicTypes[typeArtist] = newArtistList;
        writeJSONFile(musicTypes);

        if (idFound)
            res.json(newArtist);
        else
            res.status(404).send(`Artist ${id} was not found`);
    });
}

function deleteContent(typeArtist) {
    app.delete('/' + typeArtist + '/:id', (req, res) => {
        const artistsList = readJSONFile(typeArtist);
        const id = req.params.id;
        const newArtistList = artistsList.filter((artist) => artist.id != id);

        if (artistsList.length == newArtistList.length)
            res.status(404).send(`Artist ${id} was not found`);
        else {
            res.status(200).send(`Artist ${id} was removed`);
            const musicTypes = readAllJSONFile();
            musicTypes[typeArtist] = newArtistList;
            writeJSONFile(musicTypes);
        }
    });
}

function readJSONFile(typeArtist) {
    return JSON.parse(fs.readFileSync('db.json'))[typeArtist];
}

function readAllJSONFile() {
    return JSON.parse(fs.readFileSync('db.json'));
}

function writeJSONFile(content) {
    fs.writeFileSync('db.json', JSON.stringify(content), 'utf8', err => {
        if (err) console.log(err);
    });
}

for (let i = 0; i < typeArtistArray.length; ++i) {
    create(typeArtistArray[i]);
    readOne(typeArtistArray[i]);
    readAll(typeArtistArray[i]);
    update(typeArtistArray[i]);
    deleteContent(typeArtistArray[i]);
}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
    res.redirect('index.html');
});

app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);