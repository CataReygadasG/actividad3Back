import express from 'express';
import productManager from './productManager.js'
const app = express();

app.get('/products', (req, res)=>{
    const limit = req.query.limit;
    let arrayProductos = productManager.getProducts();
    if(limit){
        let products= arrayProductos.slice(0, parseInt(limit));
        return res.send(products)
    }else{
       return res.send({ arrayProductos })
    }
    
});

app.get('/products/:pid', (req, res)=>{
    const pid = parseInt(req.params.pid);
    let arrayProduct = productManager.getProductById(pid);
    if(arrayProduct){
       return res.send({arrayProduct});
    }else{
        return res.send({error: "Producto no encontrado"}) } 
    });

app.listen("8080", ()=>{
    console.log("servidor activo");
});



app.listen(8080, ()=> console.log("Escuchando en el puerto 8080"))