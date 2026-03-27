const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

let orders = [
  { id: 1041, customerName: 'Rahul Sharma',  items: 'Margherita Pizza, Coke',   amount: 480, icon: '🍕', status: 'preparing', createdAt: '10 mins ago' },
  { id: 1042, customerName: 'Priya Verma',   items: 'Burger Combo, Fries',      amount: 320, icon: '🍔', status: 'ready',     createdAt: '18 mins ago' },
  { id: 1043, customerName: 'Amit Singh',    items: 'Noodles, Spring Rolls',    amount: 260, icon: '🍜', status: 'placed',    createdAt: '3 mins ago'  },
  { id: 1044, customerName: 'Sneha Patel',   items: 'Thali Set, Lassi',         amount: 380, icon: '🍱', status: 'delivered', createdAt: '35 mins ago' },
  { id: 1045, customerName: 'Vikram Nair',   items: 'Paneer Tacos x2',          amount: 290, icon: '🌮', status: 'preparing', createdAt: '12 mins ago' },
];
let nextId = 1046;

// GET all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// POST place new order
app.post('/orders', (req, res) => {
  const { customerName, items, amount, icon } = req.body;
  if (!customerName || !items) return res.status(400).json({ error: 'customerName and items are required' });
  const order = {
    id: nextId++,
    customerName,
    items,
    amount: amount || 0,
    icon: icon || '🍔',
    status: 'placed',
    createdAt: 'just now'
  };
  orders.unshift(order);
  res.status(201).json(order);
});

// PATCH update order status
app.patch('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  if (req.body.status) order.status = req.body.status;
  res.json(order);
});

// DELETE cancel order
app.delete('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = 'cancelled';
  res.json(order);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`QuickBite running at http://localhost:${PORT}`);
});

module.exports = app;
