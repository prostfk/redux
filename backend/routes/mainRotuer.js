const express = require('express');
const router = express.Router();
const security = require('../util/security');
const jwt = require('jwt-simple');
const User = require('../model/user.model');
const Op = require('../sequelize/db').Op;
const url = require('url');


router.get('/contacts', (req, resp) => {
    let params = url.parse(req.url, true).query;
    let {page} = params;
    if (page) {
        page = page !== 0 ? page * 5 : page;
        User.findAll({
            offset: page,
            limit: 5
        }).then(data => resp.json(data)).catch(err => {
            resp.json({error: err.toString()});
        });
    } else {
        User.findAll({
            offset: 0,
            limit: 5
        }).then(data => resp.json(data)).catch(err => resp.json({error: err.toString()}));
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
    let {name, surname, email} = req.body;
    User.create({
        email,
        name,
        surname
    }).then(instance => instance.save(() => instance.reload().then(() => {
        console.log(instance);
        resp.json(instance);
    })));
    resp.json({status: 'ok'})
});

router.put('/updateContact', (req, resp) => {
    let {id, name, surname, email} = req.body;
    if (id) {
        User.update(
            {name, surname, email},
            {where: {id: Number(id)}}
        ).then(result => {
            resp.json(result);
        }).error(err => resp.json({error: err.toString()}));
    } else {
        resp.json({error: 'no id attr'});
    }
});

module.exports = router;