function updateMain(typeArtist) {
    musicType = typeArtist;
    if (typeArtist == 'rap')
        musicType = 'rap/hip-hop';
    else if (typeArtist == 'populara')
        musicType = 'muzică populară';
    else if (typeArtist == 'lautareasca')
        musicType = 'muzică lăutărească';

    mainTag = document.getElementsByTagName('main');

    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);

    let subtitle = document.getElementById('subtitle');
    if (subtitle)
        subtitle.parentNode.removeChild(subtitle);

    let profile = document.getElementById('profile_container');
    if (profile)
        profile.parentNode.removeChild(profile);

    let textContainer = document.createElement('div');
    textContainer.className = 'content-message';
    let text = document.createElement('span');
    text.innerText = 'Cei mai importanți artiști de ' + musicType + ' din România:';
    text.className = 'message';
    textContainer.appendChild(text);

    let addButton = document.createElement('button');
    addButton.className = 'button';
    addButton.addEventListener('click', () => {
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