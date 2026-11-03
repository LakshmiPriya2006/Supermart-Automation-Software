import Customer from "../models/Customer.js";

export const addCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send(customer);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
};

export const updateCustomer = async (req, res) => {
  await Customer.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
};

export const deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.send("Deleted");
};

