import express from 'express';
import routes from './routes';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import './database';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/pages/client', (request, response) => {
  return response.render('html/client.html');
})

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket: Socket) => {
  console.log('Conectado com id:', socket.id);
});

app.use(express.json());
app.use(routes);

export { http, io };