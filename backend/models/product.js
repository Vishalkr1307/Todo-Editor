const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    taskStatus: { type: String, required: true,enum: ['todo', 'in-progress', 'done'] },
    tags: [{ type: String, required: true,enum: ['personal', 'offical', 'other'] }],
    subTasks: [
      {
        subTasksTitle: { type: String, required: true },
        status: { type: Boolean, default: false },
      },
    ],

    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);

// const { ObjectId } = require("mongodb");
// const { getDb } = require("../config/db");
// // const ObjectId = require('mongodb').ObjectId

// class Product {
//   constructor(title, price, description, UserId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.UserId = UserId;
//     // this.image_url=image_url
//   }
//   save() {
//     const database = getDb();
//     database
//       .collection("products")
//       .insertOne(this)
//       .then((data) => {
//         // console.log(data)
//         return data;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   static findAll(id) {
//     const database = getDb();
//     return database
//       .collection("products")
//       .find({ UserId: id })
//       .toArray()
//       .then((product) => product);
//   }

//   static findById(id) {
//     const database = getDb();
//     return database.collection("products").findOne({ _id: new ObjectId(id) });
//   }

//   static findOne(key, value) {
//     const database = getDb();
//     const query = {};
//     query[key] = value;
//     return database.collection("products").findOne(query);
//   }

//   static findByIdAndUpdate(id, data) {
//     const database = getDb();

//     return database
//       .collection("products")
//       .updateOne({ _id: new ObjectId(id) }, { $set: data })
//       .then((product) => product);
//   }
//   static findByIdAndDelete(id) {
//     const database = getDb();

//     return database.collection("products").deleteOne({ _id: new ObjectId(id) });
//   }
// }

// module.exports = Product;
