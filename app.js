require('dotenv').config()

const express = require('express')
const app = express()
const connectToDb = require('./config/db')
const cors = require('cors');
const morgan = require('morgan')

connectToDb()


app.use(cors());
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

module.exports = app
