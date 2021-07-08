const express=require("express");
const app=express();
const port=process.env.PORT || 5000;
const mongodb=require("mongodb");
const mongoClient=mongodb.MongoClient;
//const dbUrl = "mongodb://127.0.0.1:27017"
const dbUrl ="mongodb+srv://abhiram:Sasi@2021@cluster0.jwhdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).send("welcome")
})
app.get("/user",(req,res)=>{
    console.log("user")
    res.status(200).send("user route")
})
const students=[]

app.get("/students",async(req,res)=>{

//open connection
let client= await mongoClient.connect(dbUrl);  
try{
//select the db
let db=client.db("b21WEdb");
//select the collection and perform db operation
const data = await db.collection("users").find().toArray()
//close connections

res.json({message:"Success",data})
    }catch(error){
        console.log(error)
        res.json({message:"something wrong"})
    }
finally{
client.close();
}
})

app.get("/students",(req,res)=>{
    res.status(200).json({students})
})
app.get("/students/:id",async(req,res)=>{
     
    let client= await mongoClient.connect(dbUrl);  
    const objid=mongodb.ObjectID(req.params.id)
    try{
    //select the db
    let db=client.db("b21WEdb");
    //select the collection and perform db operation
    const data = await db.collection("users").findOne({_id: objid})
    //close connections
   if(data){
    res.json({message:"Success",data})
   }
    else res.json({message:"No user Availablw with this id"})
   
    
        }catch(error){
            console.log(error)
            res.json({message:"something wrong"})
        }
    finally{
    client.close();
    }
    })

app.put("/students-update/:id",async(req,res)=>{
   
        //open connection
        let client= await mongoClient.connect(dbUrl);  
        const objid=mongodb.ObjectID(req.params.id)
        try{
        //select the db
        let db=client.db("b21WEdb");
        //select the collection and perform db operation
        const data = await db.collection("users").findOne({_id: objid})
        //close connections
        if(data){
            const updated=await db.collection("users").findOneAndUpdate({_id:objid},{$set:{phone:req.body.phone}})
            res.json({message:"Success"})
        }else res.json({message:"no user with this id"})
    
       
            }catch(error){
                console.log(error)
                res.json({message:"something wrong"})
            }
        finally{
        client.close();
        }
        })
        app.delete("/delete-students/:id",async(req,res)=>{
            let client= await mongoClient.connect(dbUrl);  
        const objid=mongodb.ObjectID(req.params.id)
        try{
        //select the db
        let db=client.db("b21WEdb");
        //select the collection and perform db operation
        const data = await db.collection("users").findOne({_id: objid})
        //close connections
        if(data){
            const updated=await db.collection("users").findOneAndDelete({_id:objid})
            res.json({message:"Record deleted"})
        }else res.json({message:"no user with this id"})
    
       
            }catch(error){
                console.log(error)
                res.json({message:"something wrong"})
            }
        finally{
        client.close();
        } 
        })

app.listen(port,()=>{
    console.log(`server listening in port ${port}`)
})