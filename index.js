const mongoose = require("mongoose");

// Import Recipe model
const Recipe = require("./models/Recipe");

// Import data
const data = require("./data");

const MONGODB_URI = "mongodb://localhost/recipeApp";

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to Mongo!");
    Recipe.create({
      title: "fish with boiled rice",
      level: "Easy Peasy",
      ingredients: ["salmon", "vegetables", "potatoe", "onion", "salt"],
      dishType: "Dish",
      duration: 40,
      creator: "Catarina Mateus"
    });
  })
  .then(() => {
    Recipe.insertMany(data)
      .then((recipes) => {
        console.log('all the recipes were added');
      })
      .catch(err => {
        console.log("the recipes were already added", err)
      });
  })
  .then(() => {
    Recipe.updateOne({
        title: 'Rigatoni alla Genovese'
      }, {
        duration: 100
      })
      .then(() => {
        console.log('The update was a success!');
      })
      .catch(err => {
        console.log('It was not possible to update', err)
      })
  })
  .then(() => {
    Recipe.deleteOne({
        title: "meat with boiled potatoe"
      })
      .then(() => {
        console.log("The item was succesfully deleted");
      })
      .catch(err => {
        console.log("It was not possible to delete the desired item", err)
      });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  })
  .finally(() => {
    mongoose.connection.close();
  })