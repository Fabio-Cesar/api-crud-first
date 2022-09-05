const fs = require('fs/promises');

module.exports = async function getUsers(req, res, next) {
    try {
        const userList = await fs.readFile("./src/api/database/users.json");
        const userListArr = JSON.parse(userList);
        const userListRes = userListArr.filter( function(element) {
            if (element.deleted) { return false } else { return true };
        });

        res.status(200).json(userListRes);
    } catch (error) {
        next(error);
    }
};