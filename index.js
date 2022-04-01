const express = require('express')
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;
const cors = require('cors')

app.use(cors());
app.use(express.json())


// user: project-listing-server
// pass: XWwn4MzHgqvC19vr

// connecting server------------------------->
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gkhtj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);



async function run() {
    try {
      await client.connect();
      const database = client.db("project-list");
        const lists = database.collection("lists");
        


        // list data post
     
        app.post('/lists', async (req, res) => {
            console.log(req.body);
            const list = req.body;
            const result = await lists.insertOne(list);
            console.log(result);

        // list data get
            
            app.get('/lists', async(req, res) => {
                const cursor = lists.find({});
                const getList = await cursor.toArray();
                res.send(getList);
                console.log(getList);
            })
    

    })
        
        
        
    
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);












app.get('/', (req, res) => {
    res.send('This is project listing site server')
})

app.listen(port, () => {
    console.log('server is running on port', port);
})