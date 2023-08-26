const bcrypt = require('bcrypt');
const level = 10;

const hashPassword = async(plainPassword) => {
    try{
    const levelSet = await bcrypt.genSalt(level) ;
    const hashing = await bcrypt.hash(plainPassword, levelSet);
    return hashing;
    }
    catch(err){
        return err;
    }
}

const validPassword = async(plainPassword, hashedPassword) => {
    try{
    const valid = await bcrypt.compare(plainPassword, hashedPassword);
    return valid;
    }
    catch(err){
        return err;
    }
}
module.exports.hashPassword = hashPassword; 
module.exports.validPassword = validPassword;