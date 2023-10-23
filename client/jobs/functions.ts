import { eventTrigger } from "@trigger.dev/sdk";
import { client } from "@/trigger";
// import { OpenAI } from "@trigger.dev/openai";
import {ChatCompletionCreateParams, ChatCompletionMessageParam} from "openai/resources/chat";
import {extractSentencesInQuotes} from "@/helpers/extractSentencesInQuotes";
import OpenAI from "openai";
import {supabase} from "@/modules/chatGPT/page/supabaseClient";
import {resend} from "@/pages/api/send";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Your first job
// This Job will be triggered by an event, log a joke to the console, and then wait 5 seconds before logging the punchline
client.defineJob({
  id: "generate-meme",
  name: "Generate Meme",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "generate.meme",
  }),
  run: async (payload, io, ctx) => {
    const { audience, topic, email } = payload;
    // This logs a message to the console and adds an entry to the run dashboard
    await io.logger.info("Meme request received!✅");
    await io.logger.info("Meme generation in progress 🤝");

    // Wrap your code in io.runTask to get automatic error handling and logging
    const selectedTemplate = await io.runTask("fetch-meme", async () => {
      const fetchAllMeme = await fetch("https://api.imgflip.com/get_memes");
      const memesData = await fetchAllMeme.json();
      const memes = memesData.data.memes;

      const randInt = Math.floor(Math.random() * 101);

      return memes[randInt];
    });

    const userPrompt = `Topics: ${topic} \n Intended Audience: ${audience} \n Template: ${selectedTemplate.name} \n`;

    const sysPrompt = `You are a meme idea generator. You will use the imgflip api to generate a meme based on an idea you suggest. Given a random template name and topics, generate a meme idea for the intended audience. Only use the template provided.`;

    await io.sendEvent("generate-gpt-text", {
      name: "gpt.text",
      payload: {
        userPrompt,
        sysPrompt,
        selectedTemplate,
        email,
      },
    });
  },
});

client.defineJob({
  id: "chatgpt-meme-text",
  name: "ChatGPT Meme Text",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "gpt.text",
  }),
  run: async (payload, io, ctx) => {
    const { userPrompt, sysPrompt, selectedTemplate, email } = payload;
    await io.logger.info("✨ Talking to ChatGPT");
    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: sysPrompt },
      { role: "user", content: userPrompt },
    ];
    const functions: ChatCompletionCreateParams.Function[] = [
      {
        name: "generateMemeImage",
        description:
            "Generate meme via the imgflip API based on the given idea",
        parameters: {
          type: "object",
          properties: {
            text0: {
              type: "string",
              description: "The text for the top caption of the meme",
            },
            text1: {
              type: "string",
              description: "The text for the bottom caption of the meme",
            },
          },
          required: ["templateName", "text0", "text1"]
        },
      },
    ];

    const response = await openai.chat.completions.create( {
      model: "gpt-3.5-turbo",
      messages,
      functions,
      function_call: "auto",
    });

    await io.logger.info( `Response from openai: ${response}`);

    const responseMessage = response.choices[0];
    const inputString = responseMessage.message.content;

    const texts = inputString ? extractSentencesInQuotes(inputString) : [];

    await io.logger.info("✨ Yay! You've gotten a text for your meme ✨", {
      texts,
    });

    await io.sendEvent("caption-save-meme", {
      name: "caption.save.meme",
      payload: {
        texts,
        selectedTemplate,
        email,
      },
    });
  },
});

client.defineJob({
  id: "caption-save-meme",
  name: "Caption and Save Meme",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "caption.save.meme",
  }),
  run: async (payload, io, ctx) => {
    const { texts, selectedTemplate, email } = payload;

    await io.logger.info("Received meme template and texts 🎉");

    const formatData = new URLSearchParams({
      template_id: selectedTemplate.id,
      username: process.env.IMGFLIP_USERNAME || '',
      password: process.env.IMGFLIP_PW || '',
      text0: texts[0],
      text1: texts[1],
    });

    const captionedMeme = await io.runTask("caption-meme", async () => {
      const response = await fetch("https://api.imgflip.com/caption_image", {
        method: "POST",
        body: formatData.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return await response.json();
    });

    await io.logger.info("✨ Yay! Your meme has been captioned! ✨", {
      captionedMeme,
    });

    const {data, error} = await supabase.from("meme").insert([{
      id: selectedTemplate.id,
      name: selectedTemplate.name,
      url: captionedMeme.data.url,
    }]).select();

    await io.logger.info("Row from a supabase", {
      data, error
    })

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000'

    await io.sendEvent("email-meme", {
      name: "send.meme",
      payload: {
        email,
        url: `${clientUrl}/chatGPT/${selectedTemplate.id}`,
      },
    });

    await io.logger.info(
        "✨ Yay! Your meme has been saved to the database! ✨"
    );
  },
});

client.defineJob({
  id: "send-meme",
  name: "Send Meme",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "send.meme",
  }),
  run: async (payload, io, ctx) => {
    const { url, email } = payload;

    await io.logger.info("Sending meme to the user 🎉");

    await resend.sendEmail({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Your meme is ready!",
      text: `Hey there, Your meme is ready.\n Access it here: ${url}`,
    });

    await io.logger.info("✨ Yay! Your meme has been emailed to the user! ✨");
  },
});
