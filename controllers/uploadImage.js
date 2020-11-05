// Aquí se utiliza multer, solo llama esta file
const multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
	destination: "./app/public/images/documents",
	filename: (req, file, callback) => {
		// callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
		callback(null, Date.now() + path.extname(file.originalname));
	},
});

function fileFilter(req, file, cb) {
	// Solo se aceptan pdf, word, jpg, png
	var tipos = /jpeg|jpg|png|pdf|docx/;
	var extension = path.extname(file.originalname).toLowerCase();
	if (!tipos.test(extension)) {
		//return cb(new Error('Only pdfs are allowed'))
		req.fileValidationError = "Solo se aceptan PDF, JPG, JPEG, PNG o DOCX";
		return cb(null, false, req.fileValidationError);
	}
	cb(null, true);
}

var upload = multer({
	fileFilter: fileFilter,
	storage: storage,
});

module.exports.upload = upload;
