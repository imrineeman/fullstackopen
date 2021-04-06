require('dotenv').config()
const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI

console.log('connecting to', url);

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch((err) => {
        console.log('error connecting to mongoDB', err.message);
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        unique: true,
    },
})

personSchema.set('toJSON', {
    transform: (document, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
    }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)
