const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuidv1 = require('uuid/v1');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const typeArtistArray = ['rock-artists', 'pop-artists', 'disco-artists', 'rap-artists', 'jazz-artists', 
                         'techno-artists', 'raggae-artists', 'trap-artists', 'lautareasca-artists', 'populara-artists'];

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

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

// login stuff

const users = [];

function getUsers() {
    app.get('/users', (req, res) => {
        res.json(users);
    });
}

function registerUser() {
    app.post('/users', async (req, res) => {
        try {
            let pass = req.body.password;
            let salt = await bcrypt.genSalt();
            let hashedPassword = await bcrypt.hash(pass, salt);

            let user = { username: req.body.username, password: hashedPassword };
            users.push(user);

            res.status(201).send();
        }
        catch {
            res.status(500).send();
        }
    });
}

function loginUser() {
    app.post('/users/login', async (req, res) => {
        let user = users.find(user => user.username == req.body.username);

        if (user) {
            try {
                if ( await bcrypt.compare(req.body.password, user.password))
                    res.send('Loged in');
                else
                    res.send('Loging failed');
            }
            catch {
                res.status(500).send();
            }
        }
        else {
            res.status(400).send('User could not be found');
        }
    });
}

getUsers();
registerUser();
loginUser();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);