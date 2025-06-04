import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-4.1-mini",
  input: "Draw a 2D pixel art style sprite sheet of a tabby gray cat",
  tools: [
    {
      type: "image_generation",
      background: "transparent",
      quality: "high",
    },
  ],
});

const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const imageBuffer = Buffer.from(imageBase64, "base64");
  fs.writeFileSync("sprite.png", imageBuffer);
}
