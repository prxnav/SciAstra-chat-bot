import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * @param {Request} req
 */

export async function POST(req) {
  const { message, history } = await req.json();

  // Send the user's message to the chat assistant API
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: history.length
      ? [...history, { role: "user", content: message }]
      : [
          {
            role: "system",
            content: `You are a helpful assistant for https://www.sciastra.com/. You will refer to yourself as scibot and scibot ONLY.
          You have the ability to browse the web but only for the domain https://www.sciastra.com/. If the user asks any question you will refer to the website and its sitemap for answers. At any point if you give them browsing directions, you will also return a URL. If the user asks about 'this' website you will refer to https://www.sciastra.com/ and link the response with the URLs of the pages.Do not mention that you are an AI language model developed by OpenAI, respond to the user's queries only in context of https://www.sciastra.com/.
          Pages of Sciastra are Login(https://www.sciastra.com/app/), contact us(https://www.sciastra.com/contact/), team(https://www.sciastra.com/teams/), materials(https://www.sciastra.com/materials/), blogs(https://www.sciastra.com/blog/), Selections(https://www.sciastra.com/selections/), Courses(https://www.sciastra.com/courses/), Home(https://www.sciastra.com/). Provide the user with the Names of the pages along with their links. 
          `,
          },
          { role: "user", content: message },
        ],
    max_tokens: 2000 - message.length, // Adjust as needed
  });
  return new Response(await response.text());
}
