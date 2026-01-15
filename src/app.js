require("dotenv").config()
const express = require("express")
const app = express()
const connectDB = require("./config/database")
const User = require("./models/user")

app.use(express.json())

app.post("/signup", async (req, res) => {
  const user = new User(req.body)

  const userArray = await User.find({ emailId: req.body.emailId })

  try {
    if (userArray.length !== 0) {
      res.status(500).send("User Already Exists")
    }
    await user.save()
    res.send("User Added Successfully")
  } catch (e) {
    res.status(500).send("Unable to add User" + e)
  }
})

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId

  try {
    const user = await User.findOne({ emailId: userEmail })
    if (user.length == 0) {
      res.send("User not exists")
    }
    res.send(user)
  } catch (e) {
    res.send("Something went wrong")
  }
})

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({})

    res.send(users)
  } catch (e) {
    res.status(500).send("Something went wrong")
  }
})

app.patch("/user", async (req, res) => {
  const data = req.body
  const userId = data.userId

  try {
    const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "gender", "age"]

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    )

    if (!isUpdateAllowed) {
      throw new Error("Not Allowed fields exist")
    }

    if (data?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10")
    }

    await User.findByIdAndUpdate({ _id: userId }, req.body, {
      runValidators: true,
    })

    res.send("User Updated Successfully")
  } catch (e) {
    res.status(500).send(e.message)
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
