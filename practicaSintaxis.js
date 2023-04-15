var express = require('express');
const req = require('express/lib/request');
var mysql = require('mysql');

 var app= express()
// permite utilizr los formatos json y cors
 app.use(express.json())
 app.use(cors())

// conexion 
var conexion = mysql.createConnection({
    host:"localhost",
    user : " root",
    database : " nombre de la  base de datos ",
    password : ""

});
 // establecemos la conexion 
 conexion.connect(function(error){
    if(error){
        throw error;
    }else {
        console.log(" CONEXION EXITOSA.");
    }
 });


  // RUTAS

  app.get('/',(req,res)=>{
    res.send("Ruta de Inicio")
  });
 // obtenemos todos los articulos

  app.get('/api/articulos',(req,res=>{
    conexion.query('SELECT * FROM articulos',function(error,filas){
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
  }));

  // obtenemos un articulo por id

app.get('/api/articulos/:id',(req,res)=>{
    conexion.query('SELECT FORM articulos WHERE id = ?',[req.params.id],function(error,fila){
        if(error){
            throw error;
        }else{
            res.send(fila);
        }

    });
});

// creamos un articulo

app.post('/api/articulos/nuevo',(req,res)=>{
   let data ={descripcion:req.body.descripcion,precio:req.precio,stock:req.stock}
   let sql = "INSERT INTO articulos SET ?"
   conexion.query(sql,data,function(error,results){
    if(error){
        throw error;
    }else{
        res.send(results);
    }
   });
});
 // actualizamos un articulo

 app.put('/api/articulos/editar /:id',(req,res)=>{
    // obtengo los datos 
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let stock = req.body.stock;
    let sql = " UPDATE articulos  SET descripcion = ?, precio = ?, stock = ? WHERE id = ?"
    conexion.query(sql,[id,descripcion,precio,stock],function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    });
 });

 // eliminar un articulo por id

 app.delete('/api/articulos/eliminar/:id',(req,res)=>{
    let id= req.params.id;
    let sql= " DELETE  FROM articulos WHERE id = ?"
    conexion.query(id,sql,function(erro,result){
        if(error){
            throw error;
        }else{
            res.send(result)
        }
    })
 })