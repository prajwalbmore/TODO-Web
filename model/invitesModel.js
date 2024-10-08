const mongoose = require('mongoose');

const inviteSchema = mongoose.Schema({
    task:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    invitedUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ["Not started", "Completed", "Inprogress"],
        default : "Not started",
    },
    inviteAt:{
        type: Date,
        required: Date.now, 
    },
})

module.exports = mongoose.model('Invites',inviteSchema);