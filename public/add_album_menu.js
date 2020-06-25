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
        currentPage = 'artistsList_' + typeArtist;
        addAlbum(typeArtist, artist);
        clearAddMenu(typeArtist);
    });
    updateButton.innerText = 'Salvează';
    updateButton.id = 'update-button';

    let cancelButton = document.createElement('button');
    cancelButton.className = 'add_album_button';
    cancelButton.addEventListener('click', () => {
        currentPage = 'artistsList_' + typeArtist;
        clearAddMenu(typeArtist);
    });
    cancelButton.innerText = 'Anulează';

    container.appendChild(updateButton);
    container.appendChild(cancelButton);

    mainTag = document.getElementsByTagName('main');

    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);
    mainTag[0].appendChild(container);

    clearArtists(typeArtist);
}