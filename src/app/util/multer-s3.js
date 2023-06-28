var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

aws.config.update({
    secretAccessKey: '',
    accessKeyId: '',
});
var s3 = new aws.S3()

folder = "test";

exports.upload = (folder) => multer({
    storage: 
    multerS3({
        s3: s3,
        bucket: 'klicked',
        // bucket: 'imxapp',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            let extension = file.originalname.split(".").pop()
            cb(null, `${folder}/${Date.now().toString()}.${extension}`)
        }
    })
})
exports.deleteFile = (imagePath) => {
    s3.deleteObject({
        Bucket: "healthybazaar",
        Key: imagePath
    }, function (err, data) {
        if (data) console.log(data, "success");
    })


}

exports.getFile = (imagePath) => {

}