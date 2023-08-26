const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:  path.join(__dirname,'..','..','uploads'),
    filename : function(res, file, cb ){
        cb(null, file.fieldname + '_' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
})
const size = 1*1024*1024;
const upload = multer({
        storage: storage,
        limits: {
            fileSize: size,
        },
        fileFilter: async function(res, file, cb){
            const filetype = /png|jpeg|jpg/;
            const mimeType = await filetype.test(file.mimetype);
            const ext = await filetype.test(file.mimetype.split('/')[1]);
            if(mimeType && ext){
                cb(null,true);
            }
            else{
                return cb('file type must be in : ' + filetype + ' format');
            }
            
        }
})

module.exports = upload;
