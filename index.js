const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

// ✅ Use CORS middleware before any route
app.use(cors({
  origin: ['http://localhost:5173', 'https://bookingsystem-2-p9gw.onrender.com'], // No trailing slash
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB connection string
const url = "mongodb+srv://rajeedandge444:KjlFUozq7LbfGWKt@cluster1.zgrptvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// ✅ POST /add route with proper MongoDB connection handling
app.post("/add", async (req, res) => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db("mern");
    const coll = db.collection("events");

    const obj = {
      name: req.body.name,
      event: req.body.event,
      time: req.body.time,
      phone: req.body.phone
    };

    await coll.insertOne(obj);
    res.send("Data inserted successfully");
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).send("Error inserting data");
  } finally {
    await client.close();
  }
});

// ✅ GET /get route with proper MongoDB handling
app.get("/get", async (req, res) => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db("mern");
    const coll = db.collection("events");

    const data = await coll.find().toArray();
    res.send(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).send("Error fetching data");
  } finally {
    await client.close();
  }
});

// ✅ Dynamic port for Render deployment
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
