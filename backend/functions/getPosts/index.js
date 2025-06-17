const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    context.res.status = 200;
    return;
  }

  try {
    // Initialize CosmosClient inside the function handler
    const cosmosClient = new CosmosClient({
      endpoint: process.env.COSMOS_DB_URI,
      key: process.env.COSMOS_DB_KEY,
    });

    const container = cosmosClient.database("PostsDB").container("Posts");
    const { resources } = await container.items.readAll().fetchAll();

    context.res = {
      status: 200,
      body: { posts: resources },
    };
  } catch (error) {
    console.error("Error in getPosts function:", error);
    context.res = {
      status: 500,
      body: { error: "Failed to retrieve posts", details: error.message },
    };
  }
};
