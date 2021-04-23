import { io } from '../http';
import { ConnectionsService } from '../services/ConnctionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const connectionsServices = new ConnectionsService();
  const usersService = new UsersService();
  const messageservice = new MessagesService();

  socket.on('client_first_acess', async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as IParams;

    let user_id;

    const userExists = await usersService.findByEmail(email);

    if(!userExists) {
      const user = await usersService.create(email);

      await connectionsServices.create({
        socket_id,
        user_id: user.id,
      });

      user_id = user.id;
    } else {
      user_id = userExists.id;
      const connection = await connectionsServices.findByUserID(userExists.id);

      if(!connection) {
        await connectionsServices.create({
          socket_id,
          user_id: userExists.id,
        });
      }else {
        connection.socket_id = socket_id;

        await connectionsServices.create(connection);
      }
    }

    await messageservice.create({
      text,
      user_id
    })
  })
})