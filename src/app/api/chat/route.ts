import { openai } from '@ai-sdk/openai';
import { streamText, Message } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, attachments }: { messages: Message[], attachments?: { url: string; contentType: string; name?: string }[] } = await req.json();

  // For image messages, we'll use GPT-4 Vision
  const hasImages = attachments?.some(attachment => 
    attachment.contentType.startsWith('image/')
  );

  const lastMessage = messages[messages.length - 1];
  let messageText = lastMessage.content;

  // If there are images, append their URLs to the message text
  if (hasImages) {
    const imageUrls = attachments
      ?.filter(attachment => attachment.contentType.startsWith('image/'))
      .map(attachment => attachment.url)
      .join('\n');
    
    messageText = `${messageText}\n\nImages attached:\n${imageUrls}`;
  }

  const updatedMessages = [
    ...messages.slice(0, -1),
    {
      ...lastMessage,
      content: messageText,
    },
  ];

  const result = streamText({
    model: hasImages ? openai('gpt-4-vision-preview') : openai('gpt-4'),
    messages: updatedMessages,
    maxTokens: 2048,
  });

  return result.toDataStreamResponse();
}