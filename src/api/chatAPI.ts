export const chatAPI = {
    connect: () => new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'),
}