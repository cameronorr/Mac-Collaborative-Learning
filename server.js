const express = require('express');

const app = express();

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the Mac Collaborative Learning API' })
);

// Sets port to 5000 if there is no other port set.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
