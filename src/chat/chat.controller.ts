import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Logger } from '@nestjs/common';

@Controller('chat')
export class ChatController {
    logger: Logger;
    
    constructor(private readonly chatService: ChatService) {
        this.logger = new Logger(ChatController.name);
    }
}
