const bcrypt= require('bcryptjs')
module.exports = {
	doctorRegister: async (req, res) => {
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
        
        console.log(doctor)
        await db.create_case({
            patient_id: session.user.id,
            doctor_id: +doctor[0].id
            
        })

        res.status(200).send(session.user)
    },
	doctorLogin: async (req, res) => {},
	patientLogin: async (req, res) => {},
	updateUser: async (req, res) => {},
	logout: (req, res) => {},
};
