const mongoose = require("mongoose");
const Priority = require('../model/priorityModel');


async function addPriority(req,res) {
    const userId = req.user._id;
    const {priority} = req.body;

    if(!["Extreme", "Moderate", "Low"].includes(priority)){
        return res.status(400).send({ message: "Invalid priority value" });
    }
    
    try {
        const existingpriority = await Priority.findOne({priority});
        if(existingpriority){
            return res.status(400).send({ message: "Priority Already Exists" });
        }else{
            const newPriority = new Priority({
                priority,
                createdBy : userId,
                createdAt : Date.now(),
            })
    
            await newPriority.save();
            return res.status(200).send({message:"Priority Added Successfully"})
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

    async function getAllPriority(req,res) {
        
        try {
            const priority = await Priority.find();

            return res.status(200).send(priority);
        } catch (error) {
            return res.status(500).send({ message: error.message });

        }
    }

    async function getPriorityById(req,res){
        try {
            const {id} = req.params;

            const priority = await Priority.findById(id);
            if(!priority){
                return res.status(404).send({ msg: "priority id is not found" });
            }
            return res.status(200).send({priority:priority.priority,createdBy:priority.createdBy});
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    async function updatePriorityById(req,res) {
        const { priority, createdBy} = req.body ;
        const {id} = req.params ;
        try {
            const existingpriority = await Priority.findByIdAndUpdate(id);
            if(!existingpriority){
                return  res.status(404).send({ message: "Priority Not Found" });
            }
            existingpriority.priority = priority || existingpriority.priority;
            existingpriority.createdBy = createdBy ||existingpriority.createdAt;
            await existingpriority.save();
            return res.status(201).send({ message: "Priority Updated Sucessfully" });
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    async function deletePriority(req,res) {
        const {id} = req.params;
        try {
            const priority = await Priority.findByIdAndDelete(id);
            if(!priority){
                return res.status(404).send({msg:'Priority not found'})
            }
            return res.status(200).send({msg:'Priority Deleted '})
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
module.exports = {
    addPriority,
    getAllPriority,
    getPriorityById,
    updatePriorityById,
    deletePriority
}