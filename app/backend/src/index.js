const express = require('express');
const multer = require('multer');
const dockerode = require('dockerode');

const app = express();
const db = require('./persistence');
const getGreeting = require('./routes/getGreeting');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

const docker = new dockerode();

app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.get('/api/greeting', getGreeting);
app.get('/api/items', getItems);
app.post('/api/items', addItem);
app.put('/api/items/:id', updateItem);
app.delete('/api/items/:id', deleteItem);

const upload = multer({
    storage: multer.diskStorage({
        destination: "/var/opt/tmp",
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    })
})

app.post('/api/upload', upload.single("file"), async function(req, res){
    console.log("Saved file: ", req.file.path);

    try {
        const container = await docker.createContainer({
            Image: 'chenjohnnycs/python-script-runner',
            Tty: true,
            Cmd: ['python', `/app/uploads/${req.file.originalname}`],
            HostConfig: {
                Binds: [ `C:/Users/chenj67/Desktop/Github/Run-it/app/uploads/${req.file.originalname}:/app/uploads/${req.file.originalname}:ro` ]
            }
        })

        await container.start();

        const container_stream = await container.logs({
            follow: true,
            stdout: true,
            stderr: true,
        })

        container_stream.on('data', function(chunk) {
            console.log(chunk.toString());
        });

        await container.wait()
        await container.remove()

        res.json({ message: "Upload complete.", file: req.file });
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});

db.init()
    .then(() => {
        app.listen(3000, () => console.log('Listening on port 3000'));
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
