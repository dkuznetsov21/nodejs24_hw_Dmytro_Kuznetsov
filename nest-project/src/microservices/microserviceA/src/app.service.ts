import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {ISendMessageResponse} from "./interface/send-message-response.interface";
import {ISendMessage} from "./interface/send-message.interface";

@Injectable()
export class AppService {
    async sendMessage(message: ISendMessage): Promise<ISendMessageResponse> {
        const url = 'http://localhost:3001/message-receive';

        try {
            const response = await axios.post(url, { message });
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw new Error('Failed to send message');
        }
    }
}
