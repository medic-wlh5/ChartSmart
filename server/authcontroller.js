const bcrypt = require('bcryptjs');
module.exports = {
    doctorRegister: async (req, res) => {},
	patientRegister: async (req, res) => {},
	doctorLogin: async (req, res) => {},
	patientLogin: async (req, res) => {
		const {email, password}= req.body
		const db=req.app.get('db')
		const {session}= req
		const userFound= await db.check_patient_email({email})

		if(!userFound[0])return res.status(401).send('That user does not exist, please register')

		const authenticated= bcrypt.compareSync(password, userFound[0].password)
		if(authenticated){
			session.user={id:userFound[0].id, first_name:userFound[0].first_name, last_name:userFound[0].last_name, email: userFound[0].email, dob: userFound[0].dob}

			res.status(200).send(session.user)
		}
		else{
			return res.status(401).send('Incorrect email or password')
		}


	},
	updateUser: async (req, res) => {},
	logout: (req, res) => {},
};
