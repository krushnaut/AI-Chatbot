import mongoose from "mongoose";

function connect() {
  const uri = process.env.MONGODB_URI || "your_default_mongodb_uri_here";
  
  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    console.log("Error: Invalid MongoDB URI. It must start with 'mongodb://' or 'mongodb+srv://'");
    return;
  }

  mongoose.connect(uri)
  .then(() => {  
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });
}

export default  connect ;