"use client";

import { useState } from "react";
import { continueConversation, Message } from "./actions";
import { readStreamableValue } from "ai/rsc";
import InputField from "@/app/components/InputField/InputField";

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);

  const handleSendMessage = async (userMessage: string) => {
    const { messages, newMessage } = await continueConversation([
      ...conversation,
      { role: "user", content: userMessage },
    ]);

    let textContent = "";

    for await (const delta of readStreamableValue(newMessage)) {
      textContent = `${textContent}${delta}`;

      setConversation([
        ...messages,
        { role: "assistant", content: textContent },
      ]);
    }
  };

  return (
    <div>
      <div>
        {conversation.map((message, index) => (
          <div key={index}>
            {message.role}: {message.content}
          </div>
        ))}
      </div>

      <InputField onSendMessage={handleSendMessage} />
    </div>
  );
}
