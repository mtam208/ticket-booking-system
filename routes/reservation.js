const express = require('express');
var router = express.Router();
var models = require('../models/sess');
var checkAuth = require('../controllers/checkAuth');

router.get('/:id/index', checkAuth, function (req, res) {
    res.render('reservation');
})

router.get('/:id', function (req, res) {
    models.findOne({
        _id:req.params.id
    })
        .then(data => {
        res.json(data)
    })
})

router.post('/:id', function (req, res) {
    var seat = req.body.seat;
    var pos = req.body.pos;
    models.findOne({
        _id:req.params.id
    })
        .then(data => {
            for (let i = 0; i < pos.length; i++) {
                if (data.seat[pos[i].x][pos[i].y] == 1) { res.json('PICKED'); return false}
            }
            
            models.updateOne({
                _id:req.params.id
            },{seat:seat})
                .then(data => {
                res.json(data)
            })
        
    })

})

module.exports = router;