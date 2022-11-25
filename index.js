const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@cluster0.hvqv2xi.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const usedCarCollection = client.db('luxuryHunt').collection('usedCard')
        const categoryCollection = client.db('luxuryHunt').collection('category')
        const allUserCollection = client.db('luxuryHunt').collection('allUser')
        const allBookingCollection = client.db('luxuryHunt').collection('allBooking')
        app.get('/homecar', async (req, res) => {
            const query = {}
            const homeAllCar = await usedCarCollection.find(query).limit(6).toArray()
            res.send(homeAllCar)
        })
        app.get('/category', async (req, res) => {
            const query = {}
            const allCategory = await categoryCollection.find(query).toArray()
            res.send(allCategory)
        })
        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id }
            const carCollection = await usedCarCollection.find(query).toArray()
            res.send(carCollection)
        })

        // User api created
        app.post('/userCollection', async (req, res) => {
            const body = req.body;
            const userData = await allUserCollection.insertOne(body)
            res.send(userData)
        })

        // Booked data api
        app.post('/allBooking', async (req, res) => {
            const body = req.body
            const allBokings = await allBookingCollection.insertOne(body)
            res.send(allBokings)
        })

    }
    finally {

    }
}
run().catch(console.dir())


app.get('/', (req, res) => {
    res.send('Your server is running')
})
app.listen(port, () => {
    console.log(`Your server is running ${port}`)
})



