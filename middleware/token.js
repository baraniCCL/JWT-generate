const jwt = require('jsonwebtoken');
// const path = require('path');

const tokenGenerate = async(mail) => {
    try{
    const token = await jwt.sign({mail}, process.env.SECURITY_KEY, {expiresIn: "10 hours"});
    return token;
    }
    catch(err){
        return err;
    }
}

const tokenValidate = async(token) => {
    try{
        const data = await jwt.verify(token, process.env.SECURITY_KEY);
        return data;
    }catch{
        return false;
    }
    }
module.exports.tokenGenerator = tokenGenerate;
module.exports.tokenValidator = tokenValidate;