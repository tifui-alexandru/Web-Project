function displayComm(typeArtist, idArtist, commsList) {
    commsList['comms'].forEach(comm => {
        if (!comm) return;

        const x = comm.downVotes;
        if (x >= 10) {
            return;
        }

        let container = document.createElement('div');

        let textComm = document.createElement('p');
        textComm.innerText = comm.text;
        textComm.className = 'comm-text';

        let upVotesContainer = document.createElement('div');
        let upVotes = document.createElement('p');
        let prefixUpVotes = document.createElement('p');
        let upVotesButton = document.createElement('button');
        upVotesButton.innerText = '+';
        prefixUpVotes.innerText = 'Voturi pozitive:';
        upVotes.innerText = comm.upVotes;
        upVotesContainer.appendChild(prefixUpVotes);
        let upAuxCont = document.createElement('div');
        upAuxCont.appendChild(prefixUpVotes);
        upAuxCont.appendChild(upVotes);
        upVotesContainer.appendChild(upAuxCont);
        upVotesContainer.appendChild(upVotesButton);
        upVotesButton.className = 'button_votes';
        upAuxCont.className = 'aux-container-votes';
        upVotes.className = prefixUpVotes.className = 'votes_no';
        upVotesContainer.className = 'votes_no_container';
        upVotesButton.addEventListener('click', () => {
            if (!checkIfLoggedIn()) return;
            upVote(typeArtist, idArtist, comm, commsList);
            alert('Votul dumneavoastră a fost procesat');
        })

        let downVotesContainer = document.createElement('div');
        let downVotes = document.createElement('p');
        let prefixdownVotes = document.createElement('p');
        let downVotesButton = document.createElement('button');
        downVotesButton.innerText = '-';
        prefixdownVotes.innerText = 'Voturi negative:';
        downVotes.innerText = comm.downVotes;
        downVotesContainer.appendChild(prefixdownVotes);
        let downAuxCont = document.createElement('div');
        downAuxCont.appendChild(prefixdownVotes);
        downAuxCont.appendChild(downVotes);
        downVotesContainer.appendChild(downAuxCont);
        downVotesContainer.appendChild(downVotesButton);
        downVotesButton.className = 'button_votes';
        downAuxCont.className = 'aux-container-votes';
        downVotes.className = prefixdownVotes.className = 'votes_no';
        downVotesContainer.className = 'votes_no_container';
        downVotesButton.addEventListener('click', () => {
            if (!checkIfLoggedIn()) return;
            downVote(typeArtist, idArtist, comm, commsList);
            alert('Votul dumneavoastră a fost procesat');
        });

        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Șterge';
        deleteButton.className = 'delete-comment-button';
        deleteButton.addEventListener('click', () => {
            if (!checkIfLoggedIn()) return;
            // updateComms(deleteComm ,typeArtist, idArtist, comm);
            deleteComm(typeArtist, idArtist, comm, commsList);
        });

        let hideButton = document.createElement('button');
        hideButton.innerText = 'Ascunde';
        hideButton.className = 'delete-comment-button';
        hideButton.addEventListener('click', () => {
            hide(textComm, hideButton);
        });

        let topContainer = document.createElement('div');
        topContainer.className = 'top_comm_container';
        topContainer.appendChild(deleteButton);
        topContainer.appendChild(hideButton);

        let votesContainer = document.createElement('div');
        votesContainer.appendChild(upVotesContainer);
        votesContainer.appendChild(downVotesContainer);

        container.appendChild(topContainer);
        container.appendChild(textComm);
        container.appendChild(votesContainer);

        container.className = 'comm_container';

        document.getElementById('comm-main').appendChild(container); 
    });
}

function hide(text, button) {
    text.style.display = 'none';
    let newButton = button.cloneNode(true);

    newButton.className = 'delete-comment-button';
    newButton.innerText = 'Afișează';
    newButton.addEventListener('click', () => {
        show(text, newButton);
    })

    button.parentNode.replaceChild(newButton, button);
}

function show(text, button) {
    text.style.display = 'block';
    let newButton = button.cloneNode(true);

    newButton.className = 'delete-comment-button';
    newButton.innerText = 'Ascunde';
    newButton.addEventListener('click', () => {
        hide(text, newButton);
    })

    button.parentNode.replaceChild(newButton, button);
}

function displayCommPage(typeArtist, idArtist) {
    clearArtists(typeArtist);
    mainTag = document.getElementsByTagName('main');
    while (mainTag[0].firstChild)
    mainTag[0].removeChild(mainTag[0].firstChild);

    let commMainTag = document.createElement('div');
    mainTag[0].appendChild(commMainTag);
    commMainTag.id = 'comm-main';

    let addComm = document.createElement('button');
    addComm.innerText = 'Adaugă un comentariu';
    addComm.className = 'add-comm-button';
    commMainTag.appendChild(addComm);

    fetch('http://localhost:3000/comms/' + typeArtist + '/' + idArtist).then(response => {
        if (response.status == 404) {
            let commsList = {
                "id": idArtist,
                "comms": [
                    {
                        "id": "0",
                        "text": "NULL",
                        "upVotes": 0,
                        "downVotes": 100
                    }
                ]
            };
            addComm.addEventListener('click', () => {
                if (!checkIfLoggedIn()) return;
                addComment(typeArtist, idArtist, commsList, postComment);
            });
        }
        else {
            response.json().then(commsList => {
                displayComm(typeArtist, idArtist, commsList);
                addComm.addEventListener('click', () => {
                    if (!checkIfLoggedIn()) return;
                    addComment(typeArtist, idArtist, commsList, putComment);
                });
            })
        }
    });
}

function upVote(typeArtist, idArtist, comm, commentsList) {
    let putObject = commentsList;

    putObject['comms'].forEach(el => {
        if (el.id == comm.id) {
            ++el.upVotes;
        }
    })

    fetch('http://localhost:3000/comms/' + typeArtist + '/' + idArtist, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
        
    });

    displayCommPage(typeArtist, idArtist, commentsList);
}

function downVote(typeArtist, idArtist, comm, commentsList) {
    let putObject = commentsList;

    putObject['comms'].forEach(el => {
        if (el.id == comm.id) {
            ++el.downVotes;
        }
    })

    fetch('http://localhost:3000/comms/' + typeArtist + '/' + idArtist, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
        
    }).then(
        displayCommPage(typeArtist, idArtist, commentsList)
    );
}

function deleteComm(typeArtist, idArtist, comm, commentsList) {
    let putObject = commentsList;

    putObject['comms'].forEach(el => {
        if (el.id == comm.id) {
            el.downVotes = 100;
        }
    })

    fetch('http://localhost:3000/comms/' + typeArtist + '/' + idArtist, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
        
    }).then(
        displayCommPage(typeArtist, idArtist, commentsList)
    );
}

function addComment(typeArtist, idArtist, commentsList, func) {
    mainTag = document.getElementsByTagName('main');
    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);
    
    let textBox = document.createElement('textarea');
    textBox.id = 'comment';
    textBox.className = 'comment-textbox';

    let postCommButton = document.createElement('button');
    postCommButton.className = 'post-comment-button';
    postCommButton.innerText = 'Postează comentariul';
    postCommButton.addEventListener('click', () => {
        func(typeArtist, idArtist, textBox.value, commentsList);
        alert('Comentariu adăugat cu succes');
    });

    mainTag[0].appendChild(textBox);
    mainTag[0].appendChild(postCommButton);
}

function putComment(typeArtist, idArtist, commentText, commentsList) {
    const putObject = commentsList;

    let idComm = 0;
    commentsList['comms'].forEach(el => {
        let x = el.id;
        if (x > idComm) idComm = x;
    })
    ++idComm;

    const postComm = {
        id: idComm,
        text: commentText,
        upVotes: '0',
        downVotes: '0'
    }
    putObject['comms'].push(postComm);

    fetch('http://localhost:3000/comms/' + typeArtist + '/' + idArtist, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
        
    }).then(
        displayCommPage(typeArtist, idArtist, commentsList)
    );
}

function postComment(typeArtist, idArtist, commentText, commentsList) {
    const putObject = commentsList;

    let idComm = 0;
    commentsList['comms'].forEach(el => {
        let x = el.id;
        if (x > idComm) idComm = x;
    })
    ++idComm;

    const postComm = {
        id: idComm,
        text: commentText,
        upVotes: '0',
        downVotes: '0'
    }
    putObject['comms'].push(postComm);
    putObject['id'] = idArtist;

    fetch('http://localhost:3000/comms/' + typeArtist, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
        
    }).then(
        displayCommPage(typeArtist, idArtist, commentsList)
    );
}