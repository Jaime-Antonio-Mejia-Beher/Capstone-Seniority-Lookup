const express = require('express')
const app = express()
const cors = require('cors');
const PORT = 4900
const employees = require('./database.js')
// console.log(employees)

app.use(cors())

app.get('/', (req, res) => {
    res.send('Working')
})

app.get('/employees', (req, res) => {
    res.send(employees.Employee)
})

app.listen(PORT, (req, res) => {
    console.log('Listening on ' + PORT)
})