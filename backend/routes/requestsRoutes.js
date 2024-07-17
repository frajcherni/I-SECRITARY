const requestsController = require("../controllers/RequestsController");

module.exports = (app, io) => {
  requestsController.setIoInstance(io);
  
  app.get("/api/requests", requestsController.findRequests);
  app.get("/api/requests/viewed", requestsController.findRequestsViewed);
  app.get("/api/requests/notviewed", requestsController.findRequestsNotViewed);
  app.get("/api/requests/:id", requestsController.findRequestById);
  app.post("/api/requests", requestsController.createRequest);
  app.patch("/api/requests/:id", requestsController.editRequestStatus);
  app.delete("/api/requests/:id", requestsController.deleteRequest);
};
