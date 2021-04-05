require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
//const url = `mongodb+srv://fullstack:2266946@cluster0.zsaza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

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
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
