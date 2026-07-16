const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Pricing table based on garment type
const getPrice = (dressType = '') => {
  const type = dressType.toLowerCase();
  if (type.includes('premium black shirt'))  return 1600;
  if (type.includes('linen shirt') || type.includes('lenin')) return 1400;
  if (type.includes('formal shirt'))          return 1100;
  if (type.includes('t-shirt') || type.includes('t_shirt')) return 700;
  if (type.includes('hoodie'))                return 1800;
  if (type.includes('formal pant'))           return 1500;
  if (type.includes('baggy pants'))           return 1200;
  if (type.includes('shorts'))               return 800;
  return 1000; // default
};

// POST /api/orders — Place a new order
router.post('/', async (req, res) => {
  const orderData = req.body;

  // Delivery date: 10 days from today
  const estDate = new Date();
  estDate.setDate(estDate.getDate() + 10);
  const estimatedDateStr = estDate.toISOString().split('T')[0];

  const price = getPrice(orderData.dress_type);

  try {
    const newOrder = await pool.query(
      `INSERT INTO public.orders 
      (customer_name, phone, email, dress_type, chest, waist, shoulder, sleeve, height, weight, requirements, order_status, price, estimated_date) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
      RETURNING *`,
      [
        orderData.customer_name,
        orderData.phone,
        orderData.email.toLowerCase().trim(),
        orderData.dress_type,
        parseFloat(orderData.chest)    || 0,
        parseFloat(orderData.waist)    || 0,
        parseFloat(orderData.shoulder) || 0,
        parseFloat(orderData.sleeve)   || 0,
        parseFloat(orderData.height)   || 0,
        parseFloat(orderData.weight)   || 0,
        orderData.requirements || '',
        'Measuring',
        price,
        estimatedDateStr
      ]
    );

    res.status(201).json({ success: true, order: newOrder.rows[0] });
  } catch (err) {
    console.error('Create Order Error:', err);
    res.status(500).json({ success: false, message: 'Failed to create order.' });
  }
});

// GET /api/orders — Get all orders (optionally filtered by ?email=)
router.get('/', async (req, res) => {
  const { email } = req.query;

  try {
    let result;
    if (email) {
      result = await pool.query(
        'SELECT * FROM public.orders WHERE email = $1 ORDER BY order_date DESC',
        [email.toLowerCase().trim()]
      );
    } else {
      result = await pool.query('SELECT * FROM public.orders ORDER BY order_date DESC');
    }
    res.json({ success: true, orders: result.rows });
  } catch (err) {
    console.error('Get Orders Error:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve orders.' });
  }
});

// PUT /api/orders/:id/status — Update order status (admin)
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { order_status } = req.body;

  if (!order_status) {
    return res.status(400).json({ success: false, message: 'Missing order status.' });
  }

  try {
    const updated = await pool.query(
      'UPDATE public.orders SET order_status = $1 WHERE order_id = $2 RETURNING *',
      [order_status, id]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    res.json({ success: true, order: updated.rows[0] });
  } catch (err) {
    console.error('Update Status Error:', err);
    res.status(500).json({ success: false, message: 'Failed to update status.' });
  }
});

module.exports = router;
