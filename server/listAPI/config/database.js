module.exports = (mongoose, config) => {
  const database = mongoose.connection;
  mongoose.Promise = Promise;

  mongoose.connect(config.database, {
    useMongoClient: true,
    promiseLibrary: global.Promise
  });

  database.on('error', error => console.log(`Connection to taskScheduler database failed: ${error}`));
  database.on('connected', () => console.log('Connected to taskScheduler database'));
  database.on('disconnected', () => console.log('Disconnected from taskScheduler database'));

  process.on('SIGINT', () => {
    database.close(() => {
      console.log('taskScheduler terminated, connection closed');
      process.exit(0);
    })
  });
};
