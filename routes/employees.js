const express = require('express');
const router = express.Router();

const employee = require('../models/employee');

router.get('/',async (req,res) =>{
    
    const findemployee =await employee.find({})
    console.log(findemployee)
     employee.find({})
    .then(employees => {
        res.render('index', {employees : employees});
    })
    .catch(err => {
        console.log(err);
    }) 
});

router.get('/employee/new', (req,res) =>{
    res.render('new');
});
router.get('/employee/search', (req,res) =>{
    res.render('search', {employee:""});
});
router.get('/employee', (req,res) =>{
    let searchQuery = {name : req.query.name};

     employee.findOne(searchQuery)
     .then(employee => {
        res.render('search', {employee:employee});
     })
     .catch(err =>{
        console.log(err);
     });
});
router.get('/edit/:id', (req,res) =>{
    let searchQuery = {_id : req.params.id};
    employee.findOne(searchQuery)
    .then(employee =>{
        res.render('edit', {employee:employee});
    })
    .catch(err =>{
        console.log(err);
    });
    });
router.post('/employee/new', (req,res) =>{
    let newEmployee = {
        name : req.body.name,
        designation : req.body.designation,
        salary : req.body.salary
    };
    employee.create(newEmployee)
    .then(employee=> {
        res.redirect('/');
    })
    .catch(err =>{
        console.log(err);
    });
});

router.put('/edit/:id', (req,res) => {
    let searchQuery = {_id: req.params.id};
    
    employee.updateOne(searchQuery, {$set: {
        name : req.body.name,
        designation : req.body.designation,
        salary : req.body.salary
    }})
    .then(employee =>{
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
});

router.delete('/delete/:id', (req,res) => {
    let searchQuery = {_id: req.params.id};
    employee.deleteOne(searchQuery)
    .then(employee => {
        req.flash('success_msg', 'Employee deleted successfully.'); 
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;