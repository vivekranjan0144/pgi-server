import pool from '../config/db.js';

export const createMaterial = (req, res) => {
    const { material_name, quantity } = req.body;

    const query = 'INSERT INTO materials (material_name, quantity) VALUES (?, ?)';
    pool.execute(query, [material_name, quantity], (err, result) => {
        if (err) return res.status(500).send('Error adding material');
        res.status(201).send('Material added');
    });
};

export const getMaterials = (req, res) => {
    const query = 'SELECT * FROM materials WHERE storekeeper_id = ?';
    pool.execute(query, [req.user.id], (err, result) => {
        if (err) return res.status(500).send('Error fetching materials');
        res.json(result);
    });
};