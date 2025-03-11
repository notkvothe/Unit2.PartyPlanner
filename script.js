

const partiesDiv = document.getElementById('parties');
const partyForm = document.getElementById('partyForm');

let parties = [];

async function fetchParties() {
    try {
        const response = await fetch('https://fsa-crud-2aa9294b8e23.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events');
        const data = await response.json();
        parties = data.data;
        renderParties();
    } catch (error) {
        console.error('Error fetching parties:', error);
    }
}

async function addParty(party) {
    try {
        const response = await fetch('https://fsa-crud-2aa9294b8e23.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(party),
        });
        if(response.ok){
            fetchParties();
        }

    } catch (error) {
        console.error('Error adding party:', error);
    }
}

async function deleteParty(id) {
    try {
        const response = await fetch(`https://fsa-crud-2aa9294b8e23.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events/${id}`, {
            method: 'DELETE',
        });
        if(response.ok){
            fetchParties();
        }

    } catch (error) {
        console.error('Error deleting party:', error);
    }
}

function renderParties() {
    partiesDiv.innerHTML = '';
    parties.forEach(party => {
        const partyDiv = document.createElement('div');
        partyDiv.className = 'party';
        partyDiv.innerHTML = `
            <h3>${party.name}</h3>
            <p>Date: ${party.date}</p>
            <p>Time: ${party.time}</p>
            <p>Location: ${party.location}</p>
            <p>Description: ${party.description}</p>
            <button class="delete-button" data-id="${party.id}">Delete</button>
        `;
        partiesDiv.appendChild(partyDiv);
    });

    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            deleteParty(id);
        });
    });
}

partyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    const newParty = {
        name,
        date,
        time,
        location,
        description,
    };

    await addParty(newParty);

    partyForm.reset();
});

fetchParties();
