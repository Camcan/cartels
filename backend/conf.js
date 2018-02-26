const config = {
   mongo: 'mongodb://mongo-db/auth',
   uploads: {
      path: '/uploads/companies/logos',
      name: 'db.json'
   }
};

module.exports = {
   db: config
}
