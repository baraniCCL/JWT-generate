const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');

const authVerify = require('../middleware/auth');
const User = require('../controller/user');
const { hashPassword, validPassword } = require('../middleware/hashPass');
const { tokenGenerator } = require('../middleware/token');
const user = require('../controller/user');
const upload = require('../middleware/multer/multerUpload');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/signin', upload.single('img'),async(req, res) => {
    const hashedPassword = await hashPassword(req.body.password);
    let filepath = '';
    if(req.file){
        filepath = req.file.path;   
    }
    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        img: filepath
    });
    const savedUser = await user.save();
    res.json(savedUser);
})

router.post('/signup', async(req, res) => {
    const oldUser = await User.findOne({email: req.body.email});
    if(!oldUser){
        res.send('Email id is invalid');
    }
    else{
        const validPass = await validPassword( req.body.password, oldUser.password )
        if(!validPass){
            res.send('Password is invalid');
        }
        else{
            const token = await tokenGenerator(oldUser.email);
            oldUser.token = token;
            await fs.appendFile(path.join(__dirname,'..','views','token.txt'),token+'\n');
            res.send(token);
        }
    }   
})

router.get('/welcome',authVerify, (req, res) => {
    res.send('Welcome to the Page...');
})
module.exports = router;