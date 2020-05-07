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

mainTag = document.getElementsByTagName('main');
asideTag = document.getElementsByTagName('aside');

function getArtists(typeArtist) {
    artistLocalHost = musicTypeDict[typeArtist].localHost;
    fetch(artistLocalHost).then(response => {
        response.json().then(artists => {
            appendArtistsToDOM(artists, typeArtist);
        })
    });
}

function deleteArtist(typeArtist, id) {
    artistLocalHost = musicTypeDict[typeArtist].localHost;
    // fetch(artistLocalHost + '/' + id, {
    //     method: 'DELETE',
    // }).then(response => {
    //     response.json().then(artists => {
    //         getArtists(typeArtist);
    //     })
    // });
    fetch(artistLocalHost + '/' + id, {
        method: 'DELETE',
    });
    getArtists(typeArtist);
}

function postArtist(typeArtist) {
    artistLocalHost = musicTypeDict[typeArtist].localHost;

    let formName = document.getElementById('formName');
    let formImg = document.getElementById('formImg');
    let formYt = document.getElementById('formYt');
    let formActivity = document.getElementById('formActivity');

    let formType = 'Individual';
    if (document.getElementById('formatie').checked)
        formType = 'Formație';

    const postObject = {
        name: formName.value,
        img: formImg.value,
        officialYoutube: formYt.value,
        type: formType,
        yearsOfActivity: formActivity.value,
        albums: [],
        singles: []
    }

    fetch(artistLocalHost, {
        method: 'POST',

        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(postObject)
    });

    getArtists(typeArtist);

    // fetch(artistLocalHost, {
    //     method: 'POST',
    //     headers: {
    //         'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify(postObject)
    // }).then(() => {
    //     getArtists(typeArtist);
    // });
}

function updateArtist(typeArtist, putObject) {
    artistLocalHost = musicTypeDict[typeArtist].localHost;

    formName = document.getElementById('formName').value;
    formImg = document.getElementById('formImg').value;
    formActivity = document.getElementById('formActivity').value; 
    formYt = document.getElementById('formYt').value;
    if (formName) putObject.name = formName;
    if (formImg) putObject.img = formImg;
    if (formActivity) putObject.activity = formActivity;
    if (formYt) putObject.officialYoutube = formYt;

    fetch(artistLocalHost + '/' + putObject.id, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    });
    clearAddMenu(typeArtist);
    getArtists(typeArtist);
}

function postAlbum(typeArtist, artist) {
    artistLocalHost = musicTypeDict[typeArtist].localHost;

    let formName = document.getElementById('formName');
    let formNoSongs = document.getElementById('formNoSongs');
    let formRelease = document.getElementById('formRelease');

    const putAlbum = {
        nameAlbum: formName.value,
        releaseYear: formRelease.value,
        songNumber: formNoSongs.value
    }

    let putObject = artist;
    putObject.albums.push(putAlbum);

    fetch(artistLocalHost + '/' + artist.id, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    });
    clearAddMenu(typeArtist);
    getArtists(typeArtist);
}  

function postSingle(typeArtist, artist) {
    artistLocalHost = musicTypeDict[typeArtist].localHost;

    let formName = document.getElementById('formName');
    let formRelease = document.getElementById('formRelease');

    const putSingle = {
        nameSingle: formName.value,
        releaseYear: formRelease.value,
    }

    let putObject = artist;
    putObject.singles.push(putSingle);

    fetch(artistLocalHost + '/' + artist.id, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    });
    clearAddMenu(typeArtist);
    getArtists(typeArtist);
}

function displayDetalis(typeArtist, id) {
    artistLocalHost = musicTypeDict[typeArtist].localHost;
    fetch(artistLocalHost + '/' + id, {
        method: 'GET',
    }).then(respone => {
        respone.json().then(artist => {
            appendDetailsToDOM(typeArtist ,artist);
            clearArtists(typeArtist);
        })
    });
}

function clearArtists(typeArtist) {
    let artistsElement = musicTypeDict[typeArtist].element;
    if (artistsElement) {
        while (artistsElement.firstChild)
            artistsElement.removeChild(artistsElement.firstChild);
    }   
}

function startWebPage() {
    for (let i = 0; i < musicTypeArray.length; ++i) {
        let elem = document.getElementById(musicTypeArray[i] + "_button");
        elem.addEventListener('click', () => {
            updateMain(musicTypeArray[i]);
            getArtists(musicTypeArray[i]);
        });
    }
}

homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', () => {
    location.href = 'http://localhost:3000';
});

startWebPage();