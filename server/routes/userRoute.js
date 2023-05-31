import express from 'express';
import userSchema from '../modules/userSchema.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register',async(req,res)=>{

    const checkEmail = await userSchema.findOne({email : req.body.email});
    if (checkEmail) return res.status(422).send('this email is already present, try another');

   const salt = bcrypt.genSaltSync(10);
   const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new userSchema({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword,
    })

    try {
        const userRegister = await newUser.save();
        res.status(200).send(userRegister)
    } catch (error) {
        res.status(422).send(error)
    }
})

router.post('/login', async (req, res) => {

    const userLogin = await userSchema.findOne({ email: req.body.email });
    if (!userLogin) return res.status(422).send('please check your name or password');

    const userPass =  bcrypt.compareSync(req.body.password, userLogin.password);
    if (!userPass) return res.status(422).send('please check your name or password');

    if (userLogin && userPass) {
        
        const token = jwt.sign({ _id: userLogin._id, name: req.body.name }, process.env.secretkey,
            { expiresIn: 1000 * 60 * 60 })

        res.cookie("token", token,
            {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                expires: new Date(Date.now() + 1000 * 60 * 60)
            }
        ).json(token);
    }
})

router.get('/getusers',async(req,res)=>{
    try {
        const users = await userSchema.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(422).send(error)
    }
})

export default router