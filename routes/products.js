// routes/products.js

const express = require('express');
const router = express.Router();
const { Customers, Products, OrderDetails, Orders } = require('../models');
const { json } = require('sequelize');

// GET products by customer ID
router.get('/:customerId/products', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customers.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // const products = await OrderDetails.findAll({
    //   include: [{
    //     model: Orders,
    //     where: { customerNumber: customerId}
    //   }]
    // });

    const orders = await Orders.findAll({
      include: [
        {
          model: OrderDetails,
          include: 'product'
        }
      ],
      where: { customerNumber: customerId}
    });
    // Check if orders exist
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for the specified customer' });
    }

    // Calculate total order amount
    let totalOrderAmount = 0;
    let totalOrderQty = 0;
    let totalOrderProduct = 0;
    orders.forEach(order => {
      order.orderdetails.forEach(orderDetail => {
        totalOrderAmount += orderDetail.quantityOrdered * orderDetail.priceEach;
        totalOrderQty += orderDetail.quantityOrdered
        totalOrderProduct ++
      });
    });

    res.json({ totalOrderAmount, totalOrderQty, totalOrderProduct, orders});
  } catch (error) {
    console.error('Error fetching products: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
