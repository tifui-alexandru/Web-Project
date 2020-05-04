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

    let textContainer = document.createElement('div');
    textContainer.className = 'content-message';
    let text = document.createElement('span');
    text.innerText = 'Cei mai importanți artiști de ' + musicType + ' din România:';
    text.className = 'message';
    textContainer.appendChild(text);

    let addButton = document.createElement('button');
    addButton.className = 'button';
    addButton.addEventListener('click', () => {
        if (adminCheck())
            displayAddMenu(typeArtist);
    });
    addButton.innerText = 'Adaugă trupă';
    let addButtonContainer = document.createElement('div');
    addButtonContainer.appendChild(addButton);
    addButtonContainer.className = 'add_band_button-container'

    mainTag[0].appendChild(textContainer);
    mainTag[0].appendChild(addButtonContainer);

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
        detailsButton.className = 'button';
        detailsButton.addEventListener('click', () => {
            displayDetalis(typeArtist, artists[i].id);
        });
        detailsButton.innerText = 'Detalii';

        let editButton = document.createElement('button');
        editButton.className = 'button';
        editButton.addEventListener('click', () => {
            if (adminCheck())
                editArtist(typeArtist, artists[i]);
        });
        editButton.innerText = 'Editează';

        let deleteButton = document.createElement('button');
        deleteButton.className = 'button';
        deleteButton.addEventListener('click', () => {
            if (adminCheck())
                deleteArtist(typeArtist, artists[i].id)
        });
        deleteButton.innerText = 'Șterge';

        let container = document.createElement('div');
        container.className = 'container_formation';
        container.appendChild(detailsButton);
        container.appendChild(editButton);
        container.appendChild(deleteButton);

        let bigContainer = document.createElement('div');
        bigContainer.className = 'big_container_formation';
        bigContainer.appendChild(img);
        bigContainer.appendChild(container);

        let biggerContainer = document.createElement('div');
        biggerContainer.className = 'artist-box';
        biggerContainer.appendChild(name);
        biggerContainer.appendChild(bigContainer);
        
        artistsElement.appendChild(biggerContainer);
    }
}

function appendDetailsToDOM(typeArtist, artist) {
    let name = document.createElement('p');
    name.className = 'details_text';
    name.innerText = artist.name;
    name.className = 'formation_name_details';

    let img = document.createElement('img');
    img.className = 'formation_image_details';
    img.src = artist.img;
    img.alt = artist.name;

    let type = document.createElement('p');
    type.innerText = artist.type;
    type.className = 'details_text';

    let activity = document.createElement('p');
    activity.innerText = 'Ani de activitate: ' + artist.yearsOfActivity;
    activity.className = 'details_text';

    let ytLink = document.createElement('a');
    ytLink.innerText = 'Link către canalul de Youtube';
    ytLink.href = artist.officialYoutube;
    ytLink.className = 'details_text';

    let info = document.createElement('div');
    info.className = 'details_info';

    let backButton = document.createElement('button');
    backButton.innerText = 'Înapoi';
    backButton.className = 'back_button';
    backButton.addEventListener('click', () => {
        clearAddMenu(typeArtist);
    });
    info.appendChild(backButton);

    let infoTetx = document.createElement('div');
    infoTetx.className = 'info_text';
    
    infoTetx.appendChild(type);
    infoTetx.appendChild(activity);
    infoTetx.appendChild(ytLink);

    info.appendChild(infoTetx);

    let albums = document.createElement('div');
    let text = document.createElement('p');
    text.className = 'album_name';
    text.innerText = 'Albume: '
    albums.appendChild(text);
    albums.className = 'album_container';
    for (let i = 0; i < artist.albums.length; ++i) {
        let albumName = document.createElement('p');
        albumName.innerText = 'Nume album: ' + artist.albums[i].nameAlbum;

        let year = document.createElement('p');
        year.innerText = 'Anul lansării: ' + artist.albums[i].releaseYear;

        let songsNo = document.createElement('p');
        songsNo.innerText = 'Numărul de melodii de pe album: ' + artist.albums[i].songNumber;

        let album = document.createElement('div');
        album.className = 'album';
        album.appendChild(albumName);
        album.appendChild(year);
        album.appendChild(songsNo);
        
        albums.appendChild(album);
    }

    let singles = document.createElement('div');
    text = document.createElement('p');
    text.innerText = 'Single-uri:'
    text.className = 'album_name';
    singles.appendChild(text);
    singles.className = 'single_container';
    for (let i = 0; i < artist.singles.length; ++i) {
        let singleName = document.createElement('p');
        singleName.innerText = 'Nume single: ' + artist.singles[i].nameSingle;

        let year = document.createElement('p');
        year.innerText = 'Anul lansării: ' + artist.singles[i].releaseYear;

        let single = document.createElement('div');
        single.className = 'single';
        single.appendChild(singleName);
        single.appendChild(year);
        
        singles.appendChild(single);
    }

    let detailsToFlex = document.createElement('div');
    detailsToFlex.className = 'details-photo-and-info';
    detailsToFlex.appendChild(img);
    detailsToFlex.appendChild(info);

    let artistDetails = document.createElement('div');
    artistDetails.className = 'artist_details';
    artistDetails.appendChild(name);
    artistDetails.appendChild(detailsToFlex);

    let discography = document.createElement('div');
    discography.className = 'discography';
    discography.appendChild(albums);
    discography.appendChild(singles);

    artistDetails.appendChild(discography);

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

    labelName.className = 'details_text';
    labelYt.className = 'details_text';
    labelActivity.className = 'details_text';
    labelImg.className = 'details_text';

    formName.className = 'add_form';
    formImg.className = 'add_form';
    formYt.className = 'add_form';
    formActivity.className = 'add_form';

    let addAlbumButton = document.createElement('button');
    addAlbumButton.className = 'edit_menu_button';
    addAlbumButton.addEventListener('click', () => {
        if (adminCheck())
            displayAddAlbumMenu(typeArtist, artist);
    });
    addAlbumButton.innerText = 'Adaugă album';
    let addSingleButton = document.createElement('button');
    addSingleButton.className = 'edit_menu_button';
    addSingleButton.addEventListener('click', () => {
        if (adminCheck())
            displayAddSingleMenu(typeArtist, artist);
    });
    addSingleButton.innerText = 'Adaugă single';

    let container = document.createElement('div');
    container.className = 'add_menu';
    container.id = 'display_menu';

    let containerName = document.createElement('div');
    let containerImg = document.createElement('div');
    let containerYt = document.createElement('div');
    let containerActivity = document.createElement('div');

    containerName.appendChild(labelName);
    containerName.appendChild(formName);

    containerImg.appendChild(labelImg);
    containerImg.appendChild(formImg);

    containerYt.appendChild(labelYt);
    containerYt.appendChild(formYt);

    containerActivity.appendChild(labelActivity);
    containerActivity.appendChild(formActivity);

    let containerInfo = document.createElement('div');
    containerImg.className = 'add_info_container';
    containerInfo.appendChild(containerName);
    containerInfo.appendChild(containerImg);
    containerInfo.appendChild(containerActivity);
    containerInfo.appendChild(containerYt);

    container.appendChild(containerInfo);
    container.appendChild(addAlbumButton);
    container.appendChild(addSingleButton);

    let updateButton = document.createElement('button');
    updateButton.className = 'edit_menu_button';
    updateButton.addEventListener('click', () => {
        postArtist(typeArtist);
        clearAddMenu(typeArtist);
    });
    updateButton.innerText = 'Salvează';
    updateButton.id = 'update-button'

    let cancelButton = document.createElement('button');
    cancelButton.className = 'edit_menu_button';
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

    labelName.className = 'details_text';
    labelRelease.className = 'details_text';
    labelNoSongs.className = 'details_text';

    formName.className = 'add_form';
    formRelease.className = 'add_form';
    formNoSongs.className = 'add_form';
    
    let container = document.createElement('div');
    container.className = 'add_menu';

    let nameContainer = document.createElement('div');
    let noSongsContainer = document.createElement('div');
    let relreaseContainer = document.createElement('div');

    nameContainer.appendChild(labelName);
    nameContainer.appendChild(formName);

    noSongsContainer.appendChild(labelNoSongs);
    noSongsContainer.appendChild(formNoSongs);

    relreaseContainer.appendChild(labelRelease);
    relreaseContainer.appendChild(formRelease);

    container.appendChild(nameContainer);
    container.appendChild(noSongsContainer);
    container.appendChild(relreaseContainer);

    let updateButton = document.createElement('button');
    updateButton.className = 'add_album_button';
    updateButton.addEventListener('click', () => {
        postAlbum(typeArtist, artist);
        clearAddMenu(typeArtist);
    });
    updateButton.innerText = 'Salvează';
    updateButton.id = 'update-button';

    let cancelButton = document.createElement('button');
    cancelButton.className = 'add_album_button';
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
    let labelName = getLabel('name', 'Nume single: ');
    let formName = getInput('name', 'formName', '');
    let labelRelease = getLabel('release', 'Anul lansării: ');
    let formRelease = getInput('release', 'formRelease', '');

    labelName.className = 'details_text';
    labelRelease.className = 'details_text';

    formName.className = 'add_form';
    formRelease.className = 'add_form';

    let container = document.createElement('div');
    container.className = 'add_menu';

    let nameContainer = document.createElement('div');
    let relreaseContainer = document.createElement('div');

    nameContainer.appendChild(labelName);
    nameContainer.appendChild(formName);

    relreaseContainer.appendChild(labelRelease);
    relreaseContainer.appendChild(formRelease);

    container.appendChild(nameContainer);
    container.appendChild(relreaseContainer);

    let updateButton = document.createElement('button');
    updateButton.className = 'add_album_button';
    updateButton.addEventListener('click', () => {
        postSingle(typeArtist, artist);
        clearAddMenu(typeArtist);
    });
    updateButton.innerText = 'Salvează';
    updateButton.id = 'button-menu';

    let cancelButton = document.createElement('button');
    cancelButton.className = 'add_album_button';
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
            appendDetailsToDOM(typeArtist ,artist);
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
    temp.type = 'radio';
    temp.id = str;
    temp.name = 'type';
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

    labelName.className = 'details_text';
    labelYt.className = 'details_text';
    labelActivity.className = 'details_text';
    labelImg.className = 'details_text';

    formName.className = 'add_form';
    formImg.className = 'add_form';
    formYt.className = 'add_form';
    formActivity.className = 'add_form';

    let individulLabel = getLabel('individual', 'Individual');
    let individual = getCheckbox('individual');
    let formatieLabel = getLabel('formatie', 'Formație');
    let formatie = getCheckbox('formatie');

    individulLabel.className = 'details_text';
    formatieLabel.className = 'details_text';

    let container = document.createElement('div');
    container.className = 'add_menu';
    container.id = 'display_menu';

    let containerName = document.createElement('div');
    let containerImg = document.createElement('div');
    let containerYt = document.createElement('div');
    let containerActivity = document.createElement('div');

    containerName.appendChild(labelName);
    containerName.appendChild(formName);

    containerImg.appendChild(labelImg);
    containerImg.appendChild(formImg);

    containerYt.appendChild(labelYt);
    containerYt.appendChild(formYt);

    containerActivity.appendChild(labelActivity);
    containerActivity.appendChild(formActivity);

    let containerInfo = document.createElement('div');
    containerImg.className = 'add_info_container';
    containerInfo.appendChild(containerName);
    containerInfo.appendChild(containerImg);
    containerInfo.appendChild(containerActivity);
    containerInfo.appendChild(containerYt);

    container.appendChild(containerInfo);
    container.appendChild(individulLabel)
    container.appendChild(individual);
    container.appendChild(formatieLabel);
    container.appendChild(formatie);

    let updateButton = document.createElement('button');
    updateButton.className = 'add_menu_button';
    updateButton.addEventListener('click', () => {
        postArtist(typeArtist);
        clearAddMenu(typeArtist);
    });
    updateButton.innerText = 'Salvează';
    updateButton.id = 'update-button'

    let cancelButton = document.createElement('button');
    cancelButton.className = 'add_menu_button';
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
    location.href = 'file:///home/alexandru/Documents/work/Web-Project/index.html';
});

startWebPage();