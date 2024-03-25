const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://netstone360:aspire15@cluster0.phwldtn.mongodb.net/checkDb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const checkSchema = new mongoose.Schema({
    name:String,
    authId:Number,
    createdAt: { type: Date, default: Date.now }
})

const checkAdapter = mongoose.model('check',checkSchema,'checkCollection');

// Get All
app.get('/api/check',async(req,res) => {
    try {
        const getCheckDat = await checkAdapter.find();
        res.status(200).json(getCheckDat);
    } catch (error) {
        res.status(500).json(error);
    }    
})

// Get data by Google Auth Id
app.get('/api/check/:authId',async(req,res) => {
    const authId = req.params.authId;
    try {
        const getCheckAuthId = await checkAdapter.find({
            authId:authId
        });
        res.status(200).json(getCheckAuthId);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Post Data
app.post('/api/check',async(req,res) => {
    const {name,authId} = req.body;
    try {
        const postCheckData =  new checkAdapter({
            name,
            authId
        })
        await postCheckData.save();
        res.status(200).json(postCheckData);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Delete Data
app.delete('/api/check/:id',async(req,res) => {
    const checkId = req.params.id;
    try {
        const deleteCheck = await checkAdapter.findByIdAndDelete(checkId);
        res.status(200).json(deleteCheck);
    } catch (error) {
        res.status(500).json(error);
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  






// const express = require('express');
// const bodyParser = require('body-parser');
// const twilio = require('twilio');
// const cors = require('cors'); 

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(cors({
//     origin: 'http://localhost:5173' 
// }));

// const accountSid = 'AC1c7ee030e6d6cc59c7aee70608da7436';
// const authToken = 'e932a68ecb40a82fa435d944a02864e4';
// const client = twilio(accountSid, authToken);

// app.post('/send-sms', (req, res) => {
//     const { phoneNumber, message } = req.body;
//     client.messages
//   .create({
//      body: message,
//      from: '+14846528251',
//      to: phoneNumber
//    })
//   .then(message => console.log(message.sid));
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
