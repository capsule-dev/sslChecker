const express = require('express')
const bodyParser = require('body-parser');
const sslChecker = require('ssl-checker').default

const app = express()
const port = 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/layout', express.static('layout'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.post('/check', async (req, res) => {
  console.log(req.body.domain);
  const getSslDetails = await sslChecker(req.body.domain);
  res.send({ domain: req.body.domain, ...getSslDetails});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
