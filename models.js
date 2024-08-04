const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: { type: String, required: true },
    comments: [String]
});

module.exports = mongoose.model('Book', bookSchema);