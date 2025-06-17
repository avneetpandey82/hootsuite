# SmartSocial – AI Social Post Generator & Scheduler

A mini SaaS tool to generate and schedule AI-powered social media content.

## Tech Stack

- **Next.js** frontend (Azure Static Web Apps)
- **Azure Functions** for backend logic
- **Azure OpenAI** for post generation
- **Azure Cosmos DB** for storing scheduled posts

## Setup

### 1. Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Copy the template file and add your credentials:

   ```bash
   cp local.settings.template.json local.settings.json
   ```

3. Update `local.settings.json` with your actual credentials:

   - Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Get your Cosmos DB URI and key from Azure Portal

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the Azure Functions:
   ```bash
   func start
   ```

### 2. Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Generate posts on `/generate`
- Schedule them via `/schedule`
- View scheduled posts on `/dashboard`

## Security Notes

- Never commit `local.settings.json` to version control
- Keep your API keys secure
- Use environment variables in production

---

Let me know if you want environment file samples or GitHub Actions CI/CD setup next!
