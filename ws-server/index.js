const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');

const corsOptions = {
    origin: ['http://localhost:3000', 'https://learning-rosy.vercel.app']
}

app.use(cors(corsOptions))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

let ids = [];

app.ws('/', (ws) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        connectionHandler(ws, msg)
    })
    ws.on('close', () => {
        try {
            let connected = [];
            aWss.clients.forEach(client => {connected.push(client.id)})
            ids.forEach(id => {
                if(!connected.includes(id)) {
                    fs.unlinkSync(path.resolve(__dirname, 'files', `${id}.jpg`))
                }
            })
        } catch (e) {
            console.log(e)
        }
    })
})

let number = 0;

app.ws('/example', (ws) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        number += msg.summand
        connectionHandler(ws, {sum: number})
    })
})

app.get('/example', (req, res) => {
    res.json(number)
})

app.get('/image', (req, res) => {
    try {
        const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
        const data = 'data:image/png;base64,' + file.toString('base64')
        res.json(data)
    } catch (e) {
        console.log(e)
        res.json(null)
    }
})
app.post('/image', (req, res) => {
    try {
        const data = req.body.img.replace('data:image/png;base64,', '')
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
        !ids.includes(req.query.id) && ids.push(req.query.id)
        return res.status(200).json({message: 'Image saved on ws-server'})
    } catch (e) {
        console.log(e)
        return res.status(500).json('ws-server error')
    }
})

app.listen(PORT, () => console.log('ws-server is running on', PORT, 'port'))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadCastConnection(ws, msg)
}

const broadCastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if(client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}