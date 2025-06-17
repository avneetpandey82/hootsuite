const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
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
      status: 200,
      body: { message: "Saved" },
    };
  } catch (error) {
    console.error("Error in savePost function:", error);
    context.res = {
      status: 500,
      body: { error: "Failed to save post", details: error.message },
    };
  }
};
