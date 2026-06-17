const mongoose = require('mongoose');

const uri2 = 'mongodb://devendrasagar0988_db_user:denami@ac-2gm4uut-shard-00-00.mrys6ig.mongodb.net:27017,ac-2gm4uut-shard-00-01.mrys6ig.mongodb.net:27017,ac-2gm4uut-shard-00-02.mrys6ig.mongodb.net:27017/denami_labs?ssl=true&replicaSet=atlas-c769al-shard-0&authSource=admin&retryWrites=true&w=majority';

async function test() {
  console.log('Testing Direct Node connection with correct replicaSet...');
  try {
    await mongoose.connect(uri2, { serverSelectionTimeoutMS: 5000 });
    console.log('SUCCESS! CONNECTED PERFECTLY.');
    process.exit(0);
  } catch (e) {
    console.error('FAILED TO CONNECT:', e.message);
    process.exit(1);
  }
}
test();
