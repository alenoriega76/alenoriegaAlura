const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// establece conexion a las db
 conexion.connect(function(error){
    if(error){
     throw error;   
    }else{
        console.log("Conexion exitosa a la  base de datos")
    }
});
conexion.end();
module.exports= {conexion};
