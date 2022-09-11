import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import { products } from "./data/products.js";
import users from "./data/users.js";
import stores from "./data/stores.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Store from "./models/storeModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

//imports seed data

const importData = async () => {
  try {
    await User.deleteMany();
    await Store.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    //generate random commission % for each store between 1-5
    const sampleStores = stores.map((store) => {
      let randomNum = (1 + Math.random() * 5).toFixed(2);
      let minAmount = Math.floor(100 + Math.random() * 100);
      let deliveryRadius = Math.floor(2 + Math.random() * 5);
      let freeDeliveryAmount = Math.floor(200 + Math.random() * 100);
      return {
        ...store,
        commissionPercentage: randomNum,
        minAmount: minAmount,
        deliveryRadius: deliveryRadius,
        freeDeliveryAmount: freeDeliveryAmount,
      };
    });
    const createdStores = await Store.insertMany(sampleStores);

    //generate random store id for each product
    const sampleProducts = products.map((product) => {
      let randomNum = Math.floor(Math.random() * stores.length);
      const randomStoreId = createdStores[randomNum]._id;
      return {
        ...product,
        store: randomStoreId,
      };
    });
    await Product.insertMany(sampleProducts);

    //add products to store wrt previous random store allotment
    const productList = await Product.find({});
    createdStores.map(async (store) => {
      let storeProducts = productList.filter((x) => {
        return x.store.toString() === store._id.toString();
      });
      await Store.findByIdAndUpdate(store._id, {
        $set: { products: storeProducts },
      });
      /*this should have been the right way, but it's not working, sigh!*/
      /*const myStore = await Store.findById(store._id);
      myStore.products = storeProducts;
      await myStore.save();*/
    });
    const doc = await Store.find({});
    await doc.save(); //because findAndUpdate ftns don't save themselves

    console.log(`Data imported`.green.bold);
    process.exit();
  } catch (error) {
    console.log(`Error while importing data: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Store.deleteMany();

    console.log(`Data destroyed`.red.bold);
    process.exit();
  } catch (error) {
    console.log(`Error while destroying data: ${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
