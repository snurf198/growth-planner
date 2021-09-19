const express = require('express')
const app = express()
const port = 8080
const fs = require('fs')

app.use(express.json());

app.get('/api/toDoList', (req, res) => {
  const toDoList = fs.readFileSync('./database/toDoList.json');
  res.send(toDoList);
})

app.post('/api/toDoList', (req, res) => {
    const toDoList = req.body;
    fs.writeFileSync('./database/toDoList.json', JSON.stringify(toDoList))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${8080}`)
})