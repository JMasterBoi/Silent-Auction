import { DB_URL } from "../secrets/config.js";
import express from "express";
import ViteExpress from "vite-express"
// ---------------------
import axios from "axios";
import bcrypt from "bcrypt";
import { Int32, MongoClient, ObjectId, ServerApiVersion } from "mongodb"

//# EXPRESS + VITE SETUP
const app = express();
app.use(express.json())
ViteExpress.listen(app, 3000, () =>
console.log("Server is active on http://localhost:3000/")
);

//# MONGO DB SETUP
const mongo = new MongoClient(DB_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

await mongo.connect();
console.log("MongoDB connected successully ✅");
const db = mongo.db("SIlent_Auction");
const usersDB = db.collection("users")
const itemsDB = db.collection("items")

app.post("/api/sign-in", async (req, res) => {
    const email = req.body.email
    const name = req.body.name

    // create and store password hash
    bcrypt.hash(req.body.password, 10).then((hashResponse) => {
        usersDB.insertOne({email: email, name: name, hash: hashResponse}).then((dbResponse) => {
            res.send(dbResponse.insertedId.toString())
        })
    });
})

app.post("/api/create-item", (req, res) => {
    const itemName = req.body.itemName;
    const itemDescription = req.body.itemDescription;
    const startingBid = req.body.startingBid;

    itemsDB.insertOne({
        itemName: itemName,
        itemDescription: itemDescription,
        bids: [{
            user: 0,
            amount: new Int32(startingBid),
            date: new Date()
        }]
    }).then((dbResponse) => {
        res.send(dbResponse.insertedId)
    })
})

app.post("/api/get-items", async (req, res) => {
    itemsDB.find().toArray().then((response) => {
        res.send(response)
    })
})

app.post("/api/bid", (req, res) => {
    console.log(req.body)
    const itemId = req.body.itemId
    const userId = req.body.userId
    const amount = req.body.amount

    const newBid = {
        user: userId,
        amount: new Int32(amount),
        date: new Date()
    }

    itemsDB.updateOne({_id: new ObjectId(itemId)}, {$push: {bids: newBid}}).then((res) => {
        console.log(res)
    })
});
