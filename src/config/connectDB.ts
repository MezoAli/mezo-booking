import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(process.env.DATABASE_URL!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("connected to db");
    });
    connection.on("error", () => {
      console.log("failed to connect to db");
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
