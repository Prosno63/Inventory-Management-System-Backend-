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


        //............To Show All the Products to the users............

        app.get('/api/products', async (req, res) => {

            const cursor = productCollection.find();
            const result = await cursor.toArray();
            res.send(result);

        });


        //...........To View One clicked Products to the users.........

        app.get('/api/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: id }
            const result = await productCollection.findOne(query);
            res.send(result);
        });


        //..........To update any specific product info..............

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
            res.send(result)
        });

        //ADD new products...........................................................
        app.post('/api/products', async (req, res) => {
            const newProduct = req.body;
            //console.log(newCoffee);
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        });

        //................Delete One Item...................

        app.delete('/api/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: id}
            const result = await productCollection.deleteOne(query);
            res.send(result);
        });


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
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