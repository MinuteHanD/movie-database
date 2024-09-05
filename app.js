const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose'); //import mongoose


mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

app.use(express.urlencoded({ extended: true }));

const User = require('./models/User');

// Handle sign-up form submission
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.send('Username already exists, please choose another one.');
      }

      // Save new user to the database
      const newUser = new User({ username, password });
      await newUser.save();

      res.send('User signed up successfully!');
  } catch (err) {
      res.status(500).send('Error signing up. Please try again.');
  }
});

// Handle login form submission
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      // Find the user in the database
      const user = await User.findOne({ username });

      if (!user) {
          return res.send('User not found. Please sign up first.');
      }

      // Verify password
      if (user.password === password) {
          res.send('Login successful!');
      } else {
          res.send('Incorrect password. Try again.');
      }
  } catch (err) {
      res.status(500).send('Error logging in. Please try again.');
  }
});


// Middleware to serve static files like HTML, CSS
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
