const fs = require('fs/promises');
const { nextTick } = require('process');

module.exports = async function getUserByID(req, res, next) {
    try {
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
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};