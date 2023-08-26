const { tokenValidator } = require('./token');

module.exports = async(req, res, next) => {
    const token = await req.body.token;
    const valid = await tokenValidator(token);
    if(valid){
        return next();
    }
    else{
        res.send('Access denied');
    }
}