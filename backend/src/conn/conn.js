const mongoose=require('mongoose');
mongoose.connect(process.env.CONN).then(()=>{console.log('connection success')})
.catch(()=>{
    console.log('connection failed .... :(')
})
