const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth.js')

router.post('/users/signup', async (req, res) => {
    try {
        const user = new User(req.body)
        const token = await user.generateWebToken();

        res.status(201).send({ user, token })
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    
    try {
        console.log("req.body",req.body);
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateWebToken();
        res.send({ user: user, token });
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

router.get('/user', auth, async (req, res) => {
    res.send(req.user)
})

// Update a user
router.patch('/user', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete a user
router.delete('/user', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router