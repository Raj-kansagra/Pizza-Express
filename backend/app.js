const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const userModel = require('./Models/user');
const productModel = require('./Models/product');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(`mongodb://raj:${process.env.MONGODB_PASSWORD}@ac-evc4bnj-shard-00-00.pqanubd.mongodb.net:27017,ac-evc4bnj-shard-00-01.pqanubd.mongodb.net:27017,ac-evc4bnj-shard-00-02.pqanubd.mongodb.net:27017/?ssl=true&replicaSet=atlas-aht57g-shard-0&authSource=admin&retryWrites=true&w=majority`)
.then(function(){
  console.log("db connected");
})
.catch(function(error){
  console.log(error);
})


const app = express();
app.use(cors());

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

// Static folder - to add all files that are required
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'views')));
//app.use(express.static(__dirname));
// use method always execute on start of node file
app.set("view engine", "ejs");

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  let user = {
    name : name,
    email : email,
    password : password
  };
  const isuser = await userModel.findOne({email : email});
  if(isuser){  
    res.json({"message": false});
    return;
  }

  await userModel.create(user);
  const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn : '1d' });
  res.json({"message": true, 'uid' : token});
});

app.get('/productdata', async (req, res) => {
  const products = await productModel.find({});
  res.json(products);
});

app.post('/updatedata', async (req, res) => {
  const {email,cart} = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    user.cart = cart;
    await user.save();
    console.log('Object updated successfully');
    res.json({ 'success': true, 'user': user });
  } catch (err) {
    console.error('Error updating object:', err);
    res.status(500).json({ 'success': false, 'error': err.message });
  }
});


app.post('/userdata', async (req, res) => {
  const {email} = req.body;
  const getuser = await userModel.find({email : email});
  res.json(getuser);
});


app.post('/login', async (req, res) => {
  const {email, password } = req.body;
  let isUser = false;
  try {
     isUser = await userModel.findOne({email : email,password : password});
  } catch (error) {
    console.log(error);
  }
  console.log(isUser);

  if(isUser!==null){
    const email = isUser.email;
    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn : '1d' });

    res.json({"message": true, 'uid' : token});
    return;
  }
  res.json({"message":"problem with login method"})
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.DEVELOPERS_EMAIL,
    pass: process.env.DEVELOPERS_EMAIL_PASSWORD
  }
});


app.post('/forgotpassword', async (req, res) => {
  const {email} = req.body;
  const getuser = await userModel.findOne({email : email});
  if(!getuser)
  res.json({"message" : false})

  const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '20m' });
  const link = `http://localhost:3000/forgotpassword/${token}`;

  var mailOptions = {
    from: process.env.DEVELOPERS_EMAIL,
    to: email,
    subject: 'Reset link',
    text: link
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.json({"message" : true, "token" : token})

});

app.post('/updatepassword', async (req, res) => {
  const { password, token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { email } = decoded; 
    //console.log('Email:', email); 

    const getuser = await userModel.findOne({ email: email });

    if (getuser) {
      getuser.password = password;
      await getuser.save();
      console.log("Password updated");
      res.json({ "message": true });
    } else {
      console.log("User not found");
      res.json({ "message": false });
    }
  } catch (err) {
    console.error('Token verification failed:', err);
    res.json({ "message": false });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
