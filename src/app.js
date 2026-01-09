const express = require("express")
const app = express()
const connectDB = require("./config/database")
const User = require("./models/user")

app.use(express.json()); 

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save(); 
    res.send("User Added Successfully");
  }
  catch (e) {
    res.send("Unable to add User" + e);
  }
})

connectDB()
  .then(() => {
    console.log("Database connection successful")
    app.listen(7777, () => {
      console.log("Server is listening on port 7777")
    })
  })
  .catch((e) => {
    console.log("Database connection failed", e)
  })
