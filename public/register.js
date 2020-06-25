function displayRegisterMenu() {
    mainTag = document.getElementsByTagName('main');

    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);

        let labelUsername = getLabel('username', 'Nume de utilizator: ');
        let labelPassword = getLabel('password', 'Parolă: ');
        let labelConfirmPassword = getLabel('confirmPassword', 'Confirmă parola: ');
        let labelEmail = getLabel('email', 'Adresă de email: ');
        let labelName = getLabel('name', 'Nume și prenume: ');
        let labeladmin = getLabel('admin', 'Forografie de profil');

        let formUsername = getInput('username', 'formUsername', '');
        let formPassword = getInput('password', 'formPassword', '');
        let formConfirmPassword = getInput('confirmPassword', 'formConfirmPassword', '');
        let formEmail = getInput('email', 'formEmail', '');
        let formName = getInput('name', 'formName', '');
        let formadmin = document.createElement('input'); 

        formadmin.type = 'file';
        formadmin.name = 'admin';
        formadmin.style = 'display:none';
        formEmail.type = 'email';
        formadmin.id = 'formadmin';
        formPassword.type = 'password';
        formConfirmPassword.type = 'password';
    
    
        labelUsername.className = 'details_text';
        labelPassword.className = 'details_text';
        labelConfirmPassword.className = 'details_text';
        labelEmail.className = 'details_text';
        labelName.className = 'details_text';
        labeladmin.className = 'details_text';
    
        formUsername.className = 'add_form';
        formPassword.className = 'add_form';
        formConfirmPassword.className = 'add_form';
        formEmail.className = 'add_form';
        formName.className = 'add_form';
    
        let container = document.createElement('div');
        container.className = 'add_menu';
    
        let usernameContainer = document.createElement('div');
        let passwordContainer = document.createElement('div');
        let confirmPasswordContainer = document.createElement('div');
        let nameContainer = document.createElement('div');
        let emailContainer = document.createElement('div');
        let adminContainer = document.createElement('div');
    
        usernameContainer.appendChild(labelUsername);
        usernameContainer.appendChild(formUsername);
    
        passwordContainer.appendChild(labelPassword);
        passwordContainer.appendChild(formPassword);

        confirmPasswordContainer.appendChild(labelConfirmPassword);
        confirmPasswordContainer.appendChild(formConfirmPassword);

        nameContainer.appendChild(labelName);
        nameContainer.appendChild(formName);

        emailContainer.appendChild(labelEmail);
        emailContainer.appendChild(formEmail);

        adminContainer.appendChild(labeladmin);
        adminContainer.appendChild(formadmin);
    
        passwordContainer.className = 'login_container';
        usernameContainer.className = 'login_container';
        confirmPasswordContainer.className = 'login_container';
        emailContainer.className = 'login_container';
        nameContainer.className = 'login_container';
        adminContainer.className = 'login_container';
    
        container.appendChild(nameContainer);
        container.appendChild(emailContainer);
        container.appendChild(usernameContainer);
        container.appendChild(passwordContainer);
        container.appendChild(confirmPasswordContainer);
    
        let confirmButton = document.createElement('button');
        confirmButton.className = 'login_button';
        confirmButton.addEventListener('click', () => {
            currentPage = 'homePage';
            createProfile();
        });
        confirmButton.innerText = 'Confirmă';
        confirmButton.id = 'confirm-button';
    
        let cancelButton = document.createElement('button');
        cancelButton.className = 'login_button';
        cancelButton.addEventListener('click', () => {
            currentPage = 'authPage';
            displayLoginMenu();
        });
        cancelButton.innerText = 'Înapoi';
    
        container.appendChild(confirmButton);
        container.appendChild(cancelButton);
    
        mainTag = document.getElementsByTagName('main');
    
        while (mainTag[0].firstChild)
            mainTag[0].removeChild(mainTag[0].firstChild);
        mainTag[0].appendChild(container);
}

function createProfile() {
    let formUsername = document.getElementById('formUsername').value;
    let formPassword = document.getElementById('formPassword').value;
    let formConfirmPassword = document.getElementById('formConfirmPassword').value;
    let formEmail = document.getElementById('formEmail').value;
    let formName = document.getElementById('formName').value;

    if (!formUsername || !formPassword || !formConfirmPassword || !formEmail || !formName) {
        alert('Toate câmpurile sunt obligatorii pentru înregistrare!');
        return;
    }

    if (formPassword != formConfirmPassword) {
        alert('Parolele nu se potrivesc!');
        return;
    }

    const postUser = {
        name: formName,
        email: formEmail,
        username: formUsername,
        password: formPassword,
        admin: "no"
    };

    fetch('http://localhost:3000/users', {
        method: 'POST',

        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(postUser)
    });

    let mainPage = document.getElementById('main_container');
    mainPage.innerHTML = mainPageHTML;
    startWebPage();
}