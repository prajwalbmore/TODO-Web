const Task = require('../model/taskModel');


//new task
const addTask = async (req,res) =>{
    const userId = req.user._id;
    
    const {title, description, priority, taskDate, status} = req.body;
    const image = req.file ? req.file.filename : null;
    console.log('///',req.file);

    const allowedPriorities = ["Extreme", "Moderate", "Low"];

    try {
        if(!allowedPriorities.includes(priority)){
            return res.status(400).send({msg:"Invalid priority value", success: false })
        }

        const existingTak = await Task.findOne({
            title,
            priority,
        });
        if(existingTak){
            return res.status(400).send({ msg: "Task already exists", success: false });
        }

        
        const newTask = new Task({
            title, 
            description, 
            priority, 
            taskDate, 
            status,
            image,
            createdBy:userId,
            createAt:Date.now(),
        })

        await newTask.save();
        res.status(201).send({ msg: "Task created successfully", success: true });

    } catch (error) {
        return res.status(500).send("Server Error");
        console.log(error)
    }
}

//get all Task by Id
const getTaskById = async(req,res) =>{

    try {
        const task = await Task.findById(req.params.id)
        
        if(!task){
            return res.status(404).send({ error: "Task not found", success: false });
        }

        const modifiedTask = {
            _id: task._id,
            title: task.title,
            description: task.description,
            category: task.category,
            priority: task.priority,
            taskDate: task.taskDate,
            status: task.status,
            image: task.image ? `http://localhost:5005/uploads/${task.image}` : null,
            createdBy: task.createdBy,
            createdAt: task.createdAt,
            collaboraters: task.collaboraters,
        }

        return res.status(200).send({task : modifiedTask,success : true})
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Server error", success: false });
    }
}

//get all task
const getAllTask = async(req,res) =>{

    try {
        const tasks = await Task.find()

        const modifiedTask = tasks.map((task)=>({
                _id: task._id,
                title: task.title,
                description: task.description,
                category: task.category,
                priority: task.priority,
                taskDate: task.taskDate,
                status: task.status,
                image: task.image ? `http://localhost:5005/uploads/${task.image}` : null,
                createdBy: task.createdBy,
                createdAt: task.createdAt,
                collaboraters: task.collaboraters,
            }
        )) 

        return res.status(200).send({task : modifiedTask,success : true})
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Server error", success: false });
    }
}

//update task by id
const updateTask = async(req,res) =>{
    console.log(req.body);
    
    try {
        const {title, description, priority,category,image,createdBy,status} = req.body;
        const id = req.params.id;
        let task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
            console.log('Task not found');
            
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.category = category || task.category;
        task.priority = priority || task.priority;
        task.image = image || task.image;
        task.createdBy = createdBy || task.createdBy;
        task.status = status || task.status;

        await task.save();
        return res.status(200).send({msg:'Task updated Successfully',success:true})
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Server error", success: false });
    }
}

//delete task by id
const deleteTaskById = async (req,res)=>{
    try {
        const id = req.params.id;
        let task = await Task.findByIdAndDelete(id);
        if(!task){
            return res.status(404).send({mes:"Task not Found"})
        }

        return res.status(200).send({ msg: 'Task Deleted' ,success:true});

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Server error", success: false });
    }
}

const getTasksForUser = async (req, res) => {
    try {
      const tasks = await Task.find({ createdBy: req.user._id });
  
      if (tasks.length === 0) {
        return res.status(404).json({ message: "No tasks found for this user" });
      }
      console.log("task",tasks); 
      res.status(200).send({ tasks });
    } catch (error) {
        console.log(error);
      res.status(500).send({ message: "Server Error", error });
    }
  };

  const getFilteredTasks = async (req, res) => {
    try {
      const tasks = await Task.find({
        priority: { $in: ["Moderate", "Extreme"] },
      });
  
      res.status(201).send({success: true,tasks:tasks});
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Unable to retrieve tasks",
      });
    }
  };

module.exports = {
    addTask,
    getTaskById,
    getAllTask,
    updateTask,
    deleteTaskById,
    getTasksForUser,
    getFilteredTasks
}