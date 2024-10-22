import { Injectable } from '@nestjs/common';
import {IReceiveMessage} from "./interface/receive-message.interface";
import {IReceiveMessageResponse} from "./interface/receive-message-response.interface";

@Injectable()
export class AppService {
    handleMessage(receiveMessage: IReceiveMessage): IReceiveMessageResponse {
        console.log('Received message:', receiveMessage.message);
        return {
            message: `Message "${receiveMessage.message}" received successfully`
        };
    }
}
