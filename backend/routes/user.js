const express = require('express');
const { createUser, loginUSer, getSingle } = require('../controllers/user');
const router = express.Router();

router.post('/create', createUser)
router.post('/login', loginUSer)
router.get('/get/:_id', getSingle)



module.exports = router;