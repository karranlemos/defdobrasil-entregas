const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(require('./routes/routes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));