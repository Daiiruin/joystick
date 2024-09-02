import AsyncStorage from '@react-native-async-storage/async-storage';

export class WebSocketManager {
  private static instance: WebSocketManager;
  public socket!: WebSocket;
  private isConnected: boolean = false;
  private ipAddress: string | null = null;

  private constructor() {
    this.loadIpAddressAndConnect();
  }

  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  private async loadIpAddressAndConnect() {
    try {
      const storedIpAddress = await AsyncStorage.getItem('carIpAddress');
      if (storedIpAddress) {
        this.ipAddress = storedIpAddress;
        this.connect(this.ipAddress);
      } else {
        console.error('No IP address found in storage.');
      }
    } catch (error) {
      console.error('Failed to load IP address:', error);
    }
  }

  private connect(ipAddress: string) {
    if (!ipAddress) {
      console.error('IP address is required to connect.');
      return;
    }

    this.socket = new WebSocket(`ws://${ipAddress}/carwebsocket`);

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

  public updateIpAddress(ipAddress: string) {
    this.ipAddress = ipAddress;
    AsyncStorage.setItem('carIpAddress', ipAddress)
      .then(() => {
        console.log('IP address updated and saved.');
        this.connect(ipAddress);
      })
      .catch(error => {
        console.error('Failed to save IP address:', error);
      });
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
