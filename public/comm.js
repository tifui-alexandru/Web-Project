function displayComm(typeArtist, idArtist, comm) {
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
        checkIfLoggedIn();
        updateComms(upVote ,typeArtist, idArtist, comm);
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
        checkIfLoggedIn();
        updateComms(downVote ,typeArtist, idArtist, comm);
    });

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Șterge';
    deleteButton.className = 'delete-comment-button';
    deleteButton.addEventListener('click', () => {
        checkIfLoggedIn();
        updateComms(deleteComm ,typeArtist, idArtist, comm);
    });

    let userInfo = document.createElement('p');
    userInfo.className = 'user_info_comm';
    userInfo.innerText = 'USERNAME';

    let topContainer = document.createElement('div');
    topContainer.className = 'top_comm_container';
    topContainer.appendChild(userInfo);
    topContainer.appendChild(deleteButton);

    let votesContainer = document.createElement('div');
    votesContainer.appendChild(upVotesContainer);
    votesContainer.appendChild(downVotesContainer);

    container.appendChild(topContainer);
    container.appendChild(textComm);
    container.appendChild(votesContainer);

    container.className = 'comm_container';

    document.getElementById('comm-main').appendChild(container);
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
    addComm.addEventListener('click', () => {
        checkIfLoggedIn();
        addComm(typeArtist, idArtist);
    });
    commMainTag.appendChild(addComm);

    fetch('http://localhost:3000/comms/' + typeArtist + '/' + idArtist).then(response => {
        response.json().then(comms => {
            comms['comms'].forEach(comm => {
                displayComm(typeArtist, idArtist, comm);
            });
        })
    });
}

function updateComms(func, typeArtist, idArtist, comm) {
    fetch('http://localhost:3000/comms/' + typeArtist + '/' + idArtist).then(response => {
        response.json().then(comms => {
            if (comms.id == idArtist)
                func(typeArtist, idArtist, comm, comms);
        })
    });
}

function upVote(typeArtist, idArtist, comm, commList) {
    let putObject = commList;

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

    displayCommPage(typeArtist, idArtist);
}

function downVote(typeArtist, idArtist, comm, commList) {
    let putObject = commList;

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
        displayCommPage(typeArtist, idArtist)
    );
}

function deleteComm(typeArtist, idArtist, comm, commList) {
    let putObject = commList;

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
        displayCommPage(typeArtist, idArtist)
    );
}

function addComm(typeArtist, idArtist) {
    mainTag = document.getElementsByTagName('main');
    while (mainTag[0].firstChild)
        mainTag[0].removeChild(mainTag[0].firstChild);
    
    
    
    displayCommPage(typeArtist, idArtist);
}