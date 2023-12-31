const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// react-components-user
//9a8gktAn8NSGCUSv

const uri =
  "mongodb+srv://react-components-user:9a8gktAn8NSGCUSv@cluster0.mjrato5.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    const componentsTitleCollection = client.db("reactComponentsDB").collection("componentsTitle");
    const componentsCollection = client.db("reactComponentsDB").collection("component");

    //components code
    // components post
    app.post("/componentsTitle", async (req, res) => {
      try {
        const newTitle = req.body;
        console.log(newTitle);

        const result = await componentsTitleCollection.insertOne(newTitle);
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    // get components title
    app.get("/componentsTitle", async (req, res) => {
      try {
        const cursor = componentsTitleCollection.find();
        const result = await cursor.toArray();

        res.send(result);
      } catch (err) {
        console.log(err);
      }
    });

    //components

    //post components name
    app.post("/component", async (req, res) => {
        try {
          const newCode = req.body;
          console.log(newCode);
  
          const result = await componentsCollection.insertOne(newCode);
          res.send(result);
        } catch (err) {
          console.log(err);
        }
      });
  
      // get components name
      app.get("/component", async (req, res) => {
        try {
          const cursor = componentsCollection.find();
          const result = await cursor.toArray();
  
          res.send(result);
        } catch (err) {
          console.log(err);
        }
      });

      // delete components 
      app.delete("/component/:id", async (req, res) => {
        try {
          const id = req.params.id;
          console.log("delete id : id");
          const query = { _id: new ObjectId(id) };
  
          const result = await componentsCollection.deleteOne(query);
          res.send(result);
        } catch (err) {
          console.log(err);
        }
      });





    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("SIMPLE CRUD IS RUNNING");
});

app.listen(port, () => {
  console.log(`Simple CRUD is running on Port , ${port}`);
});
