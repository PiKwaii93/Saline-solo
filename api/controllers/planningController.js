import pool from '../config/db.js';

export function planningByDate(req, res) {
    const { date } = req.body;
    if (date) {
        try {
            pool
                .query(
                    `SELECT * FROM planningEvent WHERE day = '${date}';`
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

}