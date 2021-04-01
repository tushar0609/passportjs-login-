const mongoose=require('mongoose');

const connect=()=>{
     return mongoose.connect('mongodb://localhost:27017/users',{ useUnifiedTopology: true , useNewUrlParser: true});
}
const user= new mongoose.Schema({
      firstName:{
            type:String,
            required:true
      },
      lastName:{
            type:String,
            required:true
      },
      email:{
            type:String,
            required:true
      },
      password:{
            type:String,
            required:true
      }
})
const Student=new mongoose.model('User',user);

module.exports.connect=connect;
module.exports.Student=Student;