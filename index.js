const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const multer = require('multer');
const app = express();

//View Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body Parser
app.use(express.urlencoded({ extended: false }));

//rendering to index.ejs
app.get('/', (req, res) => {
	res.render('index');
});

var Storage = multer.diskStorage({
	//destination: path.join(__dirname, 'views/uploads'),
	destination: './views/uploads/',
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});

var upload = multer({
	storage: Storage,
}).single('myImage');

app.post('/upload', upload, (req, res) => {
	console.log(req.file);
	res.send('File Uploaded Successfully!!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`);
});
