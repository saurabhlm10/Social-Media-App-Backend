require('dotenv').config()

const express = require('express')
const app = express()
const connectToDb = require('./config/db')
const cors = require('cors');

connectToDb()


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

module.exports = app
