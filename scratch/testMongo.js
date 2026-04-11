const mongoose = require('mongoose');
const uri = 'mongodb+srv://1109anilchauhan_db_user:jzBnvKaQanNxO1OY@cluster0.uzcpawi.mongodb.net/?appName=Cluster0';
mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB Connected Successfully!');
    process.exit(0);
  })
  .catch(e => {
    console.error('MongoDB Connection Error:', e.message);
    process.exit(1);
  });
