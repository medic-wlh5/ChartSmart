module.exports = {
	getAllPatients: async (req, res) => {
		const db = req.app.get('db');
		const { id } = req.params;
		db.get_patients({ id })
			.then(patients => {
				res.status(200).send(patients);
			})
			.catch(err => {
				if (err) throw err;
			});
	},

	getCaseId: async (req,res)=>{
		const db = req.app.get('db')
		const {docId}= req.params
		const {id}= req.query

		db.get_case_id({docId, id})
			.then(caseId =>{
				res.status(200).send(caseId[0])
			})
			.catch(err =>{
				if (err) throw err;
			})
	},

	createVisit: async (req, res)=>{
		const {date, caseId}= req.body
		const db = req.app.get('db')

		db.create_visit({date, caseId})
		.then(visitId =>{
			res.status(200).send(visitId[0])
		})
		.catch(err =>{
			if(err) throw err
		})
	}, 

	chartBloodwork: async (req, res)=>{
		const {bloodTestValues, visitId}= req.body
		const db= req.app.get('db')

	for (let i=0; i<bloodTestValues.length; i++){
		db.chart_bloodwork(bloodTestValues[i].testName, bloodTestValues[i].testValue, visitId)
		.then(res.sendStatus(200))
		
	}
	
		
	},

	chartVitals: async(req, res)=>{
		const {vitalTestValues, visitId}= req.body 
		const db= req.app.get('db')

		for(let i=0; i<vitalTestValues.length; i++){
			db.chart_vitals(vitalTestValues[i].testName, vitalTestValues[i].testValue, visitId)
			.then(res.sendStatus(200))
		}
	}
};
