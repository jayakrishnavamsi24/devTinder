const express = require("express")

const app = express(); 
const { adminAuth } = require("./middlewares/auth")

app.use("/", (err, req, res, next) => {
  if (err) {
    res.send("Some unknown error occurred")
  }
})

app.get("/getUser", (req, res) => {
  try {
    throw new Error("Some unknown Error");
    res.send("User Details here")
  } catch (e) {
    res.status(500).send("Failed fetching data")
  }
  
})

app.use("/", (err, req, res, next) => {
  if (err) {
    res.send("Some unknown error occurred")
  }
})

// // app.use("/admin", adminAuth);

// app.get("/admin/getUser", adminAuth, (req, res) => {
//   res.send("Here are user Details")
// })

// app.get("/user", (req, res, next) => {
//   // res.send({ "firstname": "Jaya Krishna Vamsi", "lastname": "Krishnamsetti" });
//   next();
// }, (req, res) => {
//   console.log("Hello Vamsi")
//   res.send({firstname: "Jaya Krishna Vamsi"})
// })

// app.post("/user", (req, res) => {
//   res.send("Data successfully save into database")
// })

// app.put("/user", (req, res) => {
//   res.send("Data successfully updated in the database")
// })

// app.delete("/user", (req, res) => {
//   res.send("User deleted successfully")
// })


// app.use("/hello", (req, res) => {
//   res.send("Hello hello hello")
// })

// app.use("/hello/2", (req, res) => {
//   res.send("Hello hello 2.")
// })


// app.use((req, res) => {
//     res.send("Hello hello hello")
// })

// app.use("/test", (req, res) => {
//   res.send("Hello from the server")
// })

// app.use("/", (req, res) => {
//   res.send("Home path")
// })

app.listen(7777, () => {
    console.log("Server is listening on port 7777");
});
