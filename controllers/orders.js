const Order = require('../models/order');

module.exports = {
    async create(req, res){
        const order = await new Order(req.body);
        order.save((err, order) => {
            if(err) return res.status(500).json({err});
            return res.json(order);
        })
    },

    async orderIndex(req, res){
        const orders = await Order.find().sort('-createdAt');
        return res.json(orders);
    }
}