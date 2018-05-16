var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LawyerSchema = new Schema({
	identification:{
		type: String,
		required: [true, 'Identification lawyer is required']
	},
	name:{
		type: String,
		required: [true, 'Name lawyer is required']
	},
	speciality:{
		type: String,
		required: [true, 'Speciality lawyer is required']
	},
	phone:{
		type:String,
		required: [true, 'Phone lawyer is required']
	},
	img:{
		type:String,
		required: [false, 'Img lawyer is required']
	},
	type:{
		type:String,
		required: [true, 'Type lawyer is required']
	}
});

const Lawyer = mongoose.model('lawyer', LawyerSchema);
module.exports = Lawyer;