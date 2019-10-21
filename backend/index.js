//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// define the Express app
const app = express();

// the database
var questions = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

var d = new Date();
var timestamp = d.toLocaleString();

// retrieve all questions
app.get('/', (req, res) => {
  const qs = questions.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    timestamp: q.timestamp
    }));
   var qs1 =  questions.sort((a, b) => Number(b.id) - Number(a.id));
  //console.dir(qs1);
  res.send(qs1);
});

// get a specific question
app.get('/:id', (req, res) => {
  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();
  res.send(question[0]);
});

// insert a new question
app.post('/', (req, res) => {
  const {title, description} = req.body;
  var d = new Date();
var timestamp = d.toLocaleString();
  const newQuestion = {
    id: questions.length + 1,
    title,
    description,
    timestamp    
  };
  questions.push(newQuestion);
  res.status(200).send();
});

// insert a new answer to a question
app.delete('/:id', (req, res) => {
   
   var id = req.params.id;
   console.dir("id to Delete : " + id);
   questions = questions.filter(function(el) { return el.id != id; }); 

  res.status(200).send(questions);
});


//Delete the whole Updates from the list
app.delete('/', (req, res) => {
  questions.length = 0;
 res.status(200).send("All Items Deleted");
});

// retrieve all questions
app.post('/login', (req, res) => {
  var {username, password} = req.body;
  console.dir({username, password});
  if(username === "admin" && password === "gliappsupport"){
    console.dir("coming to correct loop");
    res.send("correct");
  }
  else
  res.send("incorrect");
 
});

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});