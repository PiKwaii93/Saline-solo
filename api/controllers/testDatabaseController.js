import pool from '../config/db.js';

export function testDatabase(req, res) {
    try {
        pool
            .query(
                `SELECT title FROM books;`
            )
            .then((result) => {
                res.status(202).json({
                    result
                });
            });
    } catch (e) {
        res.status(400).json({
            status: 'Failed',
            message: 'Request failed',
        });
    } 
    
    
}