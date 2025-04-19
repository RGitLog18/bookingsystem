let express=require("express");
let cors= require("cors");
let {MongoClient}=require("mongodb");

let app=express();

app.use(cors());

app.use(express.json());


const url = "mongodb+srv://<db_username>:<db_password>@cluster0.yb5bafx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.post("/add",(request,response)=>{
    let client=new MongoClient(url);

    client.connect();

    let db=client.db("mern"); //can give any name to the database
    let coll=db.collection("events"); //can give any name to the collection
    let obj={
        name:request.body.name,
        event:request.body.event,
        time:request.body.time,
        phone:request.body.phone
    }

    coll.insertOne(obj)
    .then((result)=>response.send("Data inserted successfully"))
    .catch((err)=>response.send("Error inserting data"))
});

app.get("/get",(request,response)=>{
    let client=new MongoClient(url);
    client.connect();

    let db=client.db("mern");
    let coll=db.collection("events");
    

    coll.find().toArray()
    .then((resp)=>response.send(resp))
    .catch((error)=>response.send(error));
})

app.listen(9000,()=>{
console.log("Server is running on port 9000");
});

