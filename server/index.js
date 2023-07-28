const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const fs = require('fs')
const path = require('path')

app.use(cors())
app.use(express.json())

let ids = [];

app.ws('/', (ws) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        connectionHandler(ws, msg)
    })
    ws.on('close', () => {
        try {
            let result = [];
            aWss.clients.forEach(client => {result.push(client.id)})
            ids.forEach(id => {
                if(!result.includes(id)) {
                    fs.unlinkSync(path.resolve(__dirname, 'files', `${id}.jpg`))
                }
            })
        } catch (e) {
            console.log(e)
        }
    })
})

let quantity = 0;

app.ws('/quantity', (ws) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        console.log(msg.method)
        if(msg.method === 'open') {
            quantity += 1;
        } else {
            quantity -= 1;
        }
        getQuantity(ws)
    })
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
        return res.status(200).json({message: 'Image saved on server'})
    } catch (e) {
        console.log(e)
        return res.status(500).json('server error')
    }
})

app.listen(PORT, () => console.log('server is running on', PORT, 'port'))

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

const getQuantity = () => {
    aWss.clients.forEach(client => {
        client.send(quantity)
    })
}