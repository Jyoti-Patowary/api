const express = require('express');
const router = express.Router();

const {User} = require('../models/user');
const {Task} = require('../models/tasks');

router.use(express.json());

//                                      User

router.post('/api/users', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }
});

router.get('/api/users', async (req, res) => {
    let data = await User.find({});
    res.json(data);
});

router.get('/api/user/:id', async (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(400).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})

router.patch('/api/user/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation) {
        return res.status(400).send({error:'Invalid Updates!'})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, })

        if(!User) {
            return res.status(400).send()
        }

        res.send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete("/api/user/:id", async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!User){
            return res.status(400).send()
        }

        res.send(user)
    } catch(e) {
        res.status(400).send()
    }
})



//                                               Tasks

router.post('/api/tasks', async (req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
});


router.get('/api/tasks', async (req, res) => {
    let data = await Task.find({});
    res.json(data);
});


router.get('/api/task/:id', async (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(400).send()
        }
        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})

router.patch('/api/task/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation) {
        return res.status(400).send({error:'Invalid Updates!'})
    }
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true, })

        if(!Task) {
            return res.status(400).send()
        }

        res.send(task)
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete("/api/task/:id", async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!Task){
            return res.status(400).send()
        }

        res.send(task)
    } catch(e) {
        res.status(400).send()
    }
})


module.exports = router; 