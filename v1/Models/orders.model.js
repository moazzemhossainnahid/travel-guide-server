const mongoose = require("mongoose");
const validator = require("validator");


const orderSchema = mongoose.Schema(
  {
    total_amount: String,
    currency: String,
    tran_id: String,
    paymentStatus: String,
    hotel_name: String,
    hotel_location: String,
    hotel_image: String,
    room_title: String,
    room_image: String,
    entryDate: String,
    exitDate: String,
    cus_name: String,
    cus_email: String,
    cus_phone: String,
    success_url: String,
    fail_url: String,
    cancel_url: String,
    ipn_url: String,
    val_id: String,
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("orders", orderSchema);

module.exports = Orders;
