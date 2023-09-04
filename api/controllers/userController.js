import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

const jwtKey = "saline_secret_key"
const jwtExpirySeconds = 300


export function login(req, res) {
  const { email, password } = req.body;
  if (email && password) {
    try {
      pool
        .query(
          `SELECT id, firstName, lastName, password, role FROM users WHERE email='${email}' LIMIT 1`
        )
        .then((response) => {
          if (response.length > 0) {
            bcrypt.compare(password, response[0].password).then((bcryptRes) => {
                if(bcryptRes == true){
                  const token = jwt.sign(
                    { id: response[0].id }, jwtKey, {
                      algorithm: "HS256",
                      expiresIn: jwtExpirySeconds,
                    }
                  );
                  console.log("token : " + token)
                  console.log(response)
                  res.cookie('access_token', token);
                  res.status(202).json({
                    status: 'Success',
                    user: {
                      lastName: response[0].lastName,
                      firstName: response[0].firstName,
                      email : email,
                      id: response[0].id.toString(),
                      role: response[0].role
                    },
                    token: token,
                  });
                }else{
                  res.status(404).json({
                    status: 'Failed',
                    message: 'Email or password is incorrect',
                  });
                }
            });
          } else {
            res.status(404).json({
              status: 'Failed',
              message: 'User not found',
            });
          }
        });
    } catch (e) {
      res.status(400).json({
        status: 'Failed',
        message: 'Request failed on SELECT',
      });
    }
  } else {
    res.status(406).json({
      status: 'Failed login',
      message: 'Inputs missing',
    });
  }
}

export function register(req, res) {
  const { lastName, firstName, email, password, passwordConfirm } = req.body;
  if (email && firstName && lastName && password && passwordConfirm) {
    try {
      pool
        .query(
          `SELECT * FROM users WHERE email='${email}' LIMIT 1`
        )
        .then((response) => {
          if (response.length > 0){
            res.status(400).json({
              status: 'Failed',
              message: 'Email already used',
            });
          }else{
            if (password == passwordConfirm) {
              bcrypt.hash(password, 10, function(err, hash) {
                try {
                  pool
                    .query(`INSERT INTO users(email, lastname, firstname, password) VALUES('${email}', '${lastName}', '${firstName}', '${hash}')`)
                }
                catch (e){
                  res.status(400).json({
                    status: 'Failed',
                    message: 'Request failed on INSERT',
                  });
                }
                login(req, res)
              });
            } else {
              res.status(400).json({
                status: 'Failed',
                message: 'Passwords not matching',
              });
            }
          }
        })
    }
    catch (e){
      res.status(400).json({
        status: 'Failed',
        message: 'Request failed',
      });
    }
  } else {
    res.status(406).json({
      status: 'Failed register',
      message: 'Inputs missing',
    });
  }
}

export function updateUsersInformation(req, res) {
  const { lastName, firstName, email, id } = req.body;
  if (id){
    try {
      pool
      .query(
        `SELECT * FROM users WHERE id='${id}' LIMIT 1`
      ).then((response) => {
        if(response.length!=0){
          let checkEmail = false;
          let checkLastName= false;
          let checkFirstName = false;
          if(email=="" || email==undefined){
            checkEmail = true
          }
          if(lastName=="" || lastName==undefined){
            checkLastName = true
          }
          if(firstName=="" || firstName==undefined){
            checkFirstName = true
          }
          if (checkEmail==false || checkLastName==false || checkFirstName==false ){
            let newEmail = email
            let newLastName = lastName
            let newFirstName = firstName
            if(checkEmail==true){
              newEmail = response[0].email
            }
            if(checkLastName==true){
              newFirstName = response[0].firstname
            }
            if(checkFirstName==true){
              newLastName = response[0].lastname
            }
            try{
              pool
                .query(
                  `UPDATE users SET firstname='${newFirstName}', lastname='${newLastName}', email='${newEmail}' WHERE id='${id}'`
                )
                .then((response2)=>{
                  res.status(202).json({
                    status: 'Success',
                    user: {
                      lastName: newLastName,
                      firstName: newFirstName,
                      email : newEmail,
                      id: id
                    },
                  });
                })
            }
            catch (e){
              res.status(400).json({
                status: 'Failed',
                message: 'Request failed on UPDATE',
              });
            }
          }else{
            res.status(400).json({
              status: 'Failed',
              message: 'Inputs missing',
            });
          }
        }
      })
    } catch (e) {
        res.status(400).json({
            status: 'Failed',
            message: 'Request failed',
        });
    } 
  }

}

export function updateUsersPassword(req, res) {
  const { email, password, passwordConfirm, id } = req.body;
  if (id && password && passwordConfirm) {
    try {
      pool
        .query(
          `SELECT * FROM users WHERE id='${id}' LIMIT 1`
        )
        .then((response) => {
          if (response.length!=0){
            if(password == passwordConfirm){
              bcrypt.hash(password, 10, function(err, hash) {
                try {
                  pool
                    .query(
                      `UPDATE users SET password='${hash}' WHERE id='${id}'`
                    )
                    login(req, res)
                }
                catch (e){
                  res.status(400).json({
                    status: 'Failed',
                    message: 'Request failed on INSERT',
                  });
                }
              });
            }else{
              res.status(400).json({
                status: 'Failed',
                message: 'Passwords not matching',
              });
            }
          }else{ 
            res.status(400).json({
              status: 'Failed',
              message: 'No user found',
            });
          }
        })
    }
    catch (e){
      res.status(400).json({
        status: 'Failed',
        message: 'Request failed',
      });
    }
  } else {
    res.status(406).json({
      status: 'Failed register',
      message: 'Inputs missing',
    });
  }
}