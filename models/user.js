const mongoose = require('mongoose');
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Emaail is invalid')
            }
        }
        
    },
    pendingTasks: {
        type: Number,
        
    },
    
    
});



module.exports = {User};