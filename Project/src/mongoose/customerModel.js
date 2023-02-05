const mongoose=  require('mongoose');

const customerSchema= mongoose.Schema({
     email:{
          type:String,
          unique:true}
          ,
     name:String,
     password:String,
     isBusinessAccount:Boolean,
     createDate:{
          type:Date,
          default:Date.now
     }
});

module.exports = mongoose.model('customer', customerSchema);