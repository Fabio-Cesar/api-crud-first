const fs = require('fs/promises');

module.exports = async function addUser(req, res, next) {
    try {
        const { name, email } = req.body;
        if (typeof name === 'undefined' || typeof email === 'undefined') {
            const error = new Error("Informar nome e email para obter sucesso!");
            error.status = 400;
            throw error;
        }
        const userList = await fs.readFile("./src/api/database/users.json");
        const userListArr = JSON.parse(userList);

        const id = userListArr.length + 1;
        const newUser = {
            "id":id,
            "name":name,
            "email":email,
            "deleted":false
        };
        userListArr.push(newUser);

        const userListString = JSON.stringify(userListArr);
        await fs.writeFile("./src/api/database/users.json", userListString);

        res.status(201).json({"id":id,"message":`${name} incluído com sucesso!`});
    } catch (error) {
        next(error);
    }
};