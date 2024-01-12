require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();