const express = require('express')
const app = express()
const cors = require('cors')
const objectId = require('mongodb').ObjectID
const port = 5000 || process.env.PORT ;


require('dotenv').config()
app.use(cors())
app.use(express.json())

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ez7qy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
  const userInfo = client.db("my-task").collection("user");

  app.post('/addUsers', (req, res) => {
    const users= req.body;
    userInfo.insertOne(users)
    .then(result =>{
      res.send(result.insertedCount > 1);
     
    })
  })

  app.get("/userInfo",(req,res)=>{
    
    userInfo.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })

 
  app.delete("/delete/:_id",(req,res)=>{
      userInfo.deleteOne({_id:objectId(req.params._id)})
      .then(result =>{
        res.send(result.deletedCount > 0)
      })
  })
 
});  


app.get('/', (req, res) => {
  res.send('Home page')
})

app.listen(port, () => {
  console.log(`app listening at ${ port}`)
})