# Azure Functions Backend Setup

This backend contains Azure Functions for generating and managing social media posts.

## Prerequisites

1. **OpenAI API**: You need an OpenAI API key
2. **Azure Cosmos DB**: You need a Cosmos DB account with a database and container

## Configuration

### 1. Update local.settings.json

Replace the placeholder values in `local.settings.json` with your actual credentials:

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "OPENAI_API_KEY": "your-actual-openai-api-key",
    "COSMOS_DB_URI": "https://your-cosmos-account.documents.azure.com:443/",
    "COSMOS_DB_KEY": "your-actual-cosmos-key"
  }
}
```

### 2. OpenAI Setup

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an API key
3. Add the API key to your `local.settings.json`

### 3. Cosmos DB Setup

1. Create a Cosmos DB account in Azure Portal
2. Create a database named "PostsDB"
3. Create a container named "Posts"
4. Get your Cosmos DB URI and primary key

## Running the Functions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the functions:
   ```bash
   func start
   ```

## API Endpoints

- `POST /api/generatePost` - Generate social media posts using OpenAI
- `GET /api/getPosts` - Retrieve saved posts
- `POST /api/savePost` - Save a post to Cosmos DB

## Troubleshooting

- Make sure all environment variables are properly set
- Verify your OpenAI API key is correct and has sufficient credits
- Check that your Cosmos DB database and container exist
- Ensure your OpenAI API key has access to the required models
