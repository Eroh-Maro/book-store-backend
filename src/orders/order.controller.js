import Order from "./order.model.js";

const createAOrder = async (req, res) =>{
    try {
      const newOrder = await Order(req.body)
      const savedOrder = await newOrder.save()
      res.status(200).json(savedOrder)
    } catch (error) {
      console.log("Error creating order", error);
      res.status(500).send({message: "Failed to create a book", error})
    }
 }

 const getOrderByEmail = async (req, res) =>{
    try {
    const {email} = req.params
      const orders = await Order.find({email}).sort({createdAt: -1});
      if(!orders)
        { 
        return res.status(404).send({message: "No orders found"})
    }
      res.status(200).json(orders)
    } catch (error) {
      console.log("Error getting orders", error);
      res.status(500).send({message: "Failed to get orders", error})
    }
 }
 export {createAOrder, getOrderByEmail};