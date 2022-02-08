const mongoose = require('mongoose');
const {Schema} = mongoose;

const CategorySchema = new Schema({
    main: {
        type: String,
        required: true
    },
    subCategory: [
        {
            type: String
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);