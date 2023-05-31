import express from 'express';
import taskSchema from "../modules/taskSchema.js";

const router = express.Router();

router.post('/taskpost', async (req, res) => {
    const newtask = new taskSchema({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        user_id: req.body.user_id
    })

    try {
        const taskSave = await newtask.save();
        res.status(200).send(taskSave);
    } catch (error) {
        res.status(422).send(error)
    }
})

router.get('/gettask', async (req, res) => {
    try {
        const findTask = await taskSchema.find();
        res.status(200).send(findTask)
    } catch (error) {
        res.status(422).send(error)
    }
})

router.get('/usertask/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const findTask = await taskSchema.find({ user_id: id }).sort({ createdAt: -1 });
        res.status(200).send(findTask)
    } catch (error) {
        res.status(422).send(error)
    }
})

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const findTask = await taskSchema.findById(id);
    if (!findTask) return res.status(400).send('this task is not present')
    if (findTask.user_id === req.body.userId) {
        try {
            const updateTask = await taskSchema.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send(updateTask)
        } catch (error) {
            res.status(422).send(error)
        }
    } else {
        res.status(422).send('you can change only your task')
    }
})

router.put('/updatestatus/:id',async(req,res)=>{
    const { id } = req.params;
    try {
        const updateTask = await taskSchema.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).send(updateTask)
    } catch (error) {
        res.status(422).send(error)
    }
})

router.delete('/deletetask/:id', async (req, res) => {
    const { id } = req.params;
    const findTask = await taskSchema.findById(id);
    if (!findTask) return res.status(400).send('this task is not present')
    if (findTask.user_id === req.body.userId) {
        try {
            const findTask = await taskSchema.findByIdAndDelete(id);
            res.status(200).send('task deleted successfully..')
        } catch (error) {
            res.status(422).send(error)
        }
    } else {
        res.status(422).send('you can delete only your task')
    }
})

export default router

