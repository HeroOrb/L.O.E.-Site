require('dotenv').config(); 
const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const pool = new Pool({ 
    connectionString: process.env.LOE_PRISMA_DATABASE_URL 
});
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

const app = express();

app.use(express.static(path.join(__dirname, 'L.O.E.-Site/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
      
        if (!username || !password) {
            return res.status(400).json({ success: false, error: 'Username and password required' });
        }
      
        const user = await prisma.user.findUnique({
            where: { name: username },
            select: { name: true, password: true }
        });
        
        if (!user) {
            return res.json({ success: false, message: 'username'});
        }
        if (user.password !== password) {
            return res.json({ success: false, message: 'password'});
        }
      
        res.json({ success: true, user: { name: user.name } });
        } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});  

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
