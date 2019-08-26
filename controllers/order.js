const Order = require('../model/order');

exports.postOrder = async (req, res, next) => {
    const order = new Order({
        data: req.body
    });
    try {
        await order.save();
        res.send(req.body);
    }
    catch (err) {
        res.send(err);
    }
}

exports.getOrders = (req, res, next) => {
    Order.find({}, { data: 1, _id: 0 })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
};

exports.postUser = (req, res, next) => {
    const orderId = parseInt(req.body.orderId);
    const email = req.body.email;
    const phone = req.body.phone;
    Order.findOne({ "data.id": orderId })
        .then(order => {
            if (!order) {
                return res.send('Error');
            }
            order.data.email = email;
            order.data.phone = phone;
            order.markModified("data");
            return order.save();
        })
        .then(result => {
            res.redirect('/order');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getUser = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findOne({ "data.id": parseInt(orderId) }, { "data.email": 1, "data.phone": 1, "data.id": 1, "_id": 0 })
        .then(order => {
            if (!order) {
                return res.send('Error');
            }
            res.render('user/edit-user', {
                pageTitle: 'Edit User',
                path: '/user/edit-user',
                editing: true,
                order: order.data
            });
        })
        .catch(err => console.log(err));
};