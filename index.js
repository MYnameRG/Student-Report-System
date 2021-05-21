const express = require('express');
const cors = require('cors');
const cluster = require('cluster');
const path = require('path');
const connectDB = require('./dbserver');
const { resolve } = require('path');
const numCPUs = require('os').cpus().length;

//Apply multi-processing ability
if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
}
else {
    const app = express();
    connectDB;

    //Apply CORS policy guidelines
    app.use(cors());
    
    const bodyParser = express.json({ extended: false });
    app.use(bodyParser);

    // app.get('/', (req, res) => {
    //     res.send('API Running');
    // });

    //Define routes
    app.use('/students', require('./routes/api/students'));
    app.use('/results', require('./routes/api/results'));

    //Serve static assets in production
    if(process.env.NODE_ENV === 'production')
    {
        //Set static folder
        app.use(express.static('client/build'));

        //Set the location for pickup the front-end file
        app.get('*', (req, res) => {
            res.sendFile(path, resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}