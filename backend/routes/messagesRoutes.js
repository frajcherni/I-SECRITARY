const messageController = require("../controllers/messagesController");

module.exports = (app, io) => {
  messageController.setIoInstance(io);
  
  app.get("/api/messages", messageController.findAllMessages);
  app.get("/api/messages/:id", messageController.findMessageById);
  app.post("/api/messages", messageController.sendMessage);
  app.delete("/api/messages/:id", messageController.deleteMessageById);
  app.patch("/api/messages/:id", messageController.editMessageById);
};
