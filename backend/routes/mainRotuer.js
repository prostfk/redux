const express = require('express');
const router = express.Router();
const security = require('../util/security');
const jwt = require('jwt-simple');
const User = require('../model/user.model');
const Op = require('../sequelize/db').Op;
const url = require('url');


router.get('/contacts', (req,resp)=>{
    let params = url.parse(req.url,true).query;
    let {page} = params;
    if (page) {
        page = page !== 0 ? page * 5 : page;
        User.findAll({
            offset: page,
            limit: 5
        }).then(data=> resp.json(data)).catch(err=>{
            resp.json({error: err.toString()});
        });
    }else{
        User.findAll({
            offset: 0,
            limit: 5
        }).then(data=>resp.json(data)).catch(err=>resp.json({error: err.toString()}));
    }
});

router.get('/contact/:id', (req,resp) => {
    let id = req.params.id;
    User.findById(id).then(data=>resp.json(data)).catch(err=>resp.json(err))
});

router.get('/search', (req,resp)=>{
    let params = url.parse(req.url,true).query;
    let info = JSON.parse(params.info);
    console.log(info);
    User.findAll({
        where: {
            [Op.and]: info
        }
    }).then(data=>resp.json(data));
});

module.exports = router;