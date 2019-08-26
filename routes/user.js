const express = require('express');

const orderController = require('../controllers/order');

const router = express.Router();

router.post('/', orderController.postUser);

router.get('/:orderId', orderController.getUser);


module.exports = router;