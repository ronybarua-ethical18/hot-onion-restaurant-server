const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(cors())
require('dotenv').config()

const port = process.env.PORT || 5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xpiaw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const breakfastCollection = client.db("restaurantdb").collection("breakfast");
    const lunchCollection = client.db("restaurantdb").collection("lunch");
    const dinnerCollection = client.db("restaurantdb").collection("dinner");
    
    console.log('database connected successfully');
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port)