const Mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/snif');

const mongoose = pprocess.env.JAWSDB_URL
? new Mongoose(process.env.JAWSDB_URL)
: new Mongoose(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3306,
    }
  );


module.exports = mongoose.connection;
