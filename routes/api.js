const express = require('express');
const Lawyer = require('../models/lawyer');
const Client = require('../models/client');
const Case = require('../models/case');
const Document = require('../models/document');
const Court = require('../models/court');
const bcrypt = require('bcrypt-nodejs');

const router = express.Router();

//------------------------------------Navigation - web-----------------------------------------
router.get('/', function(req, res, next) {
	res.render('index');
});

router.post('/login-lawyer-web', function(req, res, next) {
	if(req.body){
		Lawyer.findOne({email: req.body.email}).then(function(Lawyer){
			if(Lawyer){
				bcrypt.compare(req.body.password, Lawyer.password, function(err, result) {
					if(err){
						res.redirect('/login');
					}
					if(result){
						req.session.lawyer = Lawyer;
						res.redirect('/main');
					}else{
						res.redirect('/login');
					}
				});
			}else{
				console.log('No se encontro el correo');
			}
		});
	}else{
		console.log('Faltan datos');
	}
});

router.get('/login', function(req, res, next) {
	if(req.session.lawyer != null){
    	res.redirect('/main');
    }else{
    	res.render('login');
    }
});

router.get('/register', function(req, res, next) {
	res.render('register');
});

router.get('/main', function(req, res, next) {
    if(req.session.lawyer != null){
    	Case.find({idLawyer: req.session.lawyer._id}).then(function(Case){
    		Client.find({idLawyer: req.session.lawyer._id}).then(function(Client){
    			Court.find({}).then(function(Court){
    				res.render('main',{Case: Case, Client: Client, Court: Court,
    				 idLawyer: req.session.lawyer._id,
    				 avatar: req.session.lawyer.avatar,
    				 name: req.session.lawyer.name});		
				});
			});
		});		
    }else{
    	res.redirect('/');
    }
});

router.get('/case-web/:id', function(req, res, next) {
	if(req.session.lawyer != null){
    	Case.findById(req.params.id).then(function(Case){
    		Document.find({caseNumber: Case.caseNumber}).then(function(Document){
	    		Client.find({idLawyer: req.session.lawyer._id}).then(function(Client){
	    			Court.find({}).then(function(Court){
	    				res.render('case',{Case: Case, Client: Client,
	    				 Court: Court, Document: Document});
					});
				});
			});	
		});		
    }else{
    	res.redirect('/');
    }
});

router.get('/exit', function(req, res, next) {
	req.session.lawyer = null;
	res.redirect('/');
});

module.exports = router;