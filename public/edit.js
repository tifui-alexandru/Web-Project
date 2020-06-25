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
        currentPage = 'addAlbumPage_' + typeArtist + artist.id;
        displayAddAlbumMenu(typeArtist, artist);
    });
    addAlbumButton.innerText = 'Adaugă album';
    let addSingleButton = document.createElement('button');
    addSingleButton.className = 'edit_menu_button';
    addSingleButton.addEventListener('click', () => {
        currentPage = 'addSinglePage_' + typeArtist + artist.id;
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

    containerActivity.appendChild(labelActivity);mainTag
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
        currentPage = 'artistsList_' + typeArtist;
        postArtist(typeArtist);
        clearAddMenu(typeArtist);
    });
    updateButton.innerText = 'Salvează';
    updateButton.id = 'update-button'

    let cancelButton = document.createElement('button');
    cancelButton.className = 'edit_menu_button';
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

    let newUpdateButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
    updateButton = document.getElementById('update-button');

    updateButton.addEventListener('click', () => {
        currentPage = 'artistsList_' + typeArtist;
        updateArtist(typeArtist, artist);
    });
}