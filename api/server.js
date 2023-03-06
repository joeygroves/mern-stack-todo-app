// Handles our API
const express = require('express');
// Handles our database
const mongoose = require('mongoose');
// Handles our cors
const cors = require('cors');

// Creates an Express application
const app = express();

app.use(express.json());
app.use(cors());