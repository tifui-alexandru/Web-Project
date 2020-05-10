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
            editArtist(typeArtist, artists[i]);
        });
        editButton.innerText = 'Editează';

        let deleteButton = document.createElement('button');
        deleteButton.className = 'button';
        deleteButton.addEventListener('click', () => {
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
    // console.log(artistsElement);
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
    ytLink.target = '_blank';
    ytLink.rel = 'noopener noreferrer';
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

    mainTag = document.getElementsByTagName('main');

    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);
    mainTag[0].appendChild(artistDetails);
}