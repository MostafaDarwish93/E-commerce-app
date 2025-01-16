import multer from "multer";

const storage = multer.diskStorage({
    filename: function(req, file,callback){
        callback(null, file.originalname);
    }
});// storage options

const upload = multer({storage: storage}); // upload the file

export default upload; // export the upload