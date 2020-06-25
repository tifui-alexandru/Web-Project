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
        currentPage = 'artistsList_' + typeArtist;
        addHistoryEvent('Artist adăugat', String(typeArtist));
        postArtist(typeArtist);
        clearAddMenu(typeArtist);
    });
    updateButton.innerText = 'Salvează';
    updateButton.id = 'update-button'

    let cancelButton = document.createElement('button');
    cancelButton.className = 'add_menu_button';
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

function clearAddMenu(typeArtist) {
    mainTag = document.getElementsByTagName('main');

    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);
    updateMain(typeArtist);
    getArtists(typeArtist);
}