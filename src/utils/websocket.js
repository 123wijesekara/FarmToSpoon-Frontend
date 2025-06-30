class WebSocketClient {
    constructor(userId) {
      this.userId = userId;
      this.socket = null;
      this.messageHandlers = [];
      this.reconnectAttempts = 0;
      this.maxReconnectAttempts = 5;
      this.reconnectDelay = 3000; // 3 seconds
    }
  
    connect() {
      const wsUrl = `ws://${window.location.hostname}:${window.location.port}?userId=${this.userId}`;
      this.socket = new WebSocket(wsUrl);
  
      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };
  
      this.socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.messageHandlers.forEach(handler => handler(message));
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
        this.attemptReconnect();
      };
  
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  
    attemptReconnect() {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
        setTimeout(() => this.connect(), this.reconnectDelay);
      }
    }
  
    addMessageHandler(handler) {
      this.messageHandlers.push(handler);
    }
  
    removeMessageHandler(handler) {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
      }
    }
  }
  
  export default WebSocketClient;