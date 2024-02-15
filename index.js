// creating express server########


//impo router
const router = require('./Routes/router');

require('dotenv').config();

// imp exprs
const express = require('express');
require('./DB/connection')

//imp cors
const cors = require('cors')

//server
const pServer = express();

//apply cors to the server
pServer.use(cors())
//middleware, for converting to json obj
pServer.use(express.json());
pServer.use(router);
pServer.use('/uploads',express.static('./uploads'))

// set port
const PORT = 4000 || process.env.PORT

pServer.listen(PORT, () => {
    console.log(`Server is up & running on PORT ${PORT}`)
});


pServer.get('/', (req, res) => {
    res.send("Project is running")
})
