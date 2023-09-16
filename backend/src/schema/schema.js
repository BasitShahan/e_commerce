const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    
    email:{
        type:String,
        require:true
    },

    password:{
        type:String,
        require:true
    },
  tokens:[{
    token:{
        type:String
    }
  }]    
    

},{timestamps:true});
const  Register =mongoose.model('Forget',UserSchema)
module.exports=Register