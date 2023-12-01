const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;


//middleware

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pvbu7gg.mongodb.net/?retryWrites=true&w=majority`;

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
        //await client.connect();

        const productCollection = client.db("InventoryManagementDB").collection("products");



        //............1. (Create Product).............................................

        app.post('/api/products', async (req, res) => {
            const newProduct = req.body;
            //console.log(newCoffee);
            const result = await productCollection.insertOne(newProduct);
            if (result.acknowledged) {
                res.status(201).send(result);
            } else {
                res.status(500).send('Unable to create product');
            }
        });


        //...........2. Fetch Products................................................

        app.get('/api/products', async (req, res) => {

            const cursor = productCollection.find();
            const result = await cursor.toArray();
            if (result.length > 0) {
                res.status(200).send(result);
            } else {
                res.status(404).send('No products found');
            }

        });


        //...........3. Fetch Product by ID..........................................

        app.get('/api/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: id }
            const result = await productCollection.findOne(query);
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send('Product not found');
            }
        });


        //..........4. Update Product...............................................

        app.put('/api/products/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: id }
            const options = { upsert: true };
            const updatedProduct = req.body;
            const Product = {
                $set: {
                    name: updatedProduct.name,
                    Brand: updatedProduct.Brand,
                    description: updatedProduct.description,
                    Price: updatedProduct.Price,
                    PhotoUrl: updatedProduct.PhotoUrl
                }
            }
            const result = await productCollection.updateOne(filter, Product, options);
            if (result.modifiedCount) {
                res.status(200).send(result);
            } else if (result.upsertedCount) {
                res.status(201).send(result);
            } else {
                res.status(404).send('Product not found');
            }
        });



        //................5. Delete Product........................................

        app.delete('/api/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: id }
            const result = await productCollection.deleteOne(query);
            if (result.deletedCount) {
                res.status(204).send('Product deleted successfully');
            } else {
                res.status(404).send('Product not found');
            }
        });


        // Send a ping to confirm a successful connection
        //await client.db("admin").command({ ping: 1 });
        //console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Inventory is Running');
})

app.listen(port, () => {
    console.log(`Inventory is running on port ${port}`);
})