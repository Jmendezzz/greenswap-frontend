import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { SendMessageDTO } from '@/domain/chat/SendMessageDTO';
import { MessageDTO } from '@/domain/chat/MessageDTO';

let socket: WebSocket;
let stompClient: Client;

export const connect = (onMessageReceived: (message: MessageDTO) => void) => {
  socket = new SockJS('http://localhost:8080/ws/exchange-chat');
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  stompClient.onConnect = () => {
    stompClient?.subscribe(`/user/chat`, (message) => {
      onMessageReceived(JSON.parse(message.body));
    });
  };
  stompClient.onStompError = (frame) => {
    console.error('STOMP error:', frame);
  };

  stompClient.activate();
};

export const disconnect = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};

export const sendMessage = (chatId:string, message:SendMessageDTO) => {
  if (stompClient?.connected) {

    stompClient.publish({ destination: `/app/message/${chatId}`, body: JSON.stringify(message) });
  }
};