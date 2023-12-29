const express = require('express');
const router = express.Router();
const service = require('../service/employee.service');

//TO get all the records
router.get('/All', async (req, res) => {
  try {
    const employees = await service.getAllEmployees();
    res.send(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//TO get records based on employee
router.get('/:id', async (req, res) => {
  try {
    const employeeId = await service.getEmployeeById(req.params.id);
    if (employeeId.length === 0) {
      res.status(404).json("No record with given ID: " + req.params.id);
    } else {
      res.send(employeeId);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//To get records based on name
router.get('/byName/:first_name', async (req, res) => {
  try {
    const employeeName = await service.getEmployeesByName(req.params.first_name);
    if (employeeName.length === 0) {
      res.status(404).json("No record with given name: " + req.params.first_name);
    } else {
      res.send(employeeName);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//To delete records based on id
router.delete('/delete/:id', async (req, res) => {
  try {
    const result = await service.deleteEmployeeById(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json("No record with given ID: " + req.params.id);
    } else {
      res.send("Deleted successfully");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//To delete records based on name
router.delete('/byName/:first_name', async (req, res) => {
  try {
    const result = await service.deleteEmployeeByName(req.params.first_name);
    if (result.affectedRows === 0) {
      res.status(404).json("No record with given name: " + req.params.first_name);
    } else {
      res.send("Deleted successfully");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create', async (req, res) => {
    await service.addEmployee(req.body)
    res.status(201).send('created successfully.')
})

router.put('/update/:id', async (req, res) => {
    const affectedRows = await service.EditEmployee(req.body, req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send('updated successfully.')
})

module.exports = router;
