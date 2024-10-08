const express = require('express');
const bodyParser = require('body-parser');
const {connectdb} = require('./config/db');
const authRoute = require('./routes/userRoutes');
const taskRoute = require('./routes/taskRoutes');
const priorityRoute = require('./routes/priorityRoutes');
const inviteRoute = require('./routes/inviteRoutes');
const categoryrouter = require('./routes/categoryRoutes');
const cors = require('cors');
const app = express();
const PORT = 5005;

app.use(express.json());
app.use(bodyParser.json());

connectdb();

app.use(cors());
 
app.use('/api/auth',authRoute);

app.use('/api/task',taskRoute);

app.use("/api/category", categoryrouter);

app.use('/api/priority',priorityRoute);

app.use("/api/invite", inviteRoute);

app.use('/uploads', express.static('uploads'));


app.listen(PORT,()=>{
    console.log('Server Started at ',PORT);
})

