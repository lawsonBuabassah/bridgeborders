const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.json());

const dbURL = "mongodb+srv://eyarko:%40password123@lawsonscluster.l1vqepq.mongodb.net/modal";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(dbURL, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true });

const ModalData = mongoose.model('Data', dataSchema);

module.exports = function (app) {
// Fetch modal details
app.get('/', urlencodedParser, async function (req, res) {
    try {
        // Get data from MongoDB
        const data = await ModalData.find({}).exec();

        // Render the view with the data
        res.render('index', { modalData: data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching modal data');
    }
});


app.get('/admin', function (req, res) {
        // Load admin view
        res.render('admin');
});

app.get('/gpt', function (req, res) {
    // Load admin view
    res.render('gpt');
});

    // Update modal data by ID
app.post('/update', urlencodedParser, function (req, res) {
    // Update modal data
    const modalId = req.params.id;
    const updateData = req.body;

    // Use the findOneAndUpdate method with promises
    ModalData.findOneAndUpdate({ _id: '655a3ba0e05fdd05eba907f1' }, updateData, { new: true })
        .then(updatedData => {
            if (!updatedData) {
                return res.status(404).send('Modal data not found');
            }
            res.render('index', { modalData: updatedData });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating modal data');
        });
});


};
