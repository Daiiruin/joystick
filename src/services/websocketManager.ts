export class WebSocketManager {
  private static instance: WebSocketManager;
  private socket: WebSocket;
  private isConnected: boolean = false;

  private constructor() {
    this.connect();
  }

  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  private connect() {
    this.socket = new WebSocket('ws://192.168.1.75:8080');

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
      this.isConnected = true;
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
      this.isConnected = false;
    };

    this.socket.onerror = error => {
      console.error('WebSocket error:', error);
      this.isConnected = false;
    };

    this.socket.onmessage = message => {
      console.log('WebSocket message received:', message.data);
    };
  }

  public sendMessage(message: object) {
    if (this.isConnected && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error(
        'Cannot send message, WebSocket not open. Ready state is:',
        this.socket.readyState,
      );
    }
  }
}
