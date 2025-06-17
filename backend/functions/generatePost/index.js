const OpenAI = require("openai");

const tools = [
  {
    type: "function",
    name: "get_captions",
    description: "Create captions based on the user instructions.",
    parameters: {
      type: "object",
      properties: {
        captions: {
          type: "array",
          description: "Generate 3 captions.",
          items: {
            type: "string",
          },
        },
      },
      required: ["captions"],
      additionalProperties: false,
    },
  },
];

module.exports = async function (context, req) {
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    context.res.status = 200;
    return;
  }

  const { topic, tone, platform } = req.body;
  const prompt = `Generate 3 ${tone} social media posts for ${platform} about "${topic}" in an html format. A caption can contain emojis, humour and excitement whenever it is necessary`;
  console.log(process.env.OPENAI_API_KEY, "openaikey");
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log(topic, tone, platform);
  try {
    const completion = await openai.responses.create({
      model: "gpt-4.1",
      input: [{ role: "user", content: prompt }],
      tools,
    });

    console.log(completion);

    const captions = JSON.parse(completion.output[0]?.arguments);

    context.res = {
      body: { captions },
    };
  } catch (error) {
    console.log(error);
    context.res = {
      status: 500,
      body: { error: "Failed to generate posts", details: error.message },
    };
  }
};
