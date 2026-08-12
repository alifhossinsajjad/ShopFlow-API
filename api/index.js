const app = require('../dist/app').default;
const { initDB } = require('../dist/app/config/db');
const setupOrderListeners = require('../dist/app/modules/orders/order.listener').default;

let isInitialized = false;

module.exports = async (req, res) => {
  if (!isInitialized) {
    console.log('Initializing database and listeners...');
    await initDB();
    if (setupOrderListeners) setupOrderListeners();
    isInitialized = true;
  }
  
  // Delegate the request to the Express app
  return app(req, res);
};
