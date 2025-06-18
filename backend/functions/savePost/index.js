const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
  try {
    const { caption, datetime } = req.body;
    console.log(caption, datetime, process.env.COSMOS_DB_URI);

    // Initialize CosmosClient inside the function handler
    const cosmosClient = new CosmosClient({
      endpoint: process.env.COSMOS_DB_URI,
      key: process.env.COSMOS_DB_KEY,
    });

    // Get database and container references
    const database = cosmosClient.database("PostsDB");
    const container = database.container("Posts");

    // Check if database exists, if not create it
    try {
      await database.read();
    } catch (error) {
      if (error.code === 404) {
        console.log("Database 'PostsDB' not found, creating...");
        await cosmosClient.databases.create({ id: "PostsDB" });
        console.log("Database 'PostsDB' created successfully");
      } else {
        throw error;
      }
    }

    // Check if container exists, if not create it
    try {
      await container.read();
    } catch (error) {
      if (error.code === 404) {
        console.log("Container 'Posts' not found, creating...");
        await database.containers.create({
          id: "Posts",
          partitionKey: "/id",
        });
        console.log("Container 'Posts' created successfully");
      } else {
        throw error;
      }
    }

    // Create the post item with a unique ID
    const postItem = {
      id: new Date().getTime().toString(), // Generate unique ID
      caption,
      datetime,
      createdAt: new Date().toISOString(),
    };

    await container.items.create(postItem);

    context.res = {
      status: 200,
      body: { message: "Saved", postId: postItem.id },
    };
  } catch (error) {
    console.error("Error in savePost function:", error);
    context.res = {
      status: 500,
      body: {
        error: "Failed to save post",
        details: error.message,
        code: error.code,
      },
    };
  }
};
