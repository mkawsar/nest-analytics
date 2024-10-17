import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})

export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly chatService: ChatService) {}

    @SubscribeMessage('send_message')
    async handleMessage(@MessageBody() messageData: {msg: string, senderID: string, receiverID?: string, groupID?: string}, @ConnectedSocket() client: Socket): Promise<void> {
        //TODO
    }
}
