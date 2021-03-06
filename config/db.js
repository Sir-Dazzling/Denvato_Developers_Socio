const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//Connect to db
const connectDB = async() => 
{
    try
    {
      await mongoose.connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
      });

      console.log("MongoDB connected");
    }catch(error)
    {
        console.error(error.message);

        //Exit process with failure status
        process.exit(1);
    }
};

module.exports = connectDB;