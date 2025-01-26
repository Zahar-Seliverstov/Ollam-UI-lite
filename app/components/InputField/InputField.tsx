"use client";

import { useState, useRef } from "react";
import styles from './InputField.module.css';

interface InputFieldProps {
  onSendMessage: (message: string) => void;
}

export default function InputField({ onSendMessage }: InputFieldProps) {
  const [input, setInput] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Функция для автоматической подгонки высоты textarea
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Сбрасываем высоту
      const maxHeight = Math.min(window.innerHeight * 0.5, 400); // Максимальная высота
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`; // Устанавливаем новую высоту
    }
  };

  return (
    <div className={styles.inputPanelContainer}>
      <textarea
        ref={textareaRef} // Привязываем реф к textarea
        className={styles.inputField}
        rows={1} // Минимальное количество строк
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
          adjustHeight(); // Вызываем функцию для подгонки высоты
        }}
        onInput={adjustHeight} // Для мгновенной реакции на ввод
        placeholder="Type your message here..."
      />
      <div>
        <button
          className={styles.sendUserMessage}
          onClick={() => {
            if (input.trim() !== "") {
              onSendMessage(input.trim());
              setInput("");
              if (textareaRef.current) {
                textareaRef.current.style.height = "auto"; // Сбрасываем высоту после отправки
              }
            }
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
