const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let drawnBalls = [];
let gameInterval = null;

// Lógica de sorteio centralizada
function drawBall() {
    if (drawnBalls.length < 75) {
        let ball;
        do { ball = Math.floor(Math.random() * 75) + 1; } while (drawnBalls.includes(ball));
        drawnBalls.push(ball);
        
        // ENVIA PARA TODOS OS CELULARES AO MESMO TEMPO
        io.emit('newBall', { ball: ball, history: drawnBalls });
    }
}

io.on('connection', (socket) => {
    console.log('Novo jogador conectado');
    // Envia o estado atual do jogo para quem acabou de entrar
    socket.emit('gameState', { history: drawnBalls });

    // Se você quiser que o admin (você) controle o início
    socket.on('startBingo', () => {
        if (!gameInterval) {
            gameInterval = setInterval(drawBall, 5000);
        }
    });
});

server.listen(3000, () => console.log('Servidor GAMEFLIX rodando na porta 3000'));