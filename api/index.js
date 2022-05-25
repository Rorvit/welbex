const express = require('express')
const app = express()
const {initializeDbModels,syncDbTables} = require('./utils/db')
const sequelize = require('./db_models')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const PORT = process.env.API_PORT || 80

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/files',express.static('files'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  createParentPath: true
}));

(async function initDB() {
  try {
    initializeDbModels(sequelize)
    await syncDbTables()
  } catch (err) {
    console.log(err)
  }
})()

app.use('/api',require('./routes/api'))
app.use((req, res) =>
  res.status(404).json({ error: { type: 'NOT FOUND', code: 404 } }))

app.listen(PORT,() => console.log(`app listening on port ${PORT}`))
