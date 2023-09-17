import pool from '../config/db.js';

export function topicAll(req, res) {
    try {
        pool
            .query(
                `SELECT * FROM forumAllTopic;`
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

export function topicFindOneByID(req, res) {
    const {topicID} = req.body
    if(topicID)
    try {
        pool
            .query(
                `SELECT * FROM forumAllTopic WHERE id=${topicID};`
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

export function topicFindOneByCategory(req, res) {
    const {categoryID} = req.body
    if(categoryID)
    try {
        pool
            .query(
                `SELECT * FROM forumAllTopic WHERE categoryID=${categoryID};`
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

export function topicFindOneByAuthor(req, res) {
    const {userID} = req.body
    if(userID)
    try {
        pool
            .query(
                `SELECT * FROM forumAllTopic WHERE userID=${userID};`
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
 
export function createTopic(req, res) {
    const { title, categoryID, text, userID } = req.body;

    if (!title || !text || !userID) {
        return res.status(400).json({
            status: 'Failed',
            message: 'Les champs title, text et userID sont obligatoires.',
        });
    }

    try {
        const query = 'INSERT INTO forumAllTopic (title, categoryID, text, userID, lastMessageDate) VALUES (?, ?, ?, ?, NOW())';
        const values = [title, categoryID || null, text, userID]; 

        pool.query(query, values, (error, results) => {
            if (error) {
                console.error('Erreur lors de l\'insertion du topic :', error);
                return res.status(500).json({
                    status: 'Failed',
                    message: 'Erreur lors de la création du topic.',
                });
            }

            res.status(202).json({
                status: 'Success',
                message: 'Topic créé avec succès.',
                topicID: results.insertId, 
            });
        });
    } catch (e) {
        console.error('Erreur lors de la création du topic :', e);
        res.status(500).json({
            status: 'Failed',
            message: 'Erreur lors de la création du topic.',
        });
    }
}

  
export function messageAll(req, res) {
    try {
        pool
            .query(
                `SELECT * FROM forumAllMessages;`
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

export function messageFindOneByID(req, res) {
    const {topicID} = req.body
    if(topicID)
    try {
        pool
            .query(
                `SELECT * FROM forumAllMessages WHERE id=${topicID};`
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

export function messageFindOneByTopic(req, res) {
    const {topicID} = req.body
    console.log(topicID)
    if(topicID)
    try {
        pool
            .query(
                `SELECT * FROM forumAllMessages WHERE topicID=${topicID};`
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

export function messageFindOneByAuthor(req, res) {
    const userID = req.body
    if(userID)
    try {
        pool
            .query(
                `SELECT * FROM forumAllMessages WHERE userID=${userID};`
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

export function createMessage(req, res) {
    const { topicID, userID, text } = req.body;
  
    if (!text) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Le champ "text" ne peut pas être vide.',
      });
    }
  
    try {
      pool
        .query(
          'INSERT INTO forumAllMessages (topicID, userID, text, datetime) VALUES (?, ?, ?, NOW())',
          [topicID, userID, text]
        )
        .then((result) => {
          if(result.affectedRows != 0){
            try{
                pool
                    .query(
                        `UPDATE forumAllTopic SET lastMessageDate=NOW() WHERE id='${topicID}'`
                    )
                    .then((result2) => {
                        res.status(202).json({
                            status: 'Success'
                          });
                    })
            }
            catch (e){
                res.status(400).json({
                  status: 'Failed',
                  message: 'Request failed on INSERT',
                });
            }
            
          }
        });
    } catch (e) {
      res.status(400).json({
        status: 'Failed',
        message: 'Request failed',
      });
    }
  }

export function categoryAll(req, res) {
    try {
        pool
            .query(
                `SELECT * FROM forumAllCategory;`
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

export function categoryFindOneByID(req, res) {
    const { categoryID } = req.body
    try {
        pool
            .query(
                `SELECT * FROM forumAllCategory WHERE id=${categoryID};`
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