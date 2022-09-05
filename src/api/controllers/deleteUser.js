const fs = require('fs/promises');

module.exports = async function deleteUser(req, res, next) {
    try {
        const { id } = req.params;
        const userList = await fs.readFile("./src/api/database/users.json");
        const userListArr = JSON.parse(userList);

        const user = userListArr.find(element => element.id == id);
        if (typeof user === 'undefined') {
            const error = new Error(`Nenhum usuário encontrado com o ID nº ${id}!`);
            error.status = 404;
            throw error;
        };
        user.deleted = true;

        const userListString = JSON.stringify(userListArr);
        await fs.writeFile("./src/api/database/users.json", userListString);

        res.status(200).json({"id":id,"message":`${user.name} deletado com sucesso!`});
    } catch (error) {
        next(error);
    }
};