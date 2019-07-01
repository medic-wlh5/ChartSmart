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
			first_name: createdDoctor[0].first_name,
			last_name: createdDoctor[0].last_name,
			email: createdDoctor[0].email,
			office: createdDoctor[0].office,
			pin: createdDoctor[0].pin,
		};
		res.status(200).send(session.doctor);
	},
	patientRegister: async (req, res) => {
		const {first_name, last_name, email, password, DOB, doctor_pin}= await req.body
       const db= req.app.get('db')
       const {session}= req
       const userFound= await db.check_patient_email({email})
       if(userFound[0]) return res.status(409).send('User already exists, please Login')
       const salt= bcrypt.genSaltSync(10)
       const hash= bcrypt.hashSync(password, salt)
       const createdUser= await db.register_patient({
           first_name,
           last_name,
           email,
           password: hash,
           DOB,
           doctor_pin

       })

       session.user={id: createdUser[0].id, first_name: createdUser[0].first_name, last_name: createdUser[0].last_name, email: createdUser[0].email, doctor_pin: createdUser[0].doctor_pin}

       const doctor= await db.findDoctor({
           pin: session.user.doctor_pin
       })

       await db.create_case({
           patient_id: session.user.id,
           doctor_id: +doctor[0].id

       })

       res.status(200).send(session.user)
	},
	doctorLogin: async (req, res) => {},
	patientLogin: async (req, res) => {},
	updateUser: async (req, res) => {},
	logout: (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
	},
};
