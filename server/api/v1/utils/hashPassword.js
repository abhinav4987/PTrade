const bcrypt = require('bcrypt');


function hashPassword(password) {
    console.log(password);
    console.log("hashing ");
    const salt = bcrypt.genSaltSync(15)
    console.log("hashing2")
    const hash = bcrypt.hashSync(password, salt);
    console.log("hello ppl");
    return hash;
}

module.exports = hashPassword;