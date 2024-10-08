const invitesModel = require("../model/invitesModel");
const mongoose = require("mongoose");
const taskModel = require("../model/taskModel");

async function invitation(req,res) {
    const userId = req.user._id;

    const {task, invitedUser, status, invitedAt} = req.body;
    const validStatus = ["Not started", "Completed", "Inprogress"];

    if(!validStatus.includes(status)){
        return res.status(400).send({ msg: "Invalid status value", success: false });
    }

    try {
        const existingTask = await taskModel.findById(task)
        if(!existingTask){
            return res.status(404).send({ msg: "Task not found", success: false });
        }

        const invite = await invitesModel.findOne({task,invitedUser});
        if(invite){
            return res.status(400).send({ msg: "Invite already exists", success: false });
        }

        const newInvite = new invitesModel({
            task,
            invitedUser,
            status,
            invitedAt: Date.now()
        })
        await newInvite.save();
        res.status(200).send({ msg: "Invited successfully", success: true });

    } catch (error) {
         console.error("Error creating invite:", error);
         return res.status(500).send({ error: "Server Error", success: false });
    }
}

module.exports = {
    invitation
}

