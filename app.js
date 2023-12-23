//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/todoDB", { useNewUrlParser: true });
const taskschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const task = mongoose.model("task", taskschema);
const task1 = new task({
  name: "do bath",
});

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function (req, res) {
  const day = date.getDate();
  task.find().then(function (new_item, err) {
    if(new_item.length===0){
      task1.save();
      res.redirect("/");
    }
    res.render("list", { listTitle: day, newListItems: new_item });
  });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  const add_task = new task({
    name: item,
  });
  add_task.save();
  res.redirect("/");
});
app.post("/delete", function (req, res) {
  const removetask=req.body.checkbox;
  
  task.deleteOne({_id:removetask}).then(function(err){
      if(!err){
        console.log("Cannot delete item ");

      }
      else{
        console.log("deleted successfully");
      }
     
         
  });
 res.redirect("/");
      
});
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
