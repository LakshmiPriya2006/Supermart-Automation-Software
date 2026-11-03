import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    if (!req.body.items || req.body.items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = await Order.create({
      items: req.body.items,
      totalAmount: req.body.totalAmount
    });

    res.status(201).json({ message: "Order saved", order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
