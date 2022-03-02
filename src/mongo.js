import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const mongoClient = (() => {
  const options = {
    // useCreateIndex: true,
    useNewUrlParser: true,
    keepAlive: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  };

  let instance;

  const getClient = async () => {
    try {
      await mongoose.connect(`${process.env.DB_URI}`, options);

      const { connection } = mongoose;

      connection.on('error', (error) => {
        logger.error(`Database error occurred: ${error}`);
      });

      instance = connection;
      console.error('💾 Database connected');

      return instance;
    } catch (e) {
      console.error(e);
      throw Error(`Unable to connect to database: ${e}`);
    }
  };

  return {
    getClient,
  };
})();

export { mongoClient as MongoClient };
