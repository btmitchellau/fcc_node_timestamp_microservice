const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static('public'));
app.get("/", (req, res) => { res.sendFile(__dirname + '/views/index.html'); });


app.get('/api/timestamp/', (req, res) => {
    theDate = new Date();
    res.json({
        "unix": theDate.valueOf(),
        "utc" : theDate.toUTCString()
    })
});

app.get('/api/timestamp/:date_string', (req, res) => {

    console.log(req.params.date_string);

    if (/\d{5,}/.test(req.params.date_string)) {
        res.json({
            unix: req.params.date_string,
            utc : new Date(parseInt(req.params.date_string)).toUTCString()
        });
    } else {
        let theDate = new Date(req.params.date_string);
        if (theDate.toUTCString() == 'Invalid Date') {
            res.json({"error": "Invalid Date"});
        } else {
            res.json({
                "unix": theDate.valueOf(),
                "utc" : theDate.toUTCString()
            })
        }
    };
});

const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});