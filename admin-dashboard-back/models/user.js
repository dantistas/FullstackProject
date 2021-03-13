const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = new mongoose.Schema({
    name: String,
    passwordHash:{
        type:String, 
        required: true},
    // Clients: [
    //     {type: mongoose.Schema.Types.ObjectId,ref: 'Clients'}
    // ]
})

// userSchema.set('toJSON',{
//     transform:((document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//         delete returnedObject.passwordHash
//       })
//   })

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)