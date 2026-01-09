const mongoose = require("mongoose")

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:71XLJvAWiAzivOpR@namastenode.ursl6qs.mongodb.net/devTinder"
  )
}

module.exports = connectDB;
