const express = require("express")

const app = express(); 

app.get("/user", (req, res) => {
  res.send({ "firstname": "Jaya Krishna Vamsi", "lastname": "Krishnamsetti" });
})

app.post("/user", (req, res) => {
  res.send("Data successfully save into database")
})

app.put("/user", (req, res) => {
  res.send("Data successfully updated in the database")
})

app.delete("/user", (req, res) => {
  res.send("User deleted successfully")
})

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
