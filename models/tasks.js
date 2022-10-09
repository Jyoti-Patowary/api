const mongoose = require('mongoose');



const Task = mongoose.model('Task', {
    name : {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    deadline: {
        type: Date
    },
    completed: {
        type: Boolean,
        default: false
    },
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    assignedUserName: {
        type: String,
    },
    dateCreated: {
        type: Date,
    },
  
});

module.exports = {Task};