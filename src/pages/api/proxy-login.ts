import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const response = await fetch("http://183.82.7.208:3002/anyapp/authentication/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body), // Forward the request body
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data); // Return errors from the external API
    }

    res.status(200).json(data); // Return successful response
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
