const myslq = require('mysql2');

const db = myslq.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeappdb'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database conected!');
});

module.exports = db;
