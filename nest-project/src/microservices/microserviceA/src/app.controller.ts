import {Controller, Post, Body} from '@nestjs/common';
import {AppService} from './app.service';
import {SendMessageDto} from './dto/send-message.dto';
import {SendMessageResponseDto} from "./dto/send-message.response.dto";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Post('/message')
    async triggerSendMessage(@Body() sendMessageDto: SendMessageDto): Promise<SendMessageResponseDto> {
        return this.appService.sendMessage({message: sendMessageDto.message});
    }
}
