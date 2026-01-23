require("dotenv").config()
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const connectDB = require("./config/database")
const User = require("./models/user")
const { validateSignupData } = require("./utils/validation")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const { userAuth } = require("./middlewares/auth")

app.use(express.json())
app.use(cookieParser())

app.post("/signup", async (req, res) => {
  validateSignupData(req)

  const { firstName, lastName, emailId, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = new User({
    firstName,
    lastName,
    emailId,
    password: hashedPassword,
  })

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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body
    const user = await User.findOne({ emailId: emailId })
    if (!user) {
      throw new Error("Invalid Credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "SECRET_KEY", {
        expiresIn: "7d",
      })

      res.cookie("token", token, {
        expires: new Date(Date.now() + 168 * 3600000),
      })
      res.send("login successful")
    } else {
      throw new Error("Invalid Credentials")
    }
  } catch (e) {
    res.status(400).send("Error :" + e.message)
  }
})

app.get("/profile", userAuth, async (req, res) => {
  const user = req.user
  res.send(user)
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
      ALLOWED_UPDATES.includes(k),
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
