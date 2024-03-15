const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) =>{
    const hash = await bcrypt.hash(password, 10);
    return hash;
};
helpers.matchPassword = async (password, savedPassword)=>{
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (error) {
        return false;
    }
}
module.exports = helpers;