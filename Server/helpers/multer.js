
const multer= require("multer")

const storage = multer.diskStorage({
    destination(req,file,callback){
        callback(null,'./public');
    },
    filename(req,file,callback){

        if(!file.originalname.match(/\.(pdf)$/)) {
            return callback( new Error('Please upload a valid pdf file'))
        }else{
            return callback(null,`${file.originalname}${Date.now()}${file.fieldname}${".pdf"}`);
        }
    },
});


const upload = multer({ storage:storage});

module.exports = upload