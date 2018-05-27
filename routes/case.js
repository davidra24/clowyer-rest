const express = require('express');
const Case = require('../models/case');
const Document = require('../models/document');

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
	Case.findOne({_id: req.params.id}).then(function(Case){
		Document.find({caseNumber: Case.number}).then(function(Document){
			for(var i=0; i < Document.length; i++) {
				Document.findByIdAndRemove({_id: Document[i].id}).then(function(Document){
					cloudinary.v2.uploader.destroy(Document[i].documentName, function(error, result) {
						console.log(result);
					});
				});
			}
			Case.findByIdAndRemove({_id: req.params.id}).then(function(Case){
				 res.redirect('/main');
			});
		});
	});
});

router.put('/case/:id', function(req, res, next){
	Case.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(function(Case){
		 res.json({'Case' : Case});
	});
});

router.post('/case-web-update/', function(req, res, next){
	req.body.idLawyer = req.session.lawyer._id;
	Case.findByIdAndUpdate(req.session.temporalCase._id, req.body, (err, todo) => {}).then(function(Case){
		req.session.temporalCase = Case;
		 res.redirect('/details');
	});
});

module.exports = router;