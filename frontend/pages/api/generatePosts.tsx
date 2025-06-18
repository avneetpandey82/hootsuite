import type { NextApiRequest, NextApiResponse } from "next";

const AZURE_FUNCTION_URL = process.env.NEXT_PUBLIC_AZURE_FUNCTION_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  console.log("Aaya");
  try {
    const response = await fetch(`${AZURE_FUNCTION_URL}/api/generatePost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    console.log(response);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to generate posts" });
  }
}
