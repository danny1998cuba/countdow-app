const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000

require('./database')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/api', require('./routes').AuthRoutes)
app.use('/api/countdown', require('./routes').CountdownRoutes)
app.use('/api/user', require('./routes').UserRoutes)

const path = __dirname + '/views/';
app.use(express.static(path));
app.get('/*', function (req, res) {
    res.sendFile(path + "index.html");
});

app.listen(port, () => console.log('> Server is up and running on port : ' + port))