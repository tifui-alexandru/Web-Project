function displayProfileMenu(token) {
    mainTag = document.getElementsByTagName('main');

    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);

    let subtitle = document.getElementById('subtitle');
    if (subtitle)
        subtitle.parentNode.removeChild(subtitle);

    let hideButton = document.getElementById('hide-img-button');
        if (hideButton) 
            hideButton.parentNode.removeChild(hideButton);

    let profile = document.getElementById('profile_container');
    if (profile)
        profile.parentNode.removeChild(profile);

    clearAllArtists();

    let container = document.createElement('div');
    container.className = 'profile-box';

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
    name.innerText = 'Nume: ' + data.name;
    name.className = 'user_details';

    let username = document.createElement('span');
    username.innerText = 'Nume de utilizator: ' + data.username;
    username.className = 'user_details';

    let email = document.createElement('span');
    email.innerText = 'Email: ' + data.email;
    email.className = 'user_details';

    let logoutButton = document.createElement('button');
    logoutButton.className = 'user_profile_button';
    logoutButton.addEventListener('click', () => {
        currentPage = 'homePage';
        Logout();
    });
    logoutButton.innerText = 'Deconectează-te';

    let biggerContainer = document.createElement('div');
    biggerContainer.className = 'smaller-profile-box';
    biggerContainer.appendChild(name);
    biggerContainer.appendChild(username);
    biggerContainer.appendChild(email);
    biggerContainer.appendChild(logoutButton);
        
    containerRef.appendChild(biggerContainer);
}

function Logout() {
    localStorage.setItem('loggedOn', 'false');
    localStorage.setItem('activeUser', null);

    let loginButton = document.getElementById('profile-button');
    let container = loginButton.parentNode;
    container.removeChild(loginButton);

    let profileButton = document.createElement('button');
    profileButton.id = 'login-button';
    profileButton.className = 'header_button';
    profileButton.addEventListener('click', () => {
        currentPage = 'authPage';
        displayLoginMenu();
    });
    profileButton.innerText = 'Autentificare';
    container.appendChild(profileButton);
                
    let mainPage = document.getElementById('main_container');
    mainPage.innerHTML = mainPageHTML;
    startWebPage();
}