import mongoose from "mongoose";
//establishes a connection to mongo

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`Database connected at: ${db.connection.host}`.yellow.bold);
  } catch (err) {
    console.log(`Error: ${err}`.red.bold);
  }
};

export default connectDB;
