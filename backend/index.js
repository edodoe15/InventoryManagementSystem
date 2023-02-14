const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const KorisnikRoutes = require('./routes/KorisnikRoutes');
const DobavljacRoutes = require('./routes/DobavljacRoutes');
const SirovinaRoutes = require('./routes/SirovinaRoutes');
const AuthRoutes = require('./routes/AuthRoutes');

dotenv.config();

let PORT = process.env.PORT;
if(!PORT) PORT = 5000;

const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI);
mongoose.connection.once('open', () => {
    console.log('Konekcija na MongoDB uspjesna');

    app.use('/korisnici', KorisnikRoutes);
    app.use('/dobavljaci', DobavljacRoutes);
    app.use('/sirovine', SirovinaRoutes);
    app.use('/auth', AuthRoutes);

    app.listen(PORT || 5000, () => {
        console.log('Server pokrenut');
    });
});

