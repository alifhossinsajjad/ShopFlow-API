import app from "./app";
import { initDB } from "./app/config/db";
import setupOrderListeners from "./app/modules/orders/order.listener";

const port = process.env.PORT || 5000;

// Initialize Database and Start Server
const startServer = async () => {
  await initDB();
  
  // Initialize Listeners
  setupOrderListeners();
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};


startServer();