const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    context.res.status = 200;
    return;
  }

  try {
    console.log(process.env.COSMOS_DB_URI, "process.env.COSMOS_DB_URI");
    // Initialize CosmosClient inside the function handler
    const cosmosClient = new CosmosClient({
      endpoint: process.env.COSMOS_DB_URI,
      key: process.env.COSMOS_DB_KEY,
    });

    const database = cosmosClient.database("PostsDB");
    const container = database.container("Posts");

    // Check if database exists
    try {
      await database.read();
    } catch (error) {
      if (error.code === 404) {
        console.log("Database 'PostsDB' not found");
        context.res = {
          status: 200,
          body: { posts: [] },
        };
        return;
      } else {
        throw error;
      }
    }

    // Check if container exists
    try {
      await container.read();
    } catch (error) {
      if (error.code === 404) {
        console.log("Container 'Posts' not found");
        context.res = {
          status: 200,
          body: { posts: [] },
        };
        return;
      } else {
        throw error;
      }
    }

    const { resources } = await container.items.readAll().fetchAll();

    context.res = {
      status: 200,
      body: { posts: resources },
    };
  } catch (error) {
    console.error("Error in getPosts function:", error);
    context.res = {
      status: 500,
      body: {
        error: "Failed to retrieve posts",
        details: error.message,
        code: error.code,
      },
    };
  }
};
