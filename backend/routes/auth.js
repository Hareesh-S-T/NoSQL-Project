const { Router } = require('express');
const router = require('express').Router();

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/registration', async (req, res) => {
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPW = await bcryptjs.hash(req.body.password, salt);
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPW
            }
        })
        res.status(201).send("User Registered")
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })
        if (user) {
            const pwCheck = await bcryptjs.compare(req.body.password, user.password);

            if (pwCheck) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
                res.status(200).header('authorization', token).send("Logged In");
            } else {
                res.status(200).send("Incorrect email or password entered.");
            }
            
        } else {
            res.status(200).send("Incorrect email or password entered.");
        }
    } catch (err) {
        console.log(err)
        res.status(400).send("Request could not be processed, try again later.");
    }
})

module.exports = router;