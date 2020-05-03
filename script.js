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

function adminCheck() {
    return true;
    let text = window.prompt('Pentru a modifica pagina vă rugăm să intoduceți parola de admin');
    if (text == 'password') return true;
    window.alert('Parolă greșită!');
    return false;
}

function updateMain(typeArtist) {
    musicType = typeArtist;
    if (typeArtist == 'rap')
        musicType = 'rap/hip-hop';
    else if (typeArtist == 'populara')
        musicType = 'muzică populară';
    else if (typeArtist == 'lautareasca')
        musicType = 'muzică lăutărească';

    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);

    let subtitle = document.getElementById('subtitle');
    if (subtitle)
        subtitle.parentNode.removeChild(subtitle);

    let text = document.createElement('span');
    text.innerText = 'Cele mai importante trupe de ' + musicType + ' din România';
    text.className = 'subtitle_text';

    let addButton = document.createElement('button');
    addButton.addEventListener('click', () => {
        if (adminCheck())
            displayAddMenu(typeArtist);
    });
    addButton.innerText = 'Adaugă trupă';

    mainTag[0].appendChild(text);
    mainTag[0].appendChild(addButton);

    return false;
}

function appendArtistsToDOM(artists, typeArtist) {
    artistsElement = musicTypeDict[typeArtist].element;

    while (artistsElement.firstChild)
        artistsElement.removeChild(artistsElement.firstChild);
    
    for (let i = 0; i < artists.length; ++i) {
        let name = document.createElement('span');
        name.innerText = artists[i].name;
        name.className = 'formation_name';

        let img = document.createElement('img');
        img.src = artists[i].img;
        img.alt = artists[i].name;
        img.className = 'formation_image';

        let detailsButton = document.createElement('button');
        detailsButton.addEventListener('click', () => {
            displayDetalis(typeArtist, artists[i].id);
        });
        detailsButton.innerText = 'Detalii';

        let editButton = document.createElement('button');
        editButton.addEventListener('click', () => {
            if (adminCheck())
                editArtist(typeArtist, artists[i]);
        });
        editButton.innerText = 'Editează';

        let deleteButton = document.createElement('button');
        deleteButton.addEventListener('click', () => {
            if (adminCheck())
                deleteArtist(typeArtist, artists[i].id)
        });
        deleteButton.innerText = 'Șterge';

        let container = document.createElement('div');
        container.appendChild(img);
        container.appendChild(name);
        container.appendChild(detailsButton);
        container.appendChild(editButton);
        container.appendChild(deleteButton);
        
        artistsElement.appendChild(container);
    }
}

function appendDetailsToDOM(artist) {
    let name = document.createElement('span');
    name.innerText = artist.name;

    let img = document.createElement('img');
    img.src = artist.img;
    img.alt = artist.name;

    let type = document.createElement('span');
    type.innerText = artist.type;

    let activity = document.createElement('span');
    activity.innerText = 'Ani de activitate: ' + artist.yearsOfActivity;

    let ytLink = document.createElement('span');
    activity.innerText = 'Link către canalul de Youtube: ' + artist.officialYoutube;

    let info = document.createElement('div');
    info.appendChild(type);
    info.appendChild(activity);
    info.appendChild(ytLink);

    let albums = document.createElement('div');
    let text = document.createElement('span');
    text.innerText = 'Albume: '
    albums.appendChild(text);
    albums.className = 'album_container';
    for (let i = 0; i < artist.albums.length; ++i) {
        let albumName = document.createElement('span');
        albumName.innerText = 'Nume album: ' + artist.albums[i].nameAlbum;

        let year = document.createElement('span');
        year.innerText = 'Anul lansării: ' + artist.albums[i].releaseYear;

        let songsNo = document.createElement('span');
        songsNo.innerText = 'Numărul de melodii de pe album: ' + artist.albums[i].songNumber;

        let album = document.createElement('div');
        album.className = 'album';
        album.appendChild(albumName);
        album.appendChild(year);
        album.appendChild(songsNo);
        
        albums.appendChild(album);
    }

    let singles = document.createElement('div');
    text = document.createElement('span');
    text.innerText = 'Single-uri: '
    singles.appendChild(text);
    singles.className = 'single_container';
    for (let i = 0; i < artist.singles.length; ++i) {
        let singleName = document.createElement('span');
        singleName.innerText = 'Nume single: ' + artist.singles[i].nameSingle;

        let year = document.createElement('span');
        year.innerText = 'Anul lansării: ' + artist.singles[i].releaseYear;

        let single = document.createElement('div');
        single.className = 'single';
        single.appendChild(singleName);
        single.appendChild(year);
        
        singles.appendChild(single);
    }

    let artistDetails = document.createElement('div');
    artistDetails.className = 'artist_details';
    artistDetails.appendChild(img);
    artistDetails.appendChild(name);
    artistDetails.appendChild(info);
    artistDetails.appendChild(albums);
    artistDetails.appendChild(singles);

    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);
    mainTag[0].appendChild(artistDetails);
}

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
    }).then(() => {
        getArtists(typeArtist);
    });
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
    }).then(() => {
        getArtists(typeArtist);
    });
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
    }).then(function () {
        clearAddMenu(typeArtist);
    });
}

function editArtist(typeArtist, artist) {
    let labelName = getLabel('name', 'Nume artist/formație');
    let formName = getInput('name', 'formName', artist.name);
    let labelImg = getLabel('url', 'URL imagine artist/formație');
    let formImg = getInput('url', 'formImg', artist.img);
    let labelYt = getLabel('url', 'URL canal oficial de Youtube');
    let formYt = getInput('url', 'formYt', artist.officialYoutube);
    let labelActivity = getLabel('time', 'Perioadă de activitate');
    let formActivity = getInput('time', 'formActivity', artist.yearsOfActivity);

    let addAlbumButton = document.createElement('button');
    addAlbumButton.addEventListener('click', () => {
        if (adminCheck())
            displayAddAlbumMenu(typeArtist, artist);
    });
    addAlbumButton.innerText = 'Adaugă album';
    let addSingleButton = document.createElement('button');
    addSingleButton.addEventListener('click', () => {
        if (adminCheck())
            displayAddSingleMenu(typeArtist, artist);
    });
    addSingleButton.innerText = 'Adaugă single';

    let container = document.createElement('div');
    container.className = 'artist_details';
    container.id = 'display_menu';

    container.appendChild(labelName);
    container.appendChild(formName);
    container.appendChild(labelImg);
    container.appendChild(formImg);
    container.appendChild(labelYt);
    container.appendChild(formYt);
    container.appendChild(labelActivity);
    container.appendChild(formActivity);
    container.appendChild(addAlbumButton);
    container.appendChild(addSingleButton);

    let updateButton = document.createElement('button');
    updateButton.addEventListener('click', () => {
        postArtist(typeArtist);
        clearAddMenu(typeArtist);
    });
    updateButton.innerText = 'Salvează';
    updateButton.id = 'update-button'

    let cancelButton = document.createElement('button');
    cancelButton.addEventListener('click', () => {
        clearAddMenu(typeArtist);
    });
    cancelButton.innerText = 'Anulează';

    container.appendChild(updateButton);
    container.appendChild(cancelButton);

    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);
    mainTag[0].appendChild(container);

    clearArtists(typeArtist);

    let newUpdateButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
    updateButton = document.getElementById('update-button');

    updateButton.addEventListener('click', () => {
        updateArtist(typeArtist, artist);
    });
}

function postAlbum(typeArtist, artist) {
    artistLocalHost = musicTypeDict[typeArtist].localHost;

    let formName = document.getElementById('formName');
    let formNoSongs = document.getElementById('formNoSongs');
    let formRelease = document.getElementById('formRelease');

    const postAlbum = {
        nameAlbum: formName.value,
        releaseYear: formRelease.value,
        songNumber: formNoSongs.value
    }

    postObject = artist;
    postObject.albums.push(postAlbum);

    deleteArtist(typeArtist, artist.id);

    fetch(artistLocalHost, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(postObject)
    }).then(() => {
        getArtists(typeArtist);
    });
}  

function postSingle(typeArtist, artist) {
    artistLocalHost = musicTypeDict[typeArtist].localHost;

    let formName = document.getElementById('formName');
    let formRelease = document.getElementById('formRelease');

    const postSingle = {
        nameSingle: formName.value,
        releaseYear: formRelease.value,
    }

    postObject = artist;
    postObject.singles.push(postSingle);

    deleteArtist(typeArtist, artist.id);

    fetch(artistLocalHost, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(postObject)
    }).then(() => {
        getArtists(typeArtist);
    });
}

function displayAddAlbumMenu(typeArtist, artist) {
    let labelName = getLabel('name', 'Nume album: ');
    let formName = getInput('name', 'formName', '');
    let labelNoSongs = getLabel('song', 'Număr de piese pe album: ');
    let formNoSongs = getInput('song', 'formNoSongs', '');
    let labelRelease = getLabel('release', 'Anul lansării: ');
    let formRelease = getInput('release', 'formRelease', '');

    let container = document.createElement('div');
    container.className = 'artist_details';

    container.appendChild(labelName);
    container.appendChild(formName);
    container.appendChild(labelNoSongs);
    container.appendChild(formNoSongs);
    container.appendChild(labelRelease);
    container.appendChild(formRelease);

    let updateButton = document.createElement('button');
    updateButton.addEventListener('click', () => {
        postAlbum(typeArtist, artist);
        clearAddMenu(typeArtist);
    });
    updateButton.innerText = 'Salvează';
    updateButton.id = 'update-button';

    let cancelButton = document.createElement('button');
    cancelButton.addEventListener('click', () => {
        clearAddMenu(typeArtist);
    });
    cancelButton.innerText = 'Anulează';

    container.appendChild(updateButton);
    container.appendChild(cancelButton);

    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);
    mainTag[0].appendChild(container);

    clearArtists(typeArtist);
}

function displayAddSingleMenu(typeArtist, artist) {
    let labelName = getLabel('name', 'Nume album: ');
    let formName = getInput('name', 'formName', '');
    let labelRelease = getLabel('release', 'Anul lansării: ');
    let formRelease = getInput('release', 'formRelease', '');

    let container = document.createElement('div');
    container.className = 'artist_details';

    container.appendChild(labelName);
    container.appendChild(formName);
    container.appendChild(labelRelease);
    container.appendChild(formRelease);

    let updateButton = document.createElement('button');
    updateButton.addEventListener('click', () => {
        postSingle(typeArtist, artist);
        clearAddMenu(typeArtist);
    });
    updateButton.innerText = 'Salvează';
    updateButton.id = 'button-menu';

    let cancelButton = document.createElement('button');
    cancelButton.addEventListener('click', () => {
        clearAddMenu(typeArtist);
    });
    cancelButton.innerText = 'Anulează';

    container.appendChild(updateButton);
    container.appendChild(cancelButton);

    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);
    mainTag[0].appendChild(container);

    clearArtists(typeArtist);
}

function displayDetalis(typeArtist, id) {
    artistLocalHost = musicTypeDict[typeArtist].localHost;
    fetch(artistLocalHost + '/' + id, {
        method: 'GET',
    }).then(respone => {
        respone.json().then(artist => {
            appendDetailsToDOM(artist);
            clearArtists(typeArtist);
        })
    });
}

function getLabel(str1, str2) {
    let label = document.createElement('label');
    label.htmlFor = str1;
    label.innerText = str2;
    return label;
}

function getInput(name, id, placeholder) {
    let temp = document.createElement('input');
    temp.type = 'text';
    temp.name = name;
    temp.id = id;
    temp.placeholder = placeholder;
    return temp;
}

function getCheckbox(str) {
    let temp = document.createElement('input');
    temp.type = 'checkbox';
    temp.id = str;
    temp.name = str;
    temp.value = str;
    return temp;
}

function displayAddMenu(typeArtist) {
    let labelName = getLabel('name', 'Nume artist/formație');
    let formName = getInput('name', 'formName', '');
    let labelImg = getLabel('url', 'URL imagine artist/formație');
    let formImg = getInput('url', 'formImg', '');
    let labelYt = getLabel('url', 'URL canal oficial de Youtube');
    let formYt = getInput('url', 'formYt', '');
    let labelActivity = getLabel('time', 'Perioadă de activitate');
    let formActivity = getInput('time', 'formActivity', '');

    let individulLabel = getLabel('individual', 'Individual');
    let individual = getCheckbox('individual');
    let formatieLabel = getLabel('formatie', 'Formație');
    let formatie = getCheckbox('formatie');

    let container = document.createElement('div');
    container.className = 'artist_details';
    container.id = 'display_menu';

    container.appendChild(labelName);
    container.appendChild(formName);
    container.appendChild(labelImg);
    container.appendChild(formImg);
    container.appendChild(labelYt);
    container.appendChild(formYt);
    container.appendChild(labelActivity);
    container.appendChild(formActivity);
    container.appendChild(individulLabel)
    container.appendChild(individual);
    container.appendChild(formatieLabel);
    container.appendChild(formatie);

    let updateButton = document.createElement('button');
    updateButton.addEventListener('click', () => {
        postArtist(typeArtist);
        clearAddMenu(typeArtist);
    });
    updateButton.innerText = 'Salvează';
    updateButton.id = 'update-button'

    let cancelButton = document.createElement('button');
    cancelButton.addEventListener('click', () => {
        clearAddMenu(typeArtist);
    });
    cancelButton.innerText = 'Anulează';

    container.appendChild(updateButton);
    container.appendChild(cancelButton);

    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);
    mainTag[0].appendChild(container);

    clearArtists(typeArtist);
}

function clearAddMenu(typeArtist) {
    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);
    updateMain(typeArtist);
    getArtists(typeArtist);
}

function clearArtists(typeArtist) {
    let artistsElement = musicTypeDict[typeArtist].element;
    if (artistsElement) {
        while (artistsElement.firstChild)
            artistsElement.removeChild(artistsElement.firstChild);
    }   
}

for (let i = 0; i < musicTypeArray.length; ++i) {
    let elem = document.getElementById(musicTypeArray[i] + "_button");
    elem.addEventListener('click', () => {
        updateMain(musicTypeArray[i]);
        getArtists(musicTypeArray[i]);
    });
}