import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//store schema

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNum: {
      type: Number,
      //required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    storeAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      postal: {
        type: Number,
        required: true,
      },
    },
    type: {
      type: String,
      required: true,
    },
    minAmount: {
      type: Number,
      required: true,
      default: 100,
    },
    deliveryRadius: {
      type: Number,
      required: true,
      default: 5,
    },
    freeDeliveryAmount: {
      type: Number,
      required: true,
      default: 500,
    },
    isOpen: {
      type: Boolean,
      required: true,
      default: true,
    },
    commissionPercentage: {
      type: Number,
      required: true,
      default: 2.5,
    },
    products: [
      {
        title: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        subType: {
          type: String,
        },
        description: {
          type: String,
        },
        filename: {
          type: String,
        },
        price: {
          type: Number,
          required: true,
        },
        discountedPrice: {
          type: Number,
        },
        countInStock: {
          type: Number,
          required: true,
          default: 0,
        },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

storeSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

storeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Store = mongoose.model("Store", storeSchema);

export default Store;
