var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;



var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/signup', function (req, res) {
          
    MongoClient.connect('mongodb://localhost:27017',function(err,client){
    if(err){
      console.log('Error')
    }else{
      client.db('feedbacks').collection('user').insertOne(req.body)
    }
  })
    
    res.send('Data received:\n' + JSON.stringify(req.body));
});

app.get('/view',  function(req, res) {
    dbConn.then(function(db) {
        db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
            res.status(200).json(feedbacks);
        });
    });
});

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0' );
