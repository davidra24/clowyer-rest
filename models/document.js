var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentSchema = new Schema({
	name:{
		type: String,
		required: [true, 'Name Document is required']
	},
	type:{
		type:String,
		required: [true, 'Type Document is required']
	},
	caseNumber:{
		type:String,
		required: [true, 'Case number of Document is required']
	}
});

const Document = mongoose.model('document', DocumentSchema);
module.exports = Document;