import pool from '../config/db.js';

export function certificatesAll(req, res) {
    try {
        pool
            .query(
                `SELECT * FROM certificates;`
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

export function certificatesFindOneByMasterclassID(req, res) {
    const { masterclassID } = req.body;
    if (masterclassID) 
    try {
        pool
            .query(
                `SELECT * FROM certificates WHERE masterclassID='${masterclassID}';`
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

export function certificatesFindOneByCertificatesID(req, res) {
    const { certificatesID } = req.body;
    if (certificatesID) 
    try {
        pool
            .query(
                `SELECT * FROM certificates WHERE id='${certificatesID}';`
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

export function usersCertificates(req, res) {
    const { usersID } = req.body;
    if (usersID) 
    try {
        pool
            .query(
                `SELECT * FROM usersCertificates WHERE usersID='${usersID}';`
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

export function checkUsersCertificates(req, res) {
    const { usersID, certificatesID } = req.body;
    const dateNow = Date.now()
    if (usersID, certificatesID)
    try {
        pool
            .query(
                `SELECT * FROM usersCertificates WHERE usersID='${usersID}' && certificatesID='${certificatesID}';`
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

export function newUsersCertificates(req, res) {
    const { usersID, certificatesID } = req.body;
    if (usersID, certificatesID)
    try {
        pool
            .query(
                `INSERT INTO usersCertificates (usersID, certificatesID, date) VALUES ('${usersID}', '${certificatesID}', CURDATE())`
            )
            .then((result) => {
                res.status(202).json({
                    status: "Success"
                });
            });
    } catch (e) {
        res.status(400).json({
            status: 'Failed',
            message: 'Request failed',
        });
    } 

}

export function createCertificates(req, res) {
    const { title, masterclassID, role } = req.body;

    if (title && masterclassID && role === "admin") {
        try {
            pool.query(
                `INSERT INTO certificates (title, masterclassID) VALUES ('${title}', '${masterclassID}')`
            ).then((result) => {
                const insertedIdBigInt = result.insertId;
                const insertedId = Number(insertedIdBigInt);

                res.status(202).json({
                    status: "Success",
                    insertedId: insertedId, 
                });
            });
        } catch (e) {
            res.status(400).json({
                status: 'Failed',
                message: 'Request failed',
            });
        }
    } else {
        res.status(400).json({
            status: 'Failed',
            message: 'Invalid or missing data in the request',
        });
    }
}
