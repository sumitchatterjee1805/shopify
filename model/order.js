const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    data: JSON
});

module.exports = mongoose.model('Order', orderSchema);
