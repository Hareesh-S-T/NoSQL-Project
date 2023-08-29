const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//TESTING
//THIS WORKS. FIND A WAY TO ENSURE CONNECTION TO DB BEFORE ACCEPTING ANY REQUESTS
async function main() {
    await prisma.$connect();
    const users = await prisma.user.findMany();
    console.log(users);
}

main()
.catch(console.error)

//--------------

//Importing Routes
const testRoute = require('./routes/test');

//Middleware
app.use(express.json());

//Route Middleware
app.use('/api/test/',testRoute);

//Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
});