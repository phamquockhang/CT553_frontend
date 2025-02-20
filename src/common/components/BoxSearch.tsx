import { AudioOutlined, CloseOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const BoxSearch: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Trình duyệt của bạn không hỗ trợ tìm kiếm bằng giọng nói.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "vi-VN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: SpeechRecognitionResult) => {
      const speechResult = (event as any).results[0][0].transcript;
      setTranscript(speechResult);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setError("Có lỗi xảy ra trong quá trình nhận diện giọng nói.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTranscript(value);
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <>
      <Input
        placeholder="Tìm kiếm..."
        className="w-80 p-2 focus:outline-none focus:ring-0"
        value={transcript}
        onChange={handleInputChange}
        suffix={
          isListening ? (
            <CloseOutlined
              className="cursor-pointer text-xl"
              onClick={stopListening}
            />
          ) : (
            <AudioOutlined
              className="cursor-pointer text-xl"
              onClick={startListening}
            />
          )
        }
      />

      {error &&
        message.error({
          content: error,
          duration: 5,
          key: "speech-error",
        })}
    </>
  );
};

export default BoxSearch;
