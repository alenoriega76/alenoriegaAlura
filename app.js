const  express = require('express');
const mysql = require('mysql');
//const  cors = require ('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const conexion = require('./database/db');

var app = express();

const keys = require('./settingns/keys');

app.set('key',keys.key);// refeneciamos a la carpata settings y al archivo keys.js
app.use(express.urlencoded({extended:false})) 

app.use(express.json());
//app.use(cors());
 const sesion =require(express.sesion);
 app.use(session({
 secreet:'secret',
 resave:true,
 saveUninitialize:true
 }));
 
//loguin
app.post('/api/login',(req, res)=>{
    if( req.body.user == "admin" && req.body.password== '1234'){
        const  payload = {
            check:true
        };
        const token = jwt.sign(payload,app.get('key'),{
            expiresIn:'7d'
        });
        res.json({
            message : 'AUTENTICACION EXITOSA',
            token: token
        });
        
    }else{
        res.json({
            message:' Usuario y/o password no Válido'
        });
    }
});

// middelware
const verificacion = express.Router();
verificacion.use((req,res,next)=>{
    let token = req.headers['x-access-token'] || req.headers['autorization'];
    if(!token){
        res.status(401).send({
            error :"Es necesario el token de validacion "
        });
    }
    if(token.startsWith( 'Bearer ')){
        token = token.slice(7,token.length);
        console.log(token);
    }
    if(token){
        jwt.verify(token,app.get('key'),(error,decoded)=>{
            if(error){
                return res.json({
                    message: 'El token no es valido'
                });
                
            }else{
                req.decoded = decoded;
                next()
            }
        })
    }
});
 // ruta de verificacion 

app.get('/api/info',verificacion,(req,res)=>{
    res.json('INFORMACION IPORTANTE ENTREGADA')
});

// pagina de inicio
app.get('/',function(req,res){
    res.send("Ruta de Inicio")
});
// mustra todos los articulos
app.get('/api/articulos', (req,res)=>{
    conexion.query('SELECT * FROM articulos', (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
});

// mustra un solo articulo
app.get('/api/articulos/:id',(req,res)=>{
    conexion.query('SELECT * FROM articulos WHERE id= ? ',[req.params.id],(error,fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
            // res.send(fila[0].descripcion); trae solo un campo en este caso la descripcion 
        }
    })
})
 // crea un articulo
 app.post('/api/articulos/nuevo',(req,res)=>{
    let data ={ descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock}// obtiene los datos que cargamos 
    let sql= "INSERT INTO articulos SET ?"
    conexion.query(sql,data,function(error,results) {
        if(error){
            throw error;
            }else{
                res.send(results);
            }
    });
 })

 // editar articulo

 app.put('/api/articulos/editar/:id',(req,res)=>{
    let id = req.params.id;
    let descripcion= req.body.descripcion;
    let precio = req.body.precio;
    let stock = req.body.stock;
    let sql = " UPDATE articulos SET descripcion = ? , precio = ?, stock = ?  WHERE id = ? "
    conexion.query(sql,[descripcion,precio,stock,id],function(error,result){
        if(error){
            throw error;
        }else {
            res.send(result);
        }
    })
 });
 // eliminar articulo 
 app.delete('/api/articulos/eliminar/:id',(req,res)=>{
        let id = req.params.id;
        let sql =  " DELETE  FROM articulos WHERE id = ?"
        conexion.query(sql, id,function(error,result){
            if(error){
                throw error;
            }else{
                res.send(result);
            }
        })
 });

const puerto= process.env.PUERTO || 3000;// crea una variable de entorno
app.listen(puerto, function (){
    console.log("SERVER ON PORT: " + puerto);
});