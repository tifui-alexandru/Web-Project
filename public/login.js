let loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', () => {
    displayLoginMenu();
});

function displayLoginMenu() {
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


    let labelUsername = getLabel('username', 'Nume de utilizator: ');
    let labelPassword = getLabel('password', 'Parolă: ');
    let formUsername = getInput('username', 'formUsername', '');
    let formPassword = getInput('password', 'formPassword', '');
    formPassword.type = 'password';


    labelUsername.className = 'details_text';
    labelPassword.className = 'details_text';

    formUsername.className = 'add_form';
    formPassword.className = 'add_form';

    let container = document.createElement('div');
    container.className = 'add_menu';

    let usernameContainer = document.createElement('div');
    let passwordContainer = document.createElement('div');

    usernameContainer.appendChild(labelUsername);
    usernameContainer.appendChild(formUsername);

    passwordContainer.appendChild(labelPassword);
    passwordContainer.appendChild(formPassword);

    passwordContainer.className = 'login_container';
    usernameContainer.className = 'login_container';

    container.appendChild(usernameContainer);
    container.appendChild(passwordContainer);

    let confirmButton = document.createElement('button');
    confirmButton.className = 'login_button';
    confirmButton.addEventListener('click', () => {

    });
    confirmButton.innerText = 'Confirmă';
    confirmButton.id = 'confirm-button';

    let registerButton = document.createElement('button');
    registerButton.className = 'login_button';
    registerButton.addEventListener('click', () => {
        displayRegisterMenu();
    });
    registerButton.innerText = 'Înregistrează-te';

    let registrationText = document.createElement('p');
    registrationText.innerText = 'Nu ai încă un cont? Înregistrează-te!';
    registrationText.className = 'register_text';

    container.appendChild(confirmButton);
    container.appendChild(registrationText);
    container.appendChild(registerButton);

    mainTag = document.getElementsByTagName('main');

    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);
    mainTag[0].appendChild(container);
}