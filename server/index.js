const express = require('express')
const { dbConnection } = require('./db');
var cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const { openapispec } = require('./spec');


const app = express()
const port = 5000

dbConnection()
app.get('/', (req, res) => {
  res.send('Hello My KING')
})

app.use(express.json())
app.use(cors())

app.use('/api/superadmin',require('./routes/superadmin'))      
app.use('/api/analysis',require('./routes/analysis'))      
app.use('/api/paper',require('./routes/paper')) 
app.use('/api/user',require('./routes/user')) 
app.use('/documentations', swaggerUi.serve, swaggerUi.setup(openapispec));   


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})