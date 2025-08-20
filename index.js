require('dotenv').config();
const bodyParser = require('body-parser')

const routes = require('./routes/index');

const express = require('express')
const app = express()
const port = 3000

global.reportAppError = (error) => {
  if(process.env.NODE_ENV !== 'development'){
    return;
  }
  console.log(error);
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
