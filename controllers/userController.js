const User = require('../model/userModel');
const jwt = require('jsonwebtoken')

//register
    async function addUser(req, res){
        const {fName,lName,userName,email,password,confirmPassword} = req.body;
        
          try {
            const user = await User.findOne({ email });
            if (!user) {
              const image = req.file ? req.file.filename : null;
              const newUser = new User({
                fName,
                lName,
                userName,
                email,
                password,
                confirmPassword,
                image,
                createdAt: Date.now(),
              });
        
              await newUser.save();
        
              res.status(200).send({ message: "User registered successfully", success: true });
            } else {
              res.status(400).send({ message: "User already exists", success: false });
            }
          } catch (error) {
            res.status(500).send({ message: error.message, success: false });
            console.log(error)
          }
    }

//login 
async function getUser (req, res){
    
    try {
        const  userName = req.body.userName;
        const newPassword = req.body.password;
        const user = await User.findOne({userName:userName});
        console.log(user);
        if(!user){
            return res.status(400).send({ error: 'Invalid login credentials',success:false});
        }
        isMatch = await user.comparePassword(newPassword);
        if(isMatch){
            const payload = {_id: user._id, name:user.name };
            const token = jwt.sign(payload,'prajwal', { expiresIn: '10h' });
            
            return res.status(200).send({message : "Login Successful", token : token, success : true});   
        }else{
            return res.status(401).send({error : 'Password Incorrect'}) 
        }
        
    } catch (error) { 
       return res.status(500).json({error:error});
    }
}
async function updateUser(req,res){

    try {
        const user = await User.findByIdAndUpdate(req.user._id,req.body);
        const image = req.file ? req.file.filename : null;

        console.log(user);
        if (!user) {
            res.status(400).send({message : 'User not Found'});
        }
        
        res.status(200).send({message : 'User updated'});
        } catch (error) {
            res.status(500).send(error);
    }
}

async function userInformation(req, res) {
    console.log('****', req.user);
    const id = req.user._id;
  
    try {
      const user = await User.findOne({ _id: id });
      
      if (!user) {
        return res.status(404).send({ message: 'User not found.', success: false });
      }
  
      const modifiedUser = {
        id: user._id,
        fName: user.fName,
        lName: user.lName,
        userName: user.userName,
        email: user.email,
        image: user.image ? `http://localhost:5005/uploads/${user.image}` : null,
      };
  
      console.log('////', modifiedUser);
  
      return res.status(200).send({ user: modifiedUser, success: true });
    } catch (error) {
      console.error(error); 
      return res.status(500).send({ error: 'Server error occurred.' });
    }
  }
  

async function getAllUsers(req,res) {
    try {
        const users = await User.find();
        if(!users.length){
            return res.status(404).send({ msg: "No users found", success: false });
        }
        return res.status(200).send({users,success : true});
    } catch (error) {
        return res.status(500).send({ error });
    }
}

module.exports ={
    addUser,
    getUser ,
    updateUser,
    userInformation,
    getAllUsers
}