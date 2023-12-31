const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//Middleware
app.use(express.json());

//TESTING
//THIS WORKS. FIND A WAY TO ENSURE CONNECTION TO DB BEFORE ACCEPTING ANY REQUESTS
// async function main() {
//     await prisma.$connect();
//     const users = await prisma.user.findMany();
//     console.log(users);
// }
// main()
// .catch(console.error)

//--------------

//Importing Routes
const testRoute = require('./routes/test');
const authRoute = require('./routes/auth');

//Route Middleware
app.use('/api/test/', testRoute);
app.use('/api/auth/', authRoute);

//Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
});