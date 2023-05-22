const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express();
require('dotenv').config()
// port to listen to the response
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())

// check the hidden database credentials
console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)


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

