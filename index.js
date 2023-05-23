const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express();
require('dotenv').config()
// port to listen to the response
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3vaow4q.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    // access the stored data in the mongoDB database
    const allToyCollection = client.db("enjoyToy").collection("allToyCars")
    const regularToyCollection = client.db("enjoyToy").collection("regularToy")
    const sportsToyCollection = client.db("enjoyToy").collection("sportsToy")
    const policeToyCollection = client.db("enjoyToy").collection("policeToy")
    const newToyCollection = client.db("enjoyToy").collection("newToy")


    // get all toy information from the mongoDB database stored under the allToyCars folder.
    app.get('/allToyCars', async (req, res) => {
      const cursor = allToyCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // get regular toy car information
    app.get('/regularToy', async (req, res) => {
      const cursor = regularToyCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    // get sports toy car information
    app.get('/sportsToy', async (req, res) => {
      const cursor = sportsToyCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // get police toy car information
    app.get('/policeToy', async (req, res) => {
      const cursor = policeToyCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // get a specific toy info based on id
    app.get('/viewDetails/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await allToyCollection.findOne(query)
      res.send(result)
    })

    // store the client side's new toy information to the mongoDB database
    app.post('/newToyDetails', async (req, res) => {
      const newToyInfo = req.body;
      const result = await newToyCollection.insertOne(newToyInfo)
      res.send(result)
    })

    // use query parameter to get specified user's all the added toys
    app.get('/myToys', async (req, res) => {
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email }
      }
      const result = await newToyCollection.find(query)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// default route
app.get('/', (req, res) => {
  console.log('Toy Marketplace Server is running')
})

// port to listen to the response sent from the sever
app.listen(port, () => {
  console.log(`The server is running on PORT:${port} `)
})

