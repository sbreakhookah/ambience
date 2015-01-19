//app.js
// These two lines are required to initialize Express in Cloud Code.

var express = require('express');
var Mailgun = require('mailgun');

Mailgun.initialize('sandbox8881de73d7f5453cbb1705007d0bf630.mailgun.org', 'key-9f33b4be3a915e4c3c4e28858309521e');
var app = express();


// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
  res.send('hello');
});


app.post('/sendEmail', function(req, res){
    Mailgun.sendEmail({
        to: "sbreakhookah@gmail.com",
        from: req.body.name+" <"+req.body.email+">",
        subject: "Contact Us Form!",
        text: req.body.message
    },{
        success: function(httpResponse){
        console.log("Success");
        res.send("Email successfully sent!");
    },
        error: function(httpResponse){
        console.error(httpResponse);
        res.send("Error");
    }
        
    });
});

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();
