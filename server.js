const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/votes', require('./routes/votes'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // takes all the url pathways entered by a user and redirects them to the index.html file in the build folder
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// Sets port to 5000 if there is no other port set.
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
