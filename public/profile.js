function displayProfileMenu(token) {
    mainTag = document.getElementsByTagName('main');

    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);

    let subtitle = document.getElementById('subtitle');
    if (subtitle)
        subtitle.parentNode.removeChild(subtitle);

    let profile = document.getElementById('profile_container');
    if (profile)
        profile.parentNode.removeChild(profile);

    clearAllArtists();

    let container = document.createElement('div');
    container.className = 'add_menu';

    fetch('http://localhost:3000/users', {
        method: 'GET',

        headers: new Headers ({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token.accessToken
        })
    }).then(response => {
        response.json().then( data => {
            getProfile(container, data);
        })
    });

    mainTag[0].appendChild(container);
}

function getProfile(containerRef, data) {
    let name = document.createElement('span');
    name.innerText = data.name;
    name.className = 'formation_name';

    let username = document.createElement('span');
    username.innerText = data.username;
    username.className = 'formation_name';

    let email = document.createElement('span');
    email.innerText = data.email;
    email.className = 'formation_name';

    let editButton = document.createElement('button');
    editButton.className = 'button';
    editButton.addEventListener('click', () => {
        editAccount();
    });
    editButton.innerText = 'Editează';

    let deleteButton = document.createElement('button');
    deleteButton.className = 'button';
    deleteButton.addEventListener('click', () => {
        deleteAccount();
    });
    deleteButton.innerText = 'Șterge';

    let logoutButton = document.createElement('button');
    logoutButton.className = 'button';
    logoutButton.addEventListener('click', () => {
        Logout();
    });

    let container = document.createElement('div');
    container.className = 'container_formation';
    container.appendChild(editButton);
    container.appendChild(deleteButton);
    container.appendChild(logoutButton);

    let bigContainer = document.createElement('div');
    bigContainer.className = 'big_container_formation';
    bigContainer.appendChild(container);

    let biggerContainer = document.createElement('div');
    biggerContainer.className = 'artist-box';
    biggerContainer.appendChild(name);
    biggerContainer.appendChild(username);
    biggerContainer.appendChild(email);
    biggerContainer.appendChild(bigContainer);
        
    containerRef.appendChild(biggerContainer);
}