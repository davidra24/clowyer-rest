const express = require('express');
const Lawyer = require('../models/lawyer');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;
const path = require('path');
const fs = require('fs');
var util = require('util')
var multer = require('multer')({
   dest: 'public/uploads'
});
const router = express.Router();

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

router.post('/lawyer-web', [multer.single('img')], function(req, res, next) {
	return storeWithOriginalName(req.file)
    .then(encodeURIComponent)
    .then(encoded => {
      res.redirect(`/upload/success?fileName=${encoded}`)
    })
    .catch(next)
    /*req.body.password = bcrypt.hashSync(req.body.password);
	Lawyer.create(req.body).then(function(Lawyer){
		req.session.lawyer = Lawyer;
		res.redirect('/main');
	}).catch(next);*/
});

router.post('/multer', [multer.single('attachment')], function (req, res, next) {
  return storeWithOriginalName(req.file)
    .then(encodeURIComponent)
    .then(encoded => {
      res.redirect(`/upload/success?fileName=${encoded}`)
    })
    .catch(next)
})

function storeWithOriginalName (file) {
  var fullNewPath = path.join(file.destination, file.originalname)
  var rename = util.promisify(fs.rename)

  return rename(file.path, fullNewPath)
    .then(() => {
      return file.originalname
    })
}

router.delete('/lawyer/:id', function(req, res, next){
	Lawyer.findByIdAndRemove({_id: req.params.id}).then(function(Lawyer){
		 res.send({Lawyer});
	});
});

router.delete('/lawyer-web/:id', function(req, res, next){
	Lawyer.findByIdAndRemove({_id: req.params.id}).then(function(Lawyer){
		 res.redirect('/main');
	});
});

router.put('/lawyer/:id', function(req, res, next){
	Lawyer.findByIdAndUpdate({_id:req.params.id}).then(function(Lawyer){
		Lawyer.findOne({_id:req.params.id}).then(function(Lawyer){
			res.send(Lawyer);
		});
	});
});

router.put('/lawyer-web/:id', function(req, res, next){
	Lawyer.findByIdAndUpdate({_id:req.params.id}).then(function(Lawyer){
		Lawyer.findOne({_id:req.params.id}).then(function(Lawyer){
			res.redirect('/main');
		});
	});
});

module.exports = router;