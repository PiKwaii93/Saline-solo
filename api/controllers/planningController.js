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

export function planningByID(req, res) {
    const { planningEventID } = req.body;
    console.log(planningEventID)
    if (planningEventID) {
        try {
            pool
                .query(
                    `SELECT * FROM planningEvent WHERE id = '${planningEventID}';`
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

export function userEventByUserID(req, res) {
    const { userID } = req.body;
    if (userID) {
        try {
            pool
                .query(
                    `SELECT * FROM userEvent WHERE userID = '${userID}';`
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