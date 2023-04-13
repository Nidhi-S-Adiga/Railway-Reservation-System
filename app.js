

// Require necessary dependencies
const path=require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create Express app
const app = express();
const staticPath=path.join(__dirname);

app.use(express.static(staticPath));
// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database!');
});

// Define user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  mobile: String,
  dob: String,
  gender: String,
  address: String,
});

// Define user model
const User = mongoose.model('User', userSchema);

// Define routes
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/signup', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      mobile: req.body.mobile,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address
    });
    const existingUser = await User.findOne({ username: req.body.username });

if (existingUser) {
  res.send("<script>alert('Account already exists!');window.location.href = '/signup'</script>");
} else {
  await user.save();
  res.send("<script>alert('Successful Registration!');window.location.href = '/login'</script>");
}
   
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user == null) {
    res.send("<script>alert('Login Unsuccesful!');window.location.href = '/login'</script>");
  } else {
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        res.send("<script>alert('Login Successful!');window.location.href = 'http://localhost:4000/booking.html'</script>");
      } else {
        res.send("<script>alert('Login Unsuccesful!');window.location.href = '/login'</script>");
      }
    } catch {
      res.send("<script>alert('Login Unsuccesful!');window.location.href = '/login'</script>");
    }
  }
});


app.get('/home', (req, res) => {
  res.sendFile(__dirname+"/front.html")
});

// Start server at port 3000
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
