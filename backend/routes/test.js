const { Router } = require('express');

const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

router.get('/status', (req, res) => {
    res.status(200).send("Server Responding");
});

router.get('/getUsers', async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany()
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;