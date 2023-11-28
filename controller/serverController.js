const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.json());

const dbURL = "mongodb+srv://lbekkeltd:lawson2023@cluster0.hbnhxze.mongodb.net/modal";

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
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true });

const ModalData = mongoose.model('Data', dataSchema);

const gallerySchema = new Schema({
    title: {
        type: String
    },
    imageUrl: {
        type: String
    }
}, { timestamps: false });

const GalleryData = mongoose.model('gallery', gallerySchema);

module.exports = function (app) {
// Fetch modal details
app.get('/', urlencodedParser, async function (req, res) {
    try {
        // Get data from MongoDB
        const myModalData = await ModalData.find({}).exec();
        const myGalleryData = await GalleryData.find({}).exec();

        const combinedData = {
            modalData: myModalData,
            galleryData: myGalleryData,
        };

        // Render the view with the data
        res.render('index', { data: combinedData });
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
app.post('/updateModal', urlencodedParser, function (req, res) {
    // Update modal data
    const modalId = req.params.id;
    const updateData = req.body;

    // Use the findOneAndUpdate method with promises
    ModalData.findOneAndUpdate({ _id: '655a3ba0e05fdd05eba907f1' }, updateData, { new: true })
        .then(updatedData => {
            if (!updatedData) {
                return res.status(404).send('Modal data not found');
            }
            res.render('admin');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating modal data');
        });
});

//add gallery image
app.post('/addToGallery', urlencodedParser, function (req, res) {
    // Extract data from the request body
    const newData = req.body;

    // Create a new instance of the ModalData model
    const newGalleryImage = new GalleryData(newData);

    // Save the new data to the database using promises
    newGalleryImage.save()
        .then(savedData => {
            // Optionally, you can render a view or send a response
            res.render('admin');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error adding gallery image');
        });
});

};
