const mongoose=require('mongoose')

const BookModel= new mongoose.Schema(
    {
       title:{
        type:String,
        required:true
       },
       author:{
        type:String,
        required:true
       },
       genre:{
        type:String,
        required:true
       },
       publishedYear:{
           type:Number
       },
       avaliableCopies: {
            type: Number,
            required: true
       }

    }
)

const Book= mongoose.model('book',BookModel)

module.exports=Book