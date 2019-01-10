const express = require('express');
const router = express.Router();
const security = require('../util/security');
const jwt = require('jwt-simple');
const User = require('../model/user.model');
const Phone = require('../model/phone.modal');
const Op = require('../sequelize/db').Op;
const url = require('url');
const db = require('../sequelize/db');

router.get('/contacts', (req, resp) => {
    let params = url.parse(req.url, true).query;
    let {page} = params;
    if (page) {
        page = page !== 0 ? page * 5 : page;
        db.query(`SELECT DISTINCT users.id as id, name, surname, email, p.id as phoneId, number, type FROM users LEFT JOIN phones p on users.id = p.user_id ORDER BY users.id LIMIT ${page},${5}`, {model: User})
            .then(data=>{
               resp.json(data);
            });
        // User.findAll({
        //     offset: page,
        //     limit: 5,
        //     include: [Phone]
        // }).then(data => resp.json(data)).catch(err => {
        //     resp.json({error: err.toString()});
        // });
    } else {
        db.query(`SELECT DISTINCT users.id as id, name, surname, email, p.id as phoneId, number, type FROM users LEFT JOIN phones p on users.id = p.user_id ORDER BY users.id LIMIT 0,${5}`, {model: User})
            .then(data=>{
                resp.json(data);
            });
        // User.findAll({
        //     offset: 0,
        //     limit: 5
        // }).then(data => resp.json(data)).catch(err => resp.json({error: err.toString()}));
    }
});

router.get('/contact/:id', (req, resp) => {
    let id = req.params.id;
    User.findById(id).then(data => resp.json(data)).catch(err => resp.json(err))
});

router.get('/search', (req, resp) => {
    let params = url.parse(req.url, true).query;
    let info = JSON.parse(params.info);
    info.map(obj => {
        let key = Object.keys(obj)[0];
        obj[key] = {[Op.like]: `%${obj[key]}%`}
    });
    User.findAll({
        where: {
            [Op.and]: info
        },
        limit: 5
    }).then(data => resp.json(data));
});

router.put('/addContact', (req, resp) => {
    let {name, surname, email, number, type} = req.body;
    let response = {};
    User.create({
        email,
        name,
        surname
    }).then(instance => {
        response.user = instance.dataValues;
        let id = instance.dataValues.id;
        if (number){
            Phone.create({
                number,
                type,
                user_id: id
            }).then(newPhone=>{
                response.phone = newPhone.dataValues;
            })
        }
    });
    resp.json({response});

});

router.put('/updateContact', (req, resp) => {
    let {id, name, surname, email,phoneId, number, type} = req.body;
    console.log(req.body);
    let response = {};
    if (id) {
        User.update(
            {name, surname, email},
            {where: {id: Number(id)}}
        ).then(result => {
            response.user = result;
            if (number){
                if (!phoneId){
                    Phone.create({
                        number,
                        type,
                        user_id: id
                    }).then(data => {
                        response.phone = data;
                    })
                }else{
                    Phone.update({
                        number,
                        type,
                    }, {where: {user_id: id}})
                }
            }

            resp.json(response);
        }).error(err => resp.json({error: err.toString()}));
    } else {
        resp.json({error: 'no id attr'});
    }
});

router.get('/phone/:id', (req,resp)=>{
    Phone.find({
        where: {
            id: req.params.id
        }, include: [User]
    }).then(data=>resp.json(data)).catch(err=>resp.json(err.toString()));
});

module.exports = router;