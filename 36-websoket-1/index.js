const net = require("net")
const crypto = require("crypto")
const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';


let server = net.createServer(function (socket) {
    socket.once("data", function(data) {
        data = data.toString()
        console.log('data', data)
        if(data.match(/Upgrade: websocket/)) {
            let rows = data.split('\r\n')
            rows = rows.slice(1, -2)
            const headers = {}
            rows.forEach((row) => {
                let [key, value] = row.split(': ')
                headers[key] = value
            })

            if(headers['Sec-WebSocket-Version'] == 13) {
                let wsKey = headers['Sec-WebSocket-Key']
                let acceptKey = crypto.createHash("sha1").update(wsKey + CODE).digest('base64')
                let response = [
                    'HTTP/1.1 101 Switching Protocols',
                    'Upgrade: websocket',
                    `Sec-WebSocket-Accept: ${acceptKey}`,
                    'Connection: Upgrade',
                    '\r\n'
                ].join('\r\n')

                socket.write(response)

                socket.on('data', (buffers) => {

                })
            }
        }
    })

})

/**
 * GET ws://localhost:8888/ HTTP/1.1
 * Host: localhost:8888
 * Connection: Upgrade
 * Upgrade: websocket
 * Sec-WebSocket-Version: 13
 * Sec-WebSocket-Key: IHfMdf8a0aQXbwQO1pkGdA==
 */

server.listen(9999)