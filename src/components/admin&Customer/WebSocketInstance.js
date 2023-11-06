// WebSocketInstance.js
class WebSocketInstance {
  constructor() {
    console.log("websocket called inside constructor");
    this.socket = null;
    this.listeners = [];

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.listenForNotifications = this.listenForNotifications.bind(this);
  }

  connect() {

    // Set the correct WebSocket URL based on your Django Channels routing
    // WebSocketInstance.js
    this.socket = new WebSocket(
      "ws://127.0.0.1:8000/ws/notification/"
    );

    console.log(this.socket, "helooooooooooooooooooooooo");
    this.socket.onopen = () => {
      console.log("WebSocket connected");
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");
      this.socket = null;
    };
  }

  disconnect() {
    console.log("websocket called inside disconnect");

    if (this.socket) {
      this.socket.close();
    }
  }

  listenForNotifications(callback) {
    this.listeners.push(callback);
  }
}

const instance = new WebSocketInstance();

export default instance;
