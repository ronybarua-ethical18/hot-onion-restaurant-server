const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(cors())
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;

const port = process.env.PORT || 5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xpiaw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const productCollection = client.db("restaurantdb").collection("products");

    // create breakfast data 
    app.post('/addProduct', (req, res) => {
        const product = req.body;
        productCollection.insertOne(product)
            .then(result => {
                console.log(result);
                res.send(result.insertedCount > 0)
            })
    })

    // retrive data from server 
    app.get('/allProduct', (req, res) => {
        productCollection.find()
            .toArray((error, documents) => {
                res.status(200).send(documents);
            })
    })

    // delete data from database
    app.delete('/delete/:id', (req, res) => {
        console.log(req.params.id)
        productCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                console.log(result)
                res.send(result.deletedCount > 0);
            })
    })

    //get single product by id
  app.get('/product/:id', (req, res) => {
    productCollection.find({ _id: ObjectId(req.params.id) })
      .toArray((error, documents) => {
        res.send(documents[0]);
      })
  })
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port)