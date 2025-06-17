const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
  // Add CORS headers
  context.res = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  };

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    context.res.status = 200;
    return;
  }

  try {
    const { caption, datetime } = req.body;

    // Initialize CosmosClient inside the function handler
    const cosmosClient = new CosmosClient({
      endpoint: process.env.COSMOS_DB_URI,
      key: process.env.COSMOS_DB_KEY,
    });

    const container = cosmosClient.database("PostsDB").container("Posts");
    await container.items.create({ caption, datetime });

    context.res = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      status: 200,
      body: { message: "Saved" },
    };
  } catch (error) {
    console.error("Error in savePost function:", error);
    context.res = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      status: 500,
      body: { error: "Failed to save post", details: error.message },
    };
  }
};
