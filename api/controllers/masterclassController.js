import pool from '../config/db.js';

export function masterclassAll(req, res) {
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

export function masterclassByID(req, res) {
    const { masterclassCoursID } = req.body;
    if (masterclassCoursID) {
        try {
            pool
                .query(
                    `SELECT * FROM masterclass WHERE id='${masterclassCoursID}';`
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


export function getMasterclassExxamsAll(req, res) {
  try {
      pool
          .query(
              `SELECT * FROM masterclassExams;`
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

export function masterclassExamsAllByMasterclassID(req, res) {
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

export function masterclassQuizzAllByMasterclassID(req, res) {
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
    }else{
        res.status(400).json({
            status: 'Failed',
            message: 'ID missing',
        });
    }
    
}


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

export function masterclassConfirmModule(req, res){
    const {userID, masterclassID, page} = req.body;
    if (userID, masterclassID, page) {
        try {
            pool
                .query(
                    `INSERT INTO masterclassCoursProgress (userID, masterclassID, progress) VALUES (${userID}, '${masterclassID}', '${page}');`
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
}

export function masterclassCheckConfirmModule(req, res){
    const {userID, masterclassID} = req.body;
    if (userID, masterclassID) {
        try {
            pool
                .query(
                    `SELECT * FROM masterclassCoursProgress WHERE masterclassID='${masterclassID}' AND userID='${userID}';`
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

export function masterclassCheckConfirmModuleFindOne(req, res){
    const {userID, masterclassID, page} = req.body;
    if (userID, masterclassID, page ) {
        try {
            pool
                .query(
                    `SELECT * FROM masterclassCoursProgress WHERE masterclassID='${masterclassID}' AND userID='${userID}' AND progress='${page}';`
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

export function masterclassCheckConfirmModuleByUserID(req, res){
    const {userID} = req.body;
    if (userID) {
        try {
            pool
                .query(
                    `SELECT * FROM masterclassCoursProgress WHERE userID='${userID}';`
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

export function createMasterclass(req, res) {
    const { title, time, difficulty, role } = req.body;
    const slug = title.toLowerCase().replaceAll(' ', '_');
  
    if (title && slug && time && difficulty && role === "admin") {
      try {
        const formattedTime = time + 'h';
  
        pool.query(
          `INSERT INTO masterclass (title, slug, time, difficulty) VALUES (?, ?, ?, ?)`,
          [title, slug, formattedTime, difficulty]
        ).then((result) => {
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
    } else {
      res.status(400).json({
        status: 'Failed',
        message: 'Invalid or missing data in the request',
      });
    }
  }
  

export function getLastMasterclass(req, res) {
    try {
        pool.query(
            'SELECT * FROM masterclass ORDER BY id DESC LIMIT 1;'
        ).then((result) => {
            if (result.length > 0) {
                res.status(202).json({
                    result : result
                });
            } else {
                res.status(404).json({
                    status: 'Not Found',
                    message: 'No masterclass found',
                });
            }
        });
    } catch (e) {
        res.status(400).json({
            status: 'Failed',
            message: 'Request failed',
        });
    }
}


export function updateMasterclass(req, res) {
    const { masterclassId, title, image, time, difficulty, role } = req.body;
    const slug = title.toLowerCase().replaceAll(' ', '_');
  
    if (masterclassId && role === "admin") {
      try {
        let updateQuery = "UPDATE masterclass SET ";
        let updateFields = [];
        let updateValues = [];
  
        if (title !== "") {
          updateFields.push(`title = ?`);
          updateValues.push(title);
        }
  
        if (slug !== "") {
          updateFields.push(`slug = ?`);
          updateValues.push(slug);
        }
  
        if (image !== "") {
          updateFields.push(`image = ?`);
          updateValues.push(image);
        }
  
        if (time !== "") {
          updateFields.push(`time = ?`);
          updateValues.push(time);
        }
  
        if (difficulty !== "") {
          updateFields.push(`difficulty = ?`);
          updateValues.push(difficulty);
        }
  
        if (updateFields.length > 0) {
          updateQuery += updateFields.join(", ") + ` WHERE id = ?;`;
          updateValues.push(masterclassId);
  
          pool.query(updateQuery, updateValues).then((result) => {
            res.status(200).json({
              status: "Success",
              message: "Masterclass updated successfully"
            });
          });
        } else {
          res.status(200).json({
            status: "Success",
            message: "No fields to update"
          });
        }
      } catch (e) {
        res.status(400).json({
          status: 'Failed',
          message: 'Request failed',
        });
      }
    } else {
      res.status(400).json({
        status: 'Failed',
        message: 'Invalid masterclass ID or role provided',
      });
    }
  }

export function createMasterclassCours(req, res) {
    const { text, page, masterclassID, role } = req.body;
    if (text && page && masterclassID && role === "admin") {
        try {
            pool
                .query(
                    'INSERT INTO masterclassCours (text, page, masterclassID) VALUES (?, ?, ?)',
                    [text, page, masterclassID]
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
    } else {
        res.status(400).json({
            status: 'Failed',
            message: 'Invalid request parameters or role',
        });
    }
}

export function updateMasterclassCours(req, res) {
    const { coursID, text, page, masterclassID, role } = req.body;
  
    if (coursID && role === "admin") {
      try {
        let updateQuery = "UPDATE masterclassCours SET ";
        let updateFields = [];
        let values = [];
  
        if (text !== "") {
          updateFields.push("text = ?");
          values.push(text);
        }
  
        if (page !== "") {
          updateFields.push("page = ?");
          values.push(page);
        }
  
        if (masterclassID !== "") {
          updateFields.push("masterclassID = ?");
          values.push(masterclassID);
        }
  
        if (updateFields.length > 0) {
          values.push(coursID);
          updateQuery += updateFields.join(", ") + " WHERE id = ?";
  
          pool.query(updateQuery, values).then((result) => {
            res.status(200).json({
              status: "Success",
              message: "MasterclassCours updated successfully",
            });
          });
        } else {
          res.status(200).json({
            status: "Success",
            message: "No fields to update",
          });
        }
      } catch (e) {
        console.error(e);
        res.status(400).json({
          status: "Failed",
          message: "Request failed",
        });
      }
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Invalid cours ID provided or insufficient role",
      });
    }
  }
  
  export function createMasterclassQuizz(req, res) {
    const { idQuizz, title, masterclassID, page, role } = req.body;
    const slug = title.toLowerCase().replaceAll(' ', '_');
  
    if (idQuizz && title && slug && masterclassID && page && role === "admin") {
      try {
        pool.query(
          `INSERT INTO masterclassQuizz (idQuizz, title, slug, masterclassID, page) VALUES (?, ?, ?, ?, ?)`,
          [idQuizz, title, slug, masterclassID, page]
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
  
  export function updateMasterclassQuizz(req, res) {
    const { quizzId, idQuizz, title, masterclassID, page, role } = req.body;
    const slug = title.toLowerCase().replaceAll(' ', '_');
  
    if (quizzId && role === "admin") {
      try {
        let updateQuery = "UPDATE masterclassQuizz SET ";
        let updateFields = [];
        let values = [];
  
        if (idQuizz !== "") {
          updateFields.push(`idQuizz = ?`);
          values.push(idQuizz);
        }
  
        if (title !== "") {
          updateFields.push(`title = ?`);
          values.push(title);
        }
  
        if (slug !== "") {
          updateFields.push(`slug = ?`);
          values.push(slug);
        }
  
        if (masterclassID !== "") {
          updateFields.push(`masterclassID = ?`);
          values.push(masterclassID);
        }
  
        if (page !== "") {
          updateFields.push(`page = ?`);
          values.push(page);
        }
  
        if (updateFields.length > 0) {
          values.push(quizzId);
          updateQuery += updateFields.join(", ") + " WHERE id = ?";
  
          pool.query(updateQuery, values).then((result) => {
            res.status(200).json({
              status: "Success",
              message: "MasterclassQuizz updated successfully",
            });
          });
        } else {
          res.status(200).json({
            status: "Success",
            message: "No fields to update",
          });
        }
      } catch (e) {
        res.status(400).json({
          status: 'Failed',
          message: 'Request failed',
        });
      }
    } else {
      res.status(400).json({
        status: 'Failed',
        message: 'Invalid quizz ID provided',
      });
    }
  }
  
  export function createMasterclassQuizzQuestions(req, res) {
    const { idQuestion, masterclassQuizzID, question, answer1, answer2, answer3, answer4, correct, role } = req.body;
  
    if (idQuestion && masterclassQuizzID && question && answer1 && answer2 && answer3 && answer4 && correct && role === 'admin') {
      try {
        const query = 'INSERT INTO masterclassQuizzQuestions (idQuestion, masterclassQuizzID, question, answer1, answer2, answer3, answer4, correct) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [idQuestion, masterclassQuizzID, question, answer1, answer2, answer3, answer4, correct];
  
        pool.query(query, values, (error, results) => {
          if (error) {
            console.error('Erreur lors de l\'exécution de la requête :', error);
            res.status(400).json({
              status: 'Failed',
              message: 'La requête a échoué.',
            });
          } else {
            res.status(202).json({
              status: 'Success',
            });
          }
        });
      } catch (e) {
        console.error('Erreur lors de la tentative d\'insertion :', e);
        res.status(400).json({
          status: 'Failed',
          message: 'La requête a échoué.',
        });
      }
    } else {
      res.status(400).json({
        status: 'Failed',
        message: 'Les données ne sont pas valides ou le rôle n\'est pas "admin".',
      });
    }
  }
  
  export function updateMasterclassQuizzQuestions(req, res) {
    const { questionID, idQuestion, masterclassQuizzID, question, answer1, answer2, answer3, answer4, correct, role } = req.body;
  
    if (questionID && role === "admin") {
      try {
        let updateQuery = "UPDATE masterclassQuizzQuestions SET ";
        let updateFields = [];
        let values = [];
  
        if (idQuestion !== "") {
          updateFields.push(`idQuestion = ?`);
          values.push(idQuestion);
        }
  
        if (masterclassQuizzID !== "") {
          updateFields.push(`masterclassQuizzID = ?`);
          values.push(masterclassQuizzID);
        }
  
        if (question !== "") {
          updateFields.push(`question = ?`);
          values.push(question);
        }
  
        if (answer1 !== "") {
          updateFields.push(`answer1 = ?`);
          values.push(answer1);
        }
  
        if (answer2 !== "") {
          updateFields.push(`answer2 = ?`);
          values.push(answer2);
        }
  
        if (answer3 !== "") {
          updateFields.push(`answer3 = ?`);
          values.push(answer3);
        }
  
        if (answer4 !== "") {
          updateFields.push(`answer4 = ?`);
          values.push(answer4);
        }
  
        if (correct !== "") {
          updateFields.push(`correct = ?`);
          values.push(correct);
        }
  
        if (updateFields.length > 0) {
          values.push(questionID);
          updateQuery += updateFields.join(", ") + " WHERE id = ?";
  
          pool.query(updateQuery, values).then((result) => {
            res.status(200).json({
              status: "Success",
              message: "MasterclassQuizzQuestions updated successfully",
            });
          });
        } else {
          res.status(200).json({
            status: "Success",
            message: "No fields to update",
          });
        }
      } catch (e) {
        res.status(400).json({
          status: 'Failed',
          message: 'Request failed',
        });
      }
    } else {
      res.status(400).json({
        status: 'Failed',
        message: 'Invalid question ID provided',
      });
    }
  }
  
  export function createMasterclassExams(req, res) {
    const { idExams, title, masterclassID, page, role } = req.body;
    const slug = title.toLowerCase().replaceAll(' ', '_');
  
    if (idExams && title && slug && masterclassID && page && role === "admin") {
      try {
        pool.query(
          `INSERT INTO masterclassExams (idExams, title, slug, masterclassID, page) VALUES (?, ?, ?, ?, ?)`,
          [idExams, title, slug, masterclassID, page]
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
  
  export function updateMasterclassExams(req, res) {
    const { examsId, idExams, title, masterclassID, page, role } = req.body;
    const slug = title.toLowerCase().replaceAll(' ', '_');
  
    if (examsId && role === "admin") {
      try {
        let updateQuery = "UPDATE masterclassExams SET ";
        let updateFields = [];
        let values = [];
  
        if (idExams !== "") {
          updateFields.push(`idExams = ?`);
          values.push(idExams);
        }
  
        if (title !== "") {
          updateFields.push(`title = ?`);
          values.push(title);
        }
  
        if (slug !== "") {
          updateFields.push(`slug = ?`);
          values.push(slug);
        }
  
        if (masterclassID !== "") {
          updateFields.push(`masterclassID = ?`);
          values.push(masterclassID);
        }
  
        if (page !== "") {
          updateFields.push(`page = ?`);
          values.push(page);
        }
  
        if (updateFields.length > 0) {
          values.push(examsId);
          updateQuery += updateFields.join(", ") + " WHERE id = ?";
  
          pool.query(updateQuery, values).then((result) => {
            res.status(200).json({
              status: "Success",
              message: "MasterclassExams updated successfully",
            });
          });
        } else {
          res.status(200).json({
            status: "Success",
            message: "No fields to update",
          });
        }
      } catch (e) {
        res.status(400).json({
          status: 'Failed',
          message: 'Request failed',
        });
      }
    } else {
      res.status(400).json({
        status: 'Failed',
        message: 'Invalid exams ID provided',
      });
    }
  }
  
  export function createMasterclassExamsQuestions(req, res) {
    const { idExamsQuestions, masterclassExamsID, question, answer1, answer2, answer3, answer4, correct, role } = req.body;
  
    if (idExamsQuestions && masterclassExamsID && question && answer1 && answer2 && answer3 && answer4 && correct && role === 'admin') {
      try {
        pool.query(
          `INSERT INTO masterclassExamsQuestions (idExamsQuestions, masterclassExamsID, question, answer1, answer2, answer3, answer4, correct) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [idExamsQuestions, masterclassExamsID, question, answer1, answer2, answer3, answer4, correct]
        ).then((result) => {
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
  }
  
  export function updateMasterclassExamsQuestions(req, res) {
    const { questionID, idExamsQuestions, masterclassExamsID, question, answer1, answer2, answer3, answer4, correct, role } = req.body;
  
    if (questionID && role === "admin") {
      try {
        let updateQuery = "UPDATE masterclassExamsQuestions SET ";
        let updateFields = [];
        let values = [];
  
        if (idExamsQuestions !== "") {
          updateFields.push(`idExamsQuestions = ?`);
          values.push(idExamsQuestions);
        }
  
        if (masterclassExamsID !== "") {
          updateFields.push(`masterclassExamsID = ?`);
          values.push(masterclassExamsID);
        }
  
        if (question !== "") {
          updateFields.push(`question = ?`);
          values.push(question);
        }
  
        if (answer1 !== "") {
          updateFields.push(`answer1 = ?`);
          values.push(answer1);
        }
  
        if (answer2 !== "") {
          updateFields.push(`answer2 = ?`);
          values.push(answer2);
        }
  
        if (answer3 !== "") {
          updateFields.push(`answer3 = ?`);
          values.push(answer3);
        }
  
        if (answer4 !== "") {
          updateFields.push(`answer4 = ?`);
          values.push(answer4);
        }
  
        if (correct !== "") {
          updateFields.push(`correct = ?`);
          values.push(correct);
        }
  
        if (updateFields.length > 0) {
          values.push(questionID);
          updateQuery += updateFields.join(", ") + " WHERE id = ?";
  
          pool.query(updateQuery, values).then((result) => {
            res.status(200).json({
              status: "Success",
              message: "MasterclassExamsQuestions updated successfully",
            });
          });
        } else {
          res.status(200).json({
            status: "Success",
            message: "No fields to update",
          });
        }
      } catch (e) {
        res.status(400).json({
          status: 'Failed',
          message: 'Request failed',
        });
      }
    } else {
      res.status(400).json({
        status: 'Failed',
        message: 'Invalid question ID provided',
      });
    }
  }
  