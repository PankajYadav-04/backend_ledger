const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/accounts',accountRoutes);

module.exports = app;