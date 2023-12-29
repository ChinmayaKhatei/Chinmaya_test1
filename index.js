const express = require('express');
const app = express();
require('express-async-errors');
const db = require('./db');
const employeeRoutes = require('./controller/employee.controller');

app.use('/api/employees', employeeRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  // Handle specific errors with custom error messages
  if (err instanceof MyCustomError) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(err.status || 500).json({ message: 'Something went wrong!' });
});

db.query('SELECT 1')
  .then(() => {
    console.log('DB connection successful');
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((err) => {
    console.error('DB connection failed: ' + err.message);
  });
