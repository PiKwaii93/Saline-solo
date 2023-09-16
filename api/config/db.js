import mariadb from 'mariadb';

/* const pool = mariadb.createPool({
  host: 'mariadb',
  user: 'root',
  password: 'password',
  database: 'saline'
}); */

const pool = mariadb.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'saline'
});


pool.getConnection((err, connexion) => {
  if (err) {
    console.error('error', err);
  }
  if (connexion) connexion.release();
  return;
});

export default pool;


/* mariadb --user root -ppassword */ 