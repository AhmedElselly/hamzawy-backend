const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'elselly',
    api_key: '549562546544323',
    api_secret: 'blNBwf7gQVPvt8LdgSN02BbSYnc',
    secure: true
});

const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'hamzawy',
        allowedFormates: ['jpeg', 'jpg', 'png'],
        public_id: function(req, file){
            let buf = crypto.randomBytes(16);
            buf = buf.toString('hex');
            let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
            uniqFileName += buf;
        }
    }
});

module.exports = {
    cloudinary,
    storage
}