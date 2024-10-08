const mongoose = require('mongoose');

async function connectdb(){
    try {
        await mongoose.connect("mongodb://localhost:27017/Todo");
        console.log("Connected to MongoDB");
        
    } catch (error) {
        console.log("Error in Connection",error);
    }
}
module.exports  = { connectdb };