
module.exports = {
	getBloodTests: async (req, res) => {
		const db = req.app.get('db');
		const { id } = req.params;
		const { test } = req.query;
		db.getBloodworkById({ id, test })
			.then(tests => {
				res.status(200).send(tests);
			})
			.catch(err => {
				if (err) throw err;
			});
	},
};
