import {Controller, Post, Body} from '@nestjs/common';
import {AppService} from './app.service';
import {ReceiveMessageDto} from './dto/receive-message.dto';
import {ReceiveMessageResponseDto} from "./dto/receive-message-response.dto";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Post('/message-receive')
    async receiveMessage(@Body() receiveMessageDto: ReceiveMessageDto): Promise<ReceiveMessageResponseDto> {
        return this.appService.handleMessage({message: receiveMessageDto.message});
    }
}
