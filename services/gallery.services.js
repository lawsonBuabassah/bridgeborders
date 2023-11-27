const dbURL = "mongodb+srv://lbekkeltd:lawson2023@cluster0.hbnhxze.mongodb.net/gallery";


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

const gallerySchema = new Schema({
    name: {
        type: String
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true });

const ModalData = mongoose.model('studentData', gallerySchema);


class GalleryServices{
    static async uploadImage(name, url){

    }

    static async loadImages(){

    }
}

module.exports = GalleryServices;