import express from 'express';
import { Customers, Products, OrderDetails, Orders } from '../models/index.js';
import { json } from 'sequelize';

const router = express.Router();

// GET products by customer ID
router.get('/:customerId/products', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customers.findByPk(customerId,{raw: true});
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const orders = await Orders.findAll({
      include: [
        {
          model: OrderDetails,
          include: 'product'
        }
      ],
      where: { customerNumber: customerId},
      raw: true,
      nest: true
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
        totalOrderAmount += order.orderdetails.quantityOrdered * order.orderdetails.priceEach;
        totalOrderQty += order.orderdetails.quantityOrdered
        totalOrderProduct ++
    });

    res.json({ totalOrderAmount, totalOrderQty, totalOrderProduct, orders});
  } catch (error) {
    console.error('Error fetching products: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;