const db = require('../db');

module.exports.getAllEmployees = async () => {
  const [rows] = await db.query('SELECT * FROM registration');
  return rows;
};

module.exports.getEmployeeById = async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM registration WHERE id = ?', [id]);
      return rows;
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  };
  

  module.exports.getEmployeesByName = async (first_name) => {
    try {
      const [rows] = await db.query('SELECT * FROM registration WHERE first_name = ?', [first_name]);
      console.log('getEmployeesByName query executed with parameter:', first_name);
      return rows;
    } catch (error) {
      console.error('Error in getEmployeesByName:', error);
      throw error;
    }
  };
  

module.exports.deleteEmployeeById = async (id) => {
  const [result] = await db.query('DELETE FROM registration WHERE id = ?', [id]);
  return result;
};

module.exports.deleteEmployeeByName = async (first_name) => {
  const [result] = await db.query('DELETE FROM registration WHERE first_name = ?', [first_name]);
  return result;
};

module.exports.addEmployee = async (employeeData) => {
  try {
    const query = 'INSERT INTO registration (first_name, last_name, gender, email, password, number) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [employeeData.first_name, employeeData.last_name, employeeData.gender, employeeData.email, employeeData.password, employeeData.number];

    const [result] = await db.query(query, values);

    return result;
  } catch (error) {
    console.error('Error in addEmployee:', error);
    throw error;
  }
};

module.exports.EditEmployee = async (employeeData, id) => {
  try {
    const query = 'UPDATE registration SET first_name = ?, last_name = ?, gender = ?, email = ?, password = ?, number = ? WHERE id = ?';
    const values = [employeeData.first_name, employeeData.last_name, employeeData.gender, employeeData.email, employeeData.password, employeeData.number, id];

    const [result] = await db.query(query, values);

    return result.affectedRows;
  } catch (error) {
    console.error('Error in EditEmployee:', error);
    throw error;
  }
};

  