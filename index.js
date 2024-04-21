// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// API handler
function APIhandler(req, res) {
  const string = req.params.date;
  let message;

  // Check if string is not empty
  if (string) {
    // Check if string contains numbers only and parse to integer before creating date object if true
    const date = /^\d+$/.test(string) ? new Date(parseInt(string)) : new Date(string);
    // Check if date object is a valid date and create message object
    message = isNaN(date.getTime()) ? { "error": "Invalid Date" } : { "unix": date.getTime(), "utc": date.toUTCString() };
  }
  // Create message object with current time if string is empty
  else {
    const currentDate = new Date();
    message = { "unix": currentDate.getTime(), "utc": currentDate.toUTCString() };
  }
  res.json(message);
}

app.get("/api/:date?", APIhandler);