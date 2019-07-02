const bcrypt = require('bcryptjs');

module.exports = {
	doctorRegister: async (req, res) => {
		const { first_name, last_name, email, password, office, pin } = req.body;
		const db = req.app.get('db');
		const { session } = req;
		const doctorFound = await db.check_doctor_email({ email });
		if (doctorFound[0])
			return res.status(409).send('Email address already exists.');
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		const createdDoctor = await db.register_doctor({
			first_name,
			last_name,
			email,
			password: hash,
			office,
			pin,
		});
		session.doctor = {
			id: createdDoctor[0].id,
			first_name: createdDoctor[0].first_name,
			last_name: createdDoctor[0].last_name,
			email: createdDoctor[0].email,
			office: createdDoctor[0].office,
			pin: createdDoctor[0].pin,
		};
		res.status(200).send(session.doctor);
	},

	patientRegister: async (req, res) => {
		const {
			first_name,
			last_name,
			email,
			password,
			DOB,
			doctor_pin,
		} = await req.body;
		const db = req.app.get('db');
		const { session } = req;
		const userFound = await db.check_patient_email({ email });
		if (userFound[0])
			return res.status(409).send('User already exists, please Login');
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		const createdUser = await db.register_patient({
			first_name,
			last_name,
			email,
			password: hash,
			DOB,
			doctor_pin,
		});
		session.user = {
			id: createdUser[0].id,
			first_name: createdUser[0].first_name,
			last_name: createdUser[0].last_name,
			email: createdUser[0].email,
			doctor_pin: createdUser[0].doctor_pin,
		};
		const doctor = await db.findDoctor({
			pin: session.user.doctor_pin,
		});
		await db.create_case({
			patient_id: session.user.id,
			doctor_id: +doctor[0].id,
		});
		res.status(200).send(session.user);
	},

	doctorLogin: async (req, res) => {
		const { email, password } = req.body;
		const db = req.app.get('db');
		const { session } = req;
		const doctorFound = await db.check_doctor_email({ email });
		if (!doctorFound[0])
			return res.status(401).send('Submitted email does not exist.');
		const authenticated = bcrypt.compareSync(password, doctorFound[0].password);
		if (authenticated) {
			session.doctor = {
				id: doctorFound[0].id,
				email: doctorFound[0].email,
			};
			res.status(200).send(session.doctor);
		} else {
			return res.status(401).send('Incorrect email or password.');
		}
	},

	patientLogin: async (req, res) => {
		const { email, password } = req.body;
		const db = req.app.get('db');
		const { session } = req;
		const userFound = await db.check_patient_email({ email });
		if (!userFound[0])
			return res.status(401).send('That user does not exist, please register');
		const authenticated = bcrypt.compareSync(password, userFound[0].password);
		if (authenticated) {
			session.user = {
				id: userFound[0].id,
				first_name: userFound[0].first_name,
				last_name: userFound[0].last_name,
				email: userFound[0].email,
				dob: userFound[0].dob,
			};
			res.status(200).send(session.user);
		} else {
			return res.status(401).send('Incorrect email or password');
		}
	},

	logout: (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
	},
};
