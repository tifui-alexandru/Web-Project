require('dotenv').config();

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

const shortTypeArtistsArray = ['rock', 'pop', 'disco', 'rap', 'jazz', 'techno', 'raggae', 'trap', 'lautareasca', 'populara'];

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
    fs.writeFileSync('db.json',
        JSON.stringify(content, null, '\t'),
        'utf-8',
        err => {
            if (err) {
                console.log(err)
            }
        });
}

for (let i = 0; i < typeArtistArray.length; ++i) {
    create(typeArtistArray[i]);
    readOne(typeArtistArray[i]);
    readAll(typeArtistArray[i]);
    update(typeArtistArray[i]);
    deleteContent(typeArtistArray[i]);
}

// login stuff -----------------------------------------------------------------------------------------------------------------------------------------

let activeUser = null;

function readJSONUsers() {
    return JSON.parse(fs.readFileSync('users_db.json'));
}

function writeJSONUsers(content) {
    fs.writeFileSync('users_db.json',
        JSON.stringify(content, null, '\t'),
        'utf-8',
        err => {
            if (err) {
                console.log(err)
            }
        });
}

// read all users
// app.get('/users', (req, res) => {
//     const users = readJSONUsers();
//     res.json(users);
// });

// get the user I have access to
app.get('/users', authenticateToken, (req, res) => {
    const users = readJSONUsers()['users'];
    const retUser = users.find(user => user.username == req.user.username);
    const retObj = {
        name: retUser.username,
        email: retUser.email,
        username: retUser.username,
        admin: retUser.admin
    };
    res.json(retObj);
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null)
        return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
}

// register user
// to do: verify if username is already used
app.post('/users', async (req, res) => {
    try {
        const usersList = readJSONUsers();

        const pass = req.body.password;
        const hashedPassword = await bcrypt.hash(pass, 10);
        const user = { 
            name: req.body.name,
            email: req.body.email,
            username: req.body.username, 
            password: hashedPassword,
            admin: req.body.admin
        };

        usersList['users'].push(user);

        writeJSONUsers(usersList);

        res.status(201).send();
    }
    catch {
        res.status(500).send();
    }
});

const refreshTokenList = []; // this should be a json

// login user
app.post('/users/login', async (req, res) => {
    // Authenticate User
    const usersList = readJSONUsers();
    const user = usersList['users'].find(user => user.username == req.body.username);

    if (user == null)
        return res.status(400).send('User not found');

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
            const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET);

            refreshTokenList.push(refreshToken);

            activeUser = user.username;

            res.json({ accessToken: accessToken, refreshToken: refreshToken });
        }
        else 
            res.status(401).send('Wrong password');
    } 
    catch {
        res.status(500).send();
    }
});

app.post('/token', (req, res) => {
    const refreshToken = req.body.token;

    if (refreshToken == null) res.sendStatus(401);
    if (!refreshTokenList.includes(refreshToken)) res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
        res.json({ accessToken: accessToken})
    });
});

app.delete('/logout', (req, res) => {
    refreshTokenList = refreshTokenList.filter(token => token != req.body.token);
    res.sendStatus(204);
});


// comm stuff -----------------------------------------------------------------------------------------------------------------------------------------

function readJSONComms(typeArtist) {
    return JSON.parse(fs.readFileSync('comms_db.json'))[typeArtist];
}

function readAllJSONComms() {
    return JSON.parse(fs.readFileSync('comms_db.json'));
}

function writeJSONComms(content) {
    fs.writeFileSync('comms_db.json',
        JSON.stringify(content, null, '\t'),
        'utf-8',
        err => {
            if (err) {
                console.log(err)
            }
        });
}

function readComm(typeArtist) {
    app.get('/comms/' + typeArtist + '/:id', (req, res) => {
        const commsList = readJSONComms(typeArtist);
        const id = req.params.id;
        let idFound = false;
        let commFound;

        commsList.forEach(comm => {
            if (id == comm.id) {
                idFound = true;
                commFound = comm;
            }
        });

        if (idFound) res.json(commFound);
        else res.status(404).send(`Comm ${id} was not found`);
    });
}

function updateComm(typeArtist) {
    app.put('/comms/' + typeArtist + '/:id', (req, res) => {
        const commsList = readJSONComms(typeArtist);
        const id = req.params.id;
        const newComm = req.body;
        newComm.id = id;
        let idFound = false;

        const newCommsList = commsList.map((comm) => {
            if (comm.id == id) {
                idFound = true;
                return newComm;
            }
            return comm;
        })


        const newComms = readAllJSONComms();
        newComms[typeArtist] = newCommsList;
        writeJSONComms(newComms);

        if (idFound)
            res.json(newComms);
        else
            res.status(404).send(`Comm ${id} was not found`);
    })
}

function postComm(typeArtist) {
    app.post('/comms/' + typeArtist, (req, res) => {
        const commsList = readJSONComms(typeArtist);
        const newComm = req.body;
        const newCommsList = [...commsList, newComm];

        const All = readAllJSONComms();
        All[typeArtist] = newCommsList;
        writeJSONComms(All);

        res.json(newComm);
    })
}

for (let i = 0; i < typeArtistArray.length; ++i) {
    readComm(shortTypeArtistsArray[i]);
    updateComm(shortTypeArtistsArray[i]);
    postComm(shortTypeArtistsArray[i]);
}


// history stuff--------------------------------------------------------------------------------------------------------------------------

function readJSONHistory() {
    return JSON.parse(fs.readFileSync('history_db.json'));
}

function writeJSONHistory(content) {
    fs.writeFileSync('history_db.json',
        JSON.stringify(content, null, '\t'),
        'utf-8',
        err => {
            if (err) {
                console.log(err)
            }
        });
} 

function getCurrentDate() {
    let today = new Date();

    return String(today.getDay()) + '-' + String(today.getMonth()) + '-' + String(today.getFullYear()) + ' ' +
    String(today.getHours()) + ':' + String(today.getMinutes()) + ':' + String(today.getSeconds()) + ':' + String(today.getMilliseconds());
}

app.post('/history', (req, res) => {
    let histList = readJSONHistory();

    const action = {
        "id": uuidv1(),
        "name": req.body.name,
        "user": activeUser,
        "date": getCurrentDate(),
        "modified_item": req.id
    }

    histList.push(action);
    writeJSONHistory(histList);

    res.json(action);
});


app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);
