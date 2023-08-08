const mongoose = require('mongoose');
const DB = "mongodb+srv://goyalshagun25:shagun1234@cluster0.cuprzig.mongodb.net/task"

mongoose.connect(DB).then(()=>{
    console.log('connection successfull');   
    }).catch(
        e=>{
            console.log(e);
        }
    );
    