const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));  // برای ارائه index.html

let ledCommand = null;

app.post('/set-led', (req, res) => {
  const { led } = req.body;
  if (led !== 'on' && led !== 'off') {
    return res.status(400).send("دستور نامعتبر");
  }
  ledCommand = led;
  res.send("دستور ثبت شد: " + led);
});

app.get('/get-led', (req, res) => {
  res.send(ledCommand || "none");
  ledCommand = null;
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("سرور روی پورت " + PORT + " اجرا شد");
});
