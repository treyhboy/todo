/**
 * Created by tarun on 12/7/17.
 */
const express = require('express');
const bp = require('body-parser');
const db = require('./db').todo;

const app = express();

app.use('/',express.static(__dirname+"/public_static"));


app.use(bp.urlencoded({extended: true}))
app.use(bp.json())

app.get('/todo', (req,res) => {
    db.findAll().then(function (db) {
        res.send(db);
    }).catch(function (err) {
        console.log('error');
        res.send({error: "Could not retrieve todos"})
    })
})

app.post('/todo',(req,res) => {
    db.create({
        task:req.body.task,
        value:req.body.value
    }).then(function () {
        res.send({success:true})
    }).catch(function(err)
    {
        throw err;
    });
})
app.post('/todos',(req,res)=>{

    db.destroy({
        where:{
       id:req.body.id
        }
    }).then(function () {
        res.send({success:true})
    }).catch(function (err) {
        throw err;
    });
})
app.post('/set',(req,res)=>{

    db.update({task:req.body.task},{where:{id:req.body.id}}).then(function () {
        res.send({success:true})
    }).catch(function (err) {
        throw err;
    });
})

app.post('/val',(req,res)=>{
console.log(req.body.value)
    console.log(req.body.id)
    db.update({value:req.body.value},{where:{id:req.body.id}}).then(function () {
        //console.log(req.body.value);
        res.send({success:true})
    }).catch(function (err) {

        throw err;
    });
})
app.listen(4000, function () {
    console.log("Server started on http://localhost:4000");
});
