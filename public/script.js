let currentPage = 'homePage';
localStorage.setItem('activeUser', null);

const musicTypeArray = ['rock', 'pop', 'disco', 'rap', 'jazz', 'techno', 'raggae', 'trap', 'lautareasca', 'populara'];
const musicTypeDict = {
    rock: {
        localHost: 'http://localhost:3000/rock-artists'
    },
    pop: {
        localHost: 'http://localhost:3000/pop-artists'
    },
    disco: {
        localHost: 'http://localhost:3000/disco-artists'
    },
    rap: {
        localHost: 'http://localhost:3000/rap-artists'
    },
    jazz: {
        localHost: 'http://localhost:3000/jazz-artists'
    },
    techno: {
        localHost: 'http://localhost:3000/techno-artists'
    },
    raggae: {
        localHost: 'http://localhost:3000/raggae-artists'
    },
    trap: {
        localHost: 'http://localhost:3000/trap-artists'
    },
    lautareasca: {
        localHost: 'http://localhost:3000/lautareasca-artists'
    },
    populara: {
        localHost: 'http://localhost:3000/populara-artists'
    }
};

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
    fetch(artistLocalHost + '/' + id, {
        method: 'DELETE',
    })
    getArtists(typeArtist);
}

function postArtist(typeArtist) {
    artistLocalHost = musicTypeDict[typeArtist].localHost;

    let formName = document.getElementById('formName');
    let formImg = document.getElementById('formImg');
    let formYt = document.getElementById('formYt');
    let formActivity = document.getElementById('formActivity');

    let formType = 'Artist individual';
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
}

function updateArtist(typeArtist, putObject) {
    artistLocalHost = musicTypeDict[typeArtist].localHost;

    formName = document.getElementById('formName').value;
    formImg = document.getElementById('formImg').value;
    formActivity = document.getElementById('formActivity').value;
    formYt = document.getElementById('formYt').value;
    if (formName) putObject.name = formName;
    if (formImg) putObject.img = formImg;
    if (formActivity) putObject.yearsOfActivity = formActivity;
    if (formYt) putObject.officialYoutube = formYt;

    fetch(artistLocalHost + '/' + putObject.id, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    });
    clearAddMenu(typeArtist);
}

function addAlbum(typeArtist, artist) {
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
}

function addSingle(typeArtist, artist) {
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
}

function displayDetalis(typeArtist, id) {
    artistLocalHost = musicTypeDict[typeArtist].localHost;
    fetch(artistLocalHost + '/' + id, {
        method: 'GET',
    }).then(respone => {
        respone.json().then(artist => {
            appendDetailsToDOM(typeArtist, artist);
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

function displayLoginPageStyle(data) {
    let loginButton = document.getElementById('login-button');
    if (loginButton) {
        let container = loginButton.parentNode;
        container.removeChild(loginButton);
    
        let profileButton = document.createElement('button');
        profileButton.id = 'profile-button';
        profileButton.className = 'header_button';
        profileButton.addEventListener('click', () => {
            currentPage = 'profilePage';
            displayProfileMenu({ accessToken: data.accessToken, refreshToken: data.refreshToken });
        });
        profileButton.innerText = 'Profilul meu';
        container.appendChild(profileButton);
                    
        let mainPage = document.getElementById('main_container');
        mainPage.innerHTML = mainPageHTML;
        startWebPage();
    }
}

function startWebPage() {
    if (localStorage.getItem('loggedOn') == 'true') {
        let accessToken = localStorage.getItem('accessToken');
        let refreshToken = localStorage.getItem('refreshToken');
        displayLoginPageStyle({ accessToken: accessToken, refreshToken: refreshToken });
    }

    showImg();
    for (let i = 0; i < musicTypeArray.length; ++i) {
        let elem = document.getElementById(musicTypeArray[i] + "_button");
        musicTypeDict[musicTypeArray[i]].element = document.getElementById(musicTypeArray[i]);
        elem.addEventListener('click', () => {
            currentPage = 'artistsList_' + musicTypeArray[i];
            updateMain(musicTypeArray[i]);
            getArtists(musicTypeArray[i]);
        });
    }
}

homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', () => {
    currentPage = 'homePage'
    let mainPage = document.getElementById('main_container');
    mainPage.innerHTML = mainPageHTML;
    startWebPage();
});

function timeSpentOnSite(pageAndUser) {
    let ans = parseInt(localStorage.getItem(pageAndUser));
    if (isNaN(ans)) ans = 0;
    return ans;
}

if (typeof (Storage) !== 'undefined') {
    let start = Date.now();
    let footer = document.getElementById('response');

    let timer = setInterval(() => {
        let pageAndUser = currentPage + '_' + String(localStorage.getItem('activeUser'));

        let time = timeSpentOnSite(pageAndUser) + (Date.now() - start);
        localStorage.setItem(pageAndUser, time);
        start = parseInt(Date.now());

        let minutes = parseInt(time / 60000);
        let seconds = parseInt(time / 1000) - minutes * 60;

        if (localStorage.getItem('loggedOn') != 'false')
            footer.innerText = 'Ai petrecut în total: ' + minutes + ' minute și ' + seconds + ' secunde pe această pagină';
        else footer.innerText = 'Salut!';

    }, 1000);
}
else
    document.getElementById('response').innerText = 'No Local Storage support';

let mainPageHTML = document.getElementById('main_container').innerHTML;

startWebPage();

function showImg() {
    const images = document.getElementsByClassName('artist-img');
    let button = document.getElementById('hide-img-button');
    let newButton = button.cloneNode(true);
    newButton.innerText = 'Ascunde imaginile';
    newButton.className = 'hide-img-button';
    newButton.id = 'hide-img-button';

    button.parentNode.replaceChild(newButton, button);

    newButton.addEventListener('click', () => {
        for (let i = 0; i < images.length; ++i) {
            images[i].style.display = 'none';
        }
        hideImg();
    });
}

function hideImg() {
    const images = document.getElementsByClassName('artist-img');
    let button = document.getElementById('hide-img-button');
    let newButton = button.cloneNode(true);
    newButton.innerText = 'Arată imaginile';
    newButton.className = 'hide-img-button';
    newButton.id = 'hide-img-button';

    button.parentNode.replaceChild(newButton, button);

    newButton.addEventListener('click', () => {
        for (let i = 0; i < images.length; ++i) {
            images[i].style.display = 'block';
        }
        showImg();
    });
}

function clearAllArtists() {
    for (let i = 0; i < musicTypeArray.length; ++i) {
        clearArtists(musicTypeArray[i])
    }
}