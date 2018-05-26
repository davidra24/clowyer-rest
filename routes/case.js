const express = require('express');
const Case = require('../models/case');

const router = express.Router();
//----------------------------------------Case-----------------------------------------------
router.get('/case', function(req, res, next) {
	Case.find({}).then(function(Case){
		res.json({'Case' : Case});
	});
});

router.get('/case-web', function(req, res, next) {
	Case.find({}).then(function(Case){
		res.send(Case);
	});
});

router.get('/case/:id', function(req, res, next) {
	Case.findById(req.params.id).then(function(Case){
		res.json({'Case' : Case});
	});
});

router.post('/case', function(req, res, next) {
	Case.create(req.body).then(function(Case){
		res.send(Case);
	}).catch(next);
});

router.post('/case-web', function(req, res, next) {
	req.body.idLawyer = req.session.lawyer._id;
	Case.create(req.body).then(function(Case){
		res.redirect('/main');
	}).catch(next);
});

router.delete('/case/:id', function(req, res, next){
	Case.findByIdAndRemove({_id: req.params.id}).then(function(Case){
		 res.send({Case});
	});
});

router.delete('/case-web/:id', function(req, res, next){
	Case.findByIdAndRemove({_id: req.params.id}).then(function(Case){
		 res.redirect('/main');
	});
});

router.put('/case/:id', function(req, res, next){
	console.log(req.body);
	Case.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(function(Case){
		 res.send(Case);
	});
});

router.post('/case-web-update/:id', function(req, res, next){
	Case.findByIdAndUpdate({_id:req.params.id}).then(function(Case){
		res.redirect('/details/' + req.params.id);
	});
});

module.exports = router;