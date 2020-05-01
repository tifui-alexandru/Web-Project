const musicTypeArray = ['rock', 'pop', 'disco', 'rap', 'jazz', 'techno', 'raggae', 'trap', 'lautareasca', 'populara'];
const musicTypeDict = {
    rock: {
        element: document.getElementById('rock'),
        localHost: 'http://localhost:3000/rock-artists'
    },
    pop: {
        element: document.getElementById('pop'),
        localHost: 'http://localhost:3000/pop-artists'
    },
    disco: {
        element: document.getElementById('disco'),
        localHost: 'http://localhost:3000/disco-artists'
    },
    rap: {
        element: document.getElementById('rap'),
        localHost: 'http://localhost:3000/rap-artists'
    },
    jazz: {
        element: document.getElementById('jazz'),
        localHost: 'http://localhost:3000/jazz-artists'
    },
    techno: {
        element: document.getElementById('techno'),
        localHost:'http://localhost:3000/techno-artists'
    },
    raggae: {
        element: document.getElementById('raggae'),
        localHost: 'http://localhost:3000/raggae-artists'
    },
    trap: {
        element: document.getElementById('trap'),
        localHost: 'http://localhost:3000/trap-artists'
    },
    lautareasca: {
        element: document.getElementById('lautareasca'),
        localHost: 'http://localhost:3000/lautareasca-artists'
    },
    populara: {
        element: document.getElementById('populara'),
        localHost: 'http://localhost:3000/populara-artists'
    }
};

function updateMain(musicType) {
    let mainTag = document.getElementsByTagName('MAIN');
    mainTag[0].parentNode.removeChild(mainTag[0]);

    let subtitle = document.getElementById('subtitle');
    subtitle.parentNode.removeChild(subtitle);

    let text = document.createElement('span');
    text.innerText = 'Cele mai importante trupe de ' + musicType + ' din România';

    document.body.appendChild(text);

    return false;
}

function appendArtistsToDOM(artists, typeArtist) {
    artistsElement = musicTypeDict[typeArtist].element;

    while (artistsElement.firstChild)
        artistsElement.removeChild(artistsElement.firstChild);
    
    for (let i = 0; i < artists.length; ++i) {
        let img = document.createElement('img');
        img.src = artists[i].img;

        let name = document.createElement('span');
        name.innerText = artists[i].name;

        let detailsButton = document.createElement('button');
        detailsButton.addEventListener('click', () => {
            console.log('to be continued');
        });

        let editButton = document.createElement('button')
        editButton.addEventListener('click', () => {
            editArtist(typeArtist, artists[i].id);
        });
        editButton.innerText = 'Edit';

        let deleteButton = document.createElement('button')
        deleteButton.addEventListener('click', () => {
            deleteArtist(typeArtist, artists[i].id)
        });
        deleteButton.innerText = 'Remove';

        let container = document.createElement('div');
        container.appendChild(img);
        container.appendChild(name);
        container.appendChild(detailsButton);
        container.appendChild(editButton);
        container.appendChild(deleteButton);
        
        artistsElement.appendChild(container);
    }
}

function getArtists(typeArtist) {
    artistLocalHost = musicTypeDict[typeArtist].localHost;
    fetch(artistLocalHost).then(response => {
        response.json().then(artists => {
            appendArtistsToDOM(artists, typeArtist);
        })
    });
}

function deleteArtist(id, typeArtist) {
    // artistLocalHost = musicTypeDict[typeArtist];
    // fetch(artistLocalHost + id, {
    //     method: 'DELETE',
    // }).then(() => {
    //     getArtists(typeArtist);
    // });
    console.log('to be continued');
}

function postArtist(typeArtist) {
    console.log('to be continued');
}

function updateArtist(id, typeArtist) {
    console.log('to be coninued');
}

function editArtist(id, typeArtist) {
    console.log('to be continued');
}

const buttonFunctions = {
    rock: function() {
        updateMain('rock');
        getArtists('rock');
    },
    pop: function() {
        updateMain('pop');
        getArtists('pop');
    },
    disco: function() {
        updateMain('disco');
        getArtists('disco');
    },
    rap: function() {
        updateMain('rap/hip-hop');
        getArtists('rap');
    },
    jazz: function() {
        updateMain('jazz');
        getArtists('jazz');
    },
    techno: function() {
        updateMain('techno');
        getArtists('techno');
    },
    raggae: function() {
        updateMain('raggae');
        getArtists('raggae');
    },
    trap: function() {
        updateMain('trap');
        getArtists('trap');
    },
    lautareasca: function() {
        updateMain('muzică lăutărească');
        getArtists('lautareasca');
    },
    populara: function() {
        updateMain('muzică populară');
        getArtists('populara');
    }  
};

for (let i = 0; i < musicTypeArray.length; ++i) {
    let elem = document.getElementById(musicTypeArray[i] + "_button");
    elem.addEventListener('click', buttonFunctions[musicTypeArray[i]]);
}