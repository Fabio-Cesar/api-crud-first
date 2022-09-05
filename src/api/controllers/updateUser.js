const fs = require('fs/promises');

module.exports = async function updateUser(req, res, next) {
    try {
        const { name, email } = req.body;
        if (typeof name === 'undefined' && typeof email === 'undefined') {
            const error = new Error("Informar nome ou email para obter sucesso!");
            error.status = 400;
            throw error;
        }
        const { id } = req.params;
        const userList = await fs.readFile("./src/api/database/users.json");
        const userListArr = JSON.parse(userList);

        const user = userListArr.find(element => element.id == id);
        if (typeof user === 'undefined') {
            const error = new Error(`Nenhum usuário encontrado com o ID nº ${id}!`);
            error.status = 404;
            throw error;
        }
        if (user.deleted) {
            const error = new Error(`Nenhum usuário encontrado com o ID nº ${id}!`);
            error.status = 404;
            throw error;
        } else {
            if (!(typeof email === 'undefined')) { user.email = email; };
            if (!(typeof name === 'undefined')) { user.name = name; };
        }

        const userListString = JSON.stringify(userListArr);
        await fs.writeFile("./src/api/database/users.json", userListString);

        res.status(200).send({"id":id,"message":`${user.name} alterado com sucesso!`});
    } catch (error) {
        next(error);
    }
};