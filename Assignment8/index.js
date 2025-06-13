import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";

const app = express();

// Fix view engine setup
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb+srv://govindpatel4033:Askrithe40%40@clusterg.l3yzewq.mongodb.net/todolist")
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Schema and model
const taskSchema = new mongoose.Schema({
  name: String
});

const Task = mongoose.model("Task", taskSchema, "list");

app.post("/add",async function (req, res) {
  try {
    const itemName = req.body.ele1.trim();
    if (itemName) {
      await Task.create({ name: itemName });
    }
    res.redirect("/");
  } catch (err) {
    console.error("❌ Error fetching items:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/edit",async function (req, res) {
  try {
    const newName = req.body.newName.trim();
    const id = req.body.id;
    if ((id) && newName){
      await Task.updateOne({ _id:id},{$set:{name :newName}});
    }
    res.redirect("/");
  } catch (err) {
    console.error("❌ Error fetching items:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete",async function (req, res) {
  try {
    const id = req.body.id;
    if (id){
    await Task.deleteOne({_id: id});
    }
    res.redirect("/");
  } catch (err) {
    console.error("❌ Error fetching items:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Route
app.get("/", async function (req, res) {
  try {
    const foundItems = await Task.find({});
    res.render("list", { ejes: foundItems });
  } catch (err) {
    console.error("❌ Error fetching items:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Server start
app.listen(8000, function () {
  console.log("🚀 Server started on port 8000");
});


// Any CRUD operation
// async function run() {
//   try {
//     // Optional: Clear collection if you want a fresh insert
//     // await Fruit.deleteMany({});

//     // Insert items
//     // await Fruit.insertMany([element1,element2,element3])
//     // .then(()=>{
//     //     console.log("🍎 Data inserted");
//     // });
//     await items.save();
//     await items.deleteOne();
    

//     // Fetch and log all items
//     const fruits = await Fruit.find();
//     fruits.forEach(num => {
//       console.log(num.name);
//     });

//     // await Fruit.updateOne({ name: "banana" }, {rating: 7});

//   } catch (err) {
//     console.error("❌ Error:", err);
//   } finally {
//     mongoose.connection.close(); // Always a good practice
//   }
// }

// run();