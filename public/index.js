const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const addUserBtn = document.querySelector("#add-user-btn");
const statusMessage = document.querySelector("#status-message");
const usersTable = document.querySelector("#users-table");

listUsers();

async function listUsers() {
    try {
        const response = await fetch('http://localhost:8080/usuarios');
        if (response.status !== 200) {
            const jsonError = await response.json();
            throw new Error(jsonError.message);
        }
        const userList = await response.json();
        usersTable.innerHTML = "";
        for (let i = 0; i < userList.length; i++) {
            const userID = userList[i].id;
            const tableRow = document.createElement("tr");
            tableRow.setAttribute(`id`,`${userID}`);
            const tableID = document.createElement("td");
            tableID.textContent = `${userID}`;
            tableRow.appendChild(tableID);
            const tableName = document.createElement("td");
            tableName.textContent = `${userList[i].name}`;
            tableRow.appendChild(tableName);
            const tableEmail = document.createElement("td");
            tableEmail.textContent = `${userList[i].email}`;
            tableRow.appendChild(tableEmail);
            const tableEdit = document.createElement("td");
            const editBtn = document.createElement("button");
            editBtn.innerHTML = `<span class="material-icons">edit</span>`;
            editBtn.addEventListener('click', function() { editUser(userID) });
            tableEdit.appendChild(editBtn);
            tableRow.appendChild(tableEdit);
            const tableDelete = document.createElement("td");
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = `<span class="material-icons">delete</span>`;
            deleteBtn.addEventListener('click', function() { deleteUser(userID) });
            tableDelete.appendChild(deleteBtn);
            tableRow.appendChild(tableDelete);
            usersTable.appendChild(tableRow);
        }
    } catch (error) {
        statusMessage.innerHTML = `<p>[ERRO] ${error.message}</p>`;
    }
}

async function addUser() {
    const nameValue = nameInput.value;
    const emailValue = emailInput.value;
    try {
        if (nameValue === "") {
            throw new Error("Campo de nome vazio!")
        }
        if (emailValue === "") {
            throw new Error("Campo de e-mail vazio!");
        }
        const bodyValue = {
            name: nameValue,
            email: emailValue
        }
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(bodyValue)
        }
        const response = await fetch('http://localhost:8080/usuarios', options);
        if (response.status !== 201) {
            const jsonError = await response.json();
            throw new Error(jsonError.message);
        }
        const responseJson = await response.json();
        statusMessage.innerHTML = `<p>[SUCESSO] ${responseJson.message}</p>`;
        listUsers();
    } catch (error) {
        statusMessage.innerHTML = `<p>[ERRO] ${error.message}</p>`;
    }
}

async function editUser(searchID) {
    const editRow = document.getElementById(`${searchID}`);
    const newName = document.createElement('td');
    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('id', `edit-name${searchID}`);
    const newEmail = document.createElement('td');
    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'text');
    emailInput.setAttribute('id', `edit-email${searchID}`);
    try {
        const response = await fetch(`http://localhost:8080/usuarios/${searchID}`);
        if (response.status !== 200) {
            const jsonError = await response.json();
            throw new Error(jsonError.message);
        }
        const userSearch = await response.json();
        nameInput.value = userSearch.name;
        emailInput.value = userSearch.email;
    } catch (error) {
        statusMessage.innerHTML = `<p>[ERRO] ${error.message}</p>`;
    }
    newName.appendChild(nameInput);
    newEmail.appendChild(emailInput);
    editRow.replaceChild(newName, editRow.childNodes[1]);
    editRow.replaceChild(newEmail, editRow.childNodes[2]);
    const newBtn = document.createElement('td');
    const doneBtn = document.createElement('button');
    doneBtn.innerHTML = `<span class="material-icons">done</span>`;
    doneBtn.addEventListener('click', function() { saveEdit(searchID) });
    newBtn.appendChild(doneBtn);
    editRow.replaceChild(newBtn, editRow.childNodes[3]);
}

async function saveEdit(searchID) {
    const nameValue = document.querySelector(`#edit-name${searchID}`).value;
    const emailValue = document.querySelector(`#edit-email${searchID}`).value;
    try {
        if (nameValue === "") {
            throw new Error("Campo de nome vazio!")
        }
        if (emailValue === "") {
            throw new Error("Campo de e-mail vazio!");
        }
        const bodyValue = {
            name: nameValue,
            email: emailValue
        }
        const options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(bodyValue)
        }
        const response = await fetch(`http://localhost:8080/usuarios/${searchID}`, options);
        if (response.status !== 200) {
            const jsonError = await response.json();
            throw new Error(jsonError.message);
        }
        const responseJson = await response.json();
        statusMessage.innerHTML = `<p>[SUCESSO] ${responseJson.message}</p>`;
        listUsers();
    } catch (error) {
        statusMessage.innerHTML = `<p>[ERRO] ${error.message}</p>`;
    }
}

async function deleteUser(searchID) {
    try {
        const options = {
            method: "DELETE"
        }
        const response = await fetch(`http://localhost:8080/usuarios/${searchID}`, options);
        if (response.status !== 200) {
            const jsonError = await response.json();
            throw new Error(jsonError.message);
        }
        const responseJson = await response.json();
        statusMessage.innerHTML = `<p>[SUCESSO] ${responseJson.message}</p>`;
        listUsers();
    } catch (error) {
        statusMessage.innerHTML = `<p>[ERRO] ${error.message}</p>`;
    }
}

addUserBtn.addEventListener('click', addUser);