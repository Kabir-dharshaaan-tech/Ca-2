const express=require('express')
require('dotenv').config()
const mongoose=require('mongoose')
const book=require('./schema')
const app=express()

app.use(express.json())

app.get('/book/:id',async(req,res)=>{
    try{
        const bookdata=await book.findById(
            req.params.id
        )
        if(!bookdata)
        {
            return res.status(404).json({message:"give correct id"})
        }
        console.log(bookdata)
    }
    catch(e){
        console.log(e)
    }
})

const db=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongo_db connected")
    }
    catch (e)
    {
        console.log(e)
    }
}
db()

app.post('/item',async(req,res)=>{
    try{
        const {title,author,genre,publishedYear,avaliableCopies}=req.body

      if(!title || !author || !genre ||  !publishedYear||!avaliableCopies)
      {
        return res.status(400).json({message:"fill all fields "})
      }

      const newBook=   await book({title,author,genre,publishedYear,avaliableCopies})

        newBook.save()

      res.status(200).json({message:"sucess"})
    }
    catch (e)
    {
        console.log(e)
    }
})


app.put('/book/:id',async(req,res)=>{
    try{
        const updateMovie= await book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )

        if(!updateMovie)
        {
            return res.status(400).json({message:"not updated"})
        }

        console.log(updateMovie)
    }
    catch (e)
    {
        console.log(e)
    }
})


app.delete('/book/:id',async(req,res)=>{
    try{
          const deleteBook= await book.findByIdAndDelete(
            req.params.id
          )

          if(!deleteBook)
          {
            return res.status(400).json({message:"not deleted"})
          }

          console.log(deleteBook)
    }
    catch (e)
    {
        console.log(e)
    }
})
const PORT=process.env.PORT || 3030
app.listen(PORT,()=>{
    console.log(`server is running in the port http://localhost:${PORT}`)
})