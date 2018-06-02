const config = {
   mongo: 'mongodb://localhost',
   uploads: {
      path: './uploads/logos/',
      name: 'db.json'
   }
};

module.exports = {
   	port: 8443,
	db: config
}
