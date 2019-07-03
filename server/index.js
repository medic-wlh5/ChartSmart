require('dotenv').config();
const express = require('express'),
	session = require('express-session'),
	massive = require('massive'),
	auth_ctrl = require('./authcontroller'),
	doc_ctrl = require('./doccontroller');
const app = express();
const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(
	session({
		secret: SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 1000 * 60 * 60,
		},
	}),
);
app.use(express.static(`${__dirname}/../build`));

massive(CONNECTION_STRING).then(database => {
	app.set('db', database);
	console.log(`🐘🐘 Database set! 🐘🐘`, database.listTables());
	app.listen(SERVER_PORT, () =>
		console.log(`🔥🔥 Server listening on ${SERVER_PORT} 🔥🔥`),
	);
});

app.post(`/auth/doctorregister`, auth_ctrl.doctorRegister);
app.post(`/auth/patientregister`, auth_ctrl.patientRegister);
app.post(`/auth/doctorlogin`, auth_ctrl.doctorLogin);
app.post('/auth/patientlogin', auth_ctrl.patientLogin);
app.get('/auth/logout', auth_ctrl.logout);
app.get('/api/doctor/:id', doc_ctrl.getAllPatients);
app.get('/api/getcase/:docId', doc_ctrl.getCaseId)