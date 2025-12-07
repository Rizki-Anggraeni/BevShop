const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, adminOnly } = require('../middleware/auth');

router.post('/', auth, orderController.createOrder);
router.get('/my-orders', auth, orderController.getMyOrders);
router.get('/all', auth, adminOnly, orderController.getAllOrders);
router.get('/:id', auth, orderController.getOrderById);
router.put('/:id', auth, adminOnly, orderController.updateOrderStatus);

module.exports = router;
