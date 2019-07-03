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
				res.status(200).send(caseId)
			})
			.catch(err =>{
				if (err) throw err;
			})
	}
};
