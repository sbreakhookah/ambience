// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views'); // Specify the folder to find templates
app.set('view engine', 'ejs'); // Set the template engine
app.use(express.bodyParser()); // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
    //res.render('hello', { message: 'Congrats, you just set up your app!' });

    Parse.Cloud.httpRequest({
        url: 'http://echo.jsontest.com/key/value/one/two',
        followRedirects: true,
        success: function(httpResponse) {
            console.log(httpResponse.text);
            res.write(httpResponse.text);

            Parse.Cloud.httpRequest({
                url: 'http://echo.jsontest.com/key/value/one/two',
                followRedirects: true,
                success: function(httpResponse) {
                    res.write('The thad is back in town.');
                    res.write(httpResponse.text);
                    res.end();
                },
                error: function(httpResponse) {
                    console.error('Request failed with response code ' + httpResponse.status);
                    res.write('yo yo ');
                    res.end();
                }
            });

        },
        error: function(httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
            res.write('yo yo ');
            res.end();
        }
    });


});

app.get('mail', function(req, res) {

    Mailgun.sendEmail({
        to: "email@example.com",
        from: "Mailgun@CloudCode.com",
        subject: "Hello from Cloud Code!",
        text: "from: " + req.query.from + " concern: " + req.query.subject
    }, {
        success: function(httpResponse) {
            console.log(httpResponse);
            response.success("Success!");
        },
        error: function(httpResponse) {
            console.error(httpResponse);
            response.error("Uh oh, something went wrong");
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
