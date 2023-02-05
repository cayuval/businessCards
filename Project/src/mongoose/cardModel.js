const mongoose=   require('mongoose');

 const cardSchema= mongoose.Schema({
      businessName:String,
      businessDescription:String,
      businessAddress:String,
      businessPhone:String,
      businessImage:String,
      userId:String
});

const cardModel=  mongoose.model('card',cardSchema);

module.exports=  cardModel; 




