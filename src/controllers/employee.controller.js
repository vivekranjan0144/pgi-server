import pool from '../config/db.js';

export const createEmployee = (req, res) => {
    const { name, position } = req.body;

    const query = 'INSERT INTO employees (name, position) VALUES (?, ?)';
    pool.execute(query, [name, position], (err, result) => {
        if (err) return res.status(500).send('Error adding employee');
        res.status(201).send('Employee added');
    });
};

export const getEmployees = (req, res) => {
    const query = 'SELECT * FROM employees WHERE manager_id = ?';
    pool.execute(query, [req.user.id], (err, result) => {
        if (err) return res.status(500).send('Error fetching employees');
        res.json(result);
    });
};
