const express = require('express');
const router = express.Router();
const conString = process.env.DATABASE_URL;
const Lawyer = require('../models/lawyer');
const ControlLawyer = require('../models/control-lawyer');
const Case = require('../models/case');
const Document = require('../models/document');
const Court = require('../models/court');
const ControlClient = require('../models/control-client');
const Client = require('../models/client');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;

//------------------------------------Navigation - web-----------------------------------------
router.get('/', function(req, res, next) {
	res.sendFile('main.html', {root: 'public'});
});


router.post('/login-lawyer-web', function(req, res, next) {
	Lawyer.findOne({email: req.body.email}).then(function(Lawyer){
		bcrypt.compare(req.body.password, Lawyer.password, function(err, result) {
			if(result){
				req.session.lawyer = Lawyer;
				res.redirect('/main.html');
			}else{
				res.redirect('/login.html');
			}
		});
	});
});

router.get('/exit', function(req, res, next) {
	req.session.Lawyer = null;
	res.redirect('/');
});


router.get('/main.html', function(req, res, next) {
    if(req.session.lawyer != null){
    	res.redirect('/main.html');
    }else{
    	res.redirect('/');
    }
});

//-----------------------------------------Lawyer----------------------------------------------

router.get('/lawyer', function(req, res, next) {
	Lawyer.find({}).then(function(Lawyer){
		res.json({'Lawyer' : Lawyer});
	});
});

router.get('/lawyer-web', function(req, res, next) {
	Lawyer.find({}).then(function(Lawyer){
		res.send(Lawyer);
	});
});

router.get('/lawyer/:identification', function(req, res, next) {
	Lawyer.find({identification: req.params.identification}).then(function(Lawyer){
		res.json({'Lawyer' : Lawyer});
	});

});

router.get('/lawyer-web/:identification', function(req, res, next) {
	Lawyer.find({identification: req.params.identification}).then(function(Lawyer){
		res.send(Lawyer);
	});
});

router.post('/lawyer', function(req, res, next) {
	req.body.password = bcrypt.hashSync(req.body.password);
	Lawyer.create(req.body).then(function(Lawyer){
		res.send('Success');
		console.log('success');
	}).catch(next);
});

router.post('/lawyer-web', function(req, res, next) {
    req.body.password = bcrypt.hashSync(req.body.password);
	Lawyer.create(req.body).then(function(Lawyer){
		req.session.lawyer = Lawyer;
		console.log('success');
		res.redirect('/main.html');
	}).catch(next);
});

router.delete('/lawyer/:id', function(req, res, next){
	Lawyer.findByIdAndRemove({_id: req.params.id}).then(function(Lawyer){
		 res.send({Lawyer});
	});
});

router.put('/lawyer/:id', function(req, res, next){
	Lawyer.findByIdAndUpdate({_id:req.params.id}).then(function(Lawyer){
		Lawyer.findOne({_id:req.params.id}).then(function(Lawyer){
			res.send(Lawyer);
		});
	});
});
//-----------------------------------------ControlLawyer----------------------------------------------

router.get('/controlLawyer', function(req, res, next) {
	ControlLawyer.find({}).then(function(ControlLawyer){
		res.json({'ControlLawyer' : ControlLawyer});
	});
});

router.get('/controlLawyer-web', function(req, res, next) {
	ControlLawyer.find({}).then(function(ControlLawyer){
		res.send(ControlLawyer);
	});
});

router.get('/controlLawyer/:caseNumber', function(req, res, next) {
	ControlLawyer.find({caseNumber: req.params.caseNumber}).then(function(ControlLawyer){
		res.json({'ControlLawyer' : ControlLawyer});
	});
});

router.get('/controlLawyer-web/:caseNumber', function(req, res, next) {
	ControlLawyer.find({caseNumber: req.params.caseNumber}).then(function(ControlLawyer){
		res.send(ControlLawyer);
	});
});

router.post('/controlLawyer', function(req, res, next) {
	ControlLawyer.create(req.body).then(function(ControlLawyer){
		res.send(ControlLawyer);
	}).catch(next);
});

router.delete('/controlLawyer/:id', function(req, res, next){
	ControlLawyer.findByIdAndRemove({_id: req.params.id}).then(function(ControlLawyer){
		 res.send({ControlLawyer});
	});
});

router.put('/controlLawyer/:id', function(req, res, next){
	ControlLawyer.findByIdAndUpdate({_id:req.params.id}).then(function(ControlLawyer){
		ControlLawyer.findOne({_id:req.params.id}).then(function(ControlLawyer){
			res.send(ControlLawyer);
		});
	});
});

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

router.get('/case-web/:id', function(req, res, next) {
	Case.findById(req.params.id).then(function(Case){
		res.send(Case);
	});
});

router.post('/case', function(req, res, next) {
	Case.create(req.body).then(function(Case){
		res.send(Case);
	}).catch(next);
});

router.post('/case-web', function(req, res, next) {
	Case.create(req.body).then(function(Case){
		res.sendFile('main.html', {root: 'public'});
	}).catch(next);
});

router.delete('/case/:id', function(req, res, next){
	Case.findByIdAndRemove({_id: req.params.id}).then(function(Case){
		 res.send({Case});
	});
});

router.put('/case/:id', function(req, res, next){
	Case.findByIdAndUpdate({_id:req.params.id}).then(function(Case){
		Case.findOne({_id:req.params.id}).then(function(Case){
			res.send(Case);
		});
	});
});

//-----------------------------------------Document------------------------------------------------
router.get('/document', function(req, res, next) {
	Document.find({}).then(function(Document){
		res.json({'Document' : Document});
	});
});

router.get('/document-web', function(req, res, next) {
	Document.find({}).then(function(Document){
		res.send(Document);
	});
});

router.get('/document/:caseNumber', function(req, res, next) {
	Document.find({caseNumber: req.params.caseNumber}).then(function(Document){
		res.json({'Document' : Document});
	});
});

router.get('/document-web/:caseNumber', function(req, res, next) {
	Document.find({caseNumber: req.params.caseNumber}).then(function(Document){
		res.send(Document);
	});
});

router.post('/document', function(req, res, next) {
	Document.create(req.body).then(function(Document){
		res.send(Document);
	}).catch(next);
});

router.delete('/document/:id', function(req, res, next){
	Document.findByIdAndRemove({_id: req.params.id}).then(function(Document){
		 res.send({Document});
	});
});

router.put('/document/:id', function(req, res, next){
	Document.findByIdAndUpdate({_id:req.params.id}).then(function(Document){
		Document.findOne({_id:req.params.id}).then(function(Document){
			res.send(Document);
		});
	});
});
//-----------------------------------------Court------------------------------------------------
router.get('/court', function(req, res, next) {
	Court.find({}).then(function(Court){
		res.json({'Court' : Court});
	});
});

router.get('/court-web', function(req, res, next) {
	Court.find({}).then(function(Court){
		res.send(Court);
	});
});

router.get('/court/:id', function(req, res, next) {
	Court.findById({id: req.params.id}).then(function(Court){
		res.json({'Court' : Court});
	});
});

router.get('/court-web/:id', function(req, res, next) {
	Court.findById({id: req.params.id}).then(function(Court){
		res.send(Court);
	});
});

router.post('/court', function(req, res, next) {
	Court.create(req.body).then(function(Court){
		res.send(Court);
	}).catch(next);
});

router.delete('/court/:id', function(req, res, next){
	Court.findByIdAndRemove({_id: req.params.id}).then(function(Court){
		 res.send({Court});
	});
});

router.put('/court/:id', function(req, res, next){
	Court.findByIdAndUpdate({_id:req.params.id}).then(function(Court){
		Court.findOne({_id:req.params.id}).then(function(Court){
			res.send(Court);
		});
	});
});

//-----------------------------------------ControlClient------------------------------------------------
router.get('/controlClient', function(req, res, next) {
	ControlClient.find({}).then(function(ControlClient){
		res.json({'ControlClient' : ControlClient});
	});
});

router.get('/controlClient-web', function(req, res, next) {
	ControlClient.find({}).then(function(ControlClient){
		res.send(ControlClient);
	});
});

router.get('/controlClient/:caseNumber', function(req, res, next) {
	ControlClient.find({caseNumber: req.params.caseNumber}).then(function(ControlClient){
		res.json({'ControlClient' : ControlClient});
	});
});

router.get('/controlClient-web/:caseNumber', function(req, res, next) {
	ControlClient.find({caseNumber: req.params.caseNumber}).then(function(ControlClient){
		res.send(ControlClient);
	});
});

router.post('/controlClient', function(req, res, next) {
	ControlClient.create(req.body).then(function(ControlClient){
		res.send(ControlClient);
	}).catch(next);
});

router.delete('/controlClient/:id', function(req, res, next){
	ControlClient.findByIdAndRemove({_id: req.params.id}).then(function(ControlClient){
		 res.send({ControlClient});
	});
});

router.put('/controlClient/:id', function(req, res, next){
	ControlClient.findByIdAndUpdate({_id:req.params.id}).then(function(ControlClient){
		ControlClient.findOne({_id:req.params.id}).then(function(ControlClient){
			res.send(ControlClient);
		});
	});
});

//-----------------------------------------Client------------------------------------------------

router.get('/client', function(req, res, next) {
	Client.find({}).then(function(Client){
		res.json({'Client' : Client});
	});
});

router.get('/client-web', function(req, res, next) {
	Client.find({}).then(function(Client){
		res.send(Client);
	});
});

router.get('/client/:identification', function(req, res, next) {
	Client.find({identification: req.params.identification}).then(function(Client){
		res.json({'Client' : Client});
	});

});

router.get('/client/:identification', function(req, res, next) {
	Client.find({identification: req.params.identification}).then(function(Client){
		res.send(Client);
	});

});

router.post('/client', function(req, res, next) {
	Client.create(req.body).then(function(Client){
		res.send(Client);
	}).catch(next);
});

router.delete('/client/:id', function(req, res, next){
	Client.findByIdAndRemove({_id: req.params.id}).then(function(Client){
		 res.send({Client});
	});
});

router.put('/client/:id', function(req, res, next){
	Client.findByIdAndUpdate({_id:req.params.id}).then(function(Client){
		Client.findOne({_id:req.params.id}).then(function(Client){
			res.send(Client);
		});
	});
});

//----------------------------------------------------------------------------------------
function base64_encode(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
    	this.base64 = reader.result;
    };
    reader.readAsDataURL(file);
}
module.exports = router;