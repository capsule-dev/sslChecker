const express = require('express')
const bodyParser = require('body-parser');
const sslChecker = require('ssl-checker').default;
const request = require('request');

const app = express()
const port = 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/layout', express.static('layout'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.post('/check', async (req, res) => {
  const getSslDetails = await sslChecker(req.body.domain);
  if(getSslDetails.daysRemaining <= 15){
      var options = {
        'method': 'POST',
        'url': 'https://notify-api.line.me/api/notify',
        'headers': {
          'Authorization': 'Bearer nIw0WnelMMZ2UYpE3uNXvRMN8NRcSdQN4cbVvDJF41W',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
          'message': `${req.body.domain} : ${getSslDetails.daysRemaining} Days SSL Expire !!! `,
          'imageThumbnail' : 'https://inwfile.com/s-dm/dazkgm.jpg',
          'imageFullsize' : 'https://inwfile.com/s-dm/dazkgm.jpg'
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
      });
  }
  res.send({ domain: req.body.domain, ...getSslDetails});

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
