import pool from '../config/db.js';

export function masterclass(req, res) {
        try {
            pool
                .query(
                    `SELECT * FROM masterclass;`
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


export function masterclassFindOne(req, res) {
    const { slug } = req.body;
    if (slug) {
        try {
            pool
                .query(
                    `SELECT * FROM masterclass WHERE title='${slug}';`
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

export function masterclasscours(req, res) {
    const { id, page } = req.body;
    if (id, page) {
        try {
            pool
                .query(
                    `SELECT * FROM masterclassCours WHERE masterclassID='${id}' && page='${page}';`
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

export function masterclasscoursAll(req, res) {
    const { id } = req.body;
    if (id) {
        try {
            pool
                .query(
                    `SELECT * FROM masterclassCours WHERE masterclassID='${id}';`
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

export function masterclassQuizzAll(req, res) {
    const { id } = req.body;
    if (id) {
        try {
            pool
                .query(
                    `SELECT * FROM masterclassQuizz WHERE masterclassID='${id}';`
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

export function masterclassQuizz(req, res) {
    const { id, page} = req.body;
    if (id, page) {
        try {
            pool
                .query(
                    `SELECT * FROM masterclassQuizz WHERE masterclassID='${id}' && page='${page}';`
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


export function masterclassQuizzQuestion(req, res) {
    const {id} = req.body;
    if (id) {
        try {
            pool
                .query(
                    `SELECT * FROM masterclassQuizzQuestions WHERE masterclassQuizzID='${id}';`
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

//

export function masterclassExamsAll(req, res) {
    const { id } = req.body;
    if (id) {
        try {
            pool
                .query(
                    `SELECT * FROM masterclassExams WHERE masterclassID='${id}';`
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

export function masterclassExams(req, res) {
    const { id, page} = req.body;
    if (id, page) {
        try {
            pool
                .query(
                    `SELECT * FROM masterclassExams WHERE masterclassID='${id}' && page='${page}';`
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


export function masterclassExamsQuestion(req, res) {
    const {id} = req.body;
    if (id) {
        try {
            pool
                .query(
                    `SELECT * FROM masterclassExamsQuestions WHERE masterclassExamsID='${id}';`
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