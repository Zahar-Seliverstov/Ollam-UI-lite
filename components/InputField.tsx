"use client";

import { useState } from "react";

interface InputFieldProps {
  onSendMessage: (message: string) => void;
}

export default function InputField({ onSendMessage }: InputFieldProps) {
  const [input, setInput] = useState<string>("");

  return (
    <div>
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={4}
        placeholder="Type your message here..."
        className="border rounded-md w-full p-2 text-black"
      />
      <div>
        <button
          onClick={() => {

          }}
        >
          <img src="" />
        </button>
        <button
          onClick={() => {
            if (input.trim() !== "") {
              onSendMessage(input.trim());
              setInput("");
            }
          }}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
