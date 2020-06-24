const images = document.getElementsByClassName('artist-img');

function showImg() {
    let button = document.getElementById('hide-img-button');
    let newButton = button.cloneNode(true);
    newButton.innerText = 'Ascunde imaginile';
    newButton.className = 'hide-img-button';
    newButton.id = 'hide-img-button';

    button.parentNode.replaceChild(newButton, button);

    newButton.addEventListener('click', () => {
        for (let i = 0; i < images.length; ++i) {
            images[i].style.display = 'none';
        }
        hideImg();
    });
}

function hideImg() {
    let button = document.getElementById('hide-img-button');
    let newButton = button.cloneNode(true);
    newButton.innerText = 'Arată imaginile';
    newButton.className = 'hide-img-button';
    newButton.id = 'hide-img-button';

    button.parentNode.replaceChild(newButton, button);

    newButton.addEventListener('click', () => {
        for (let i = 0; i < images.length; ++i) {
            images[i].style.display = 'block';
        }
        showImg();
    });
}

showImg();