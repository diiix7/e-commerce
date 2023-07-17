//Mongo database
require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27020/ecom',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )

    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error')
    process.exit(1)
  }
}

module.exports = {connectDB}
