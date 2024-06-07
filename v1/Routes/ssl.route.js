const express = require("express");
const router = express.Router();
const Orders = require("../Models/orders.model");
const SSLCommerzPayment = require("sslcommerz-lts");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();




// Initialize payment
router.post("/init", async (req, res) => {
  try {
    console.log(req.body);
    console.log("Hitting");
    const productInfo = {
      total_amount: req.body.total_amount,
      currency: "BDT",
      tran_id: uuidv4(),
      paymentStatus: 'pending',
      deliveryStatus: "pending",
      shipping_method: "Courier",
      hotel_name: req.body.hotel_name,
      hotel_location: req.body.hotel_location,
      hotel_image: req.body.hotel_image,
      room_title: req.body.room_title,
      room_image: req.body.room_image,
      entryDate: req.body.entryDate,
      exitDate: req.body.exitDate,
      cus_name: req.body.cus_name,
      cus_email: req.body.cus_email,
      cus_phone: req.body.cus_phone,
      product_name: req.body.room_title,
      product_category: "room",
      product_profile: req.body.room_title,
      product_image: req.body.room_image,
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_fax: req.body.cus_phone,
      ship_name: req.body.cus_name,
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
      multi_card_name: "mastercard",
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
      success_url: `${process.env.ROOT}/ssl-payment-success`,
      fail_url: `${process.env.ROOT}/ssl-payment-fail`,
      cancel_url: `${process.env.ROOT}/ssl-payment-cancel`,
      ipn_url: `${process.env.ROOT}/ssl-payment-notification`,
    };

    // console.log("productInfo", productInfo);

    // Insert order info
    await Orders.create(productInfo);

    const sslcommerz = new SSLCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASS,
      false
    ); //true for live default false for sandbox
    sslcommerz.init(productInfo).then((data) => {
      //process the response that got from sslcommerz
      //https://developer.sslcommerz.com/doc/v4/#returned-parameters
      const info = { ...productInfo, ...data };
      console.log(data?.GatewayPageURL);

      if (data?.GatewayPageURL) {
        console.log('Redirecting to: ', data?.GatewayPageURL);

        return res.status(200).send(data?.GatewayPageURL);

        // res.send({data?.GatewayPageURL})
      } else {
        return res.status(400).json({
          message: "Session was not Successful",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

router.post("/ssl-payment-success", async (req, res) => {
  console.log("body", req.body);
  console.log("Hitting");
  try {
    await Orders.updateOne(
      { tran_id: req.body.tran_id },
      {
        $set: {
          val_id: req.body.val_id,
        },
      }
    );

    res.redirect(
      `${process.env.CLIENT_URL}/ssl-payment-success/${req.body.tran_id}`
    );
  } catch (error) {
    console.log(error);
  }
});

router.post("/ssl-payment-fail", async (req, res) => {
  try {
    const result = await Orders.deleteOne({ tran_id: req.body.tran_id });

    res.redirect(`${process.env.CLIENT_URL}`);
  } catch (error) {
    console.log(error);
  }
});

router.post("/ssl-payment-cancel", async (req, res) => {
  try {
    const result = await Orders.deleteOne({ tran_id: req.body.tran_id });

    res.redirect(`${process.env.CLIENT_URL}`);
  } catch (error) {
    console.log(error);
  }
});

router.post("/ssl-payment-notification", (req, res) => {
  try {
    console.log(req.body);
    res.send(req.body);
  } catch (error) {
    console.log(error);
  }
});

router.post("/validate", async (req, res) => {
  try {
    const result = await Orders.findOne({
      tran_id: req.body.tran_id,
    });

    if (result.val_id === req.body.val_id) {
      const update = await Orders.updateOne(
        { tran_id: req.body.tran_id },
        {
          $set: {
            paymentStatus: "paymentComplete",
          },
        }
      );
      console.log(update);
      res.send(update.modifiedCount > 0);
    } else {
      res.send("Chor detected");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/orders/:tran_id", async (req, res) => {
  try {
    const id = req.params.tran_id;
    const result = await Orders.findOne({ tran_id: id });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/orders", async (req, res) => {
  try {
    const query = {};
    const result = await Orders.find(query).toArray();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;