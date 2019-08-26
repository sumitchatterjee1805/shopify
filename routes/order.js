const express = require('express');

const orderController = require('../controllers/order');

const router = express.Router();

router.post('/', orderController.postOrder);

router.get('/', orderController.getOrders);


module.exports = router;