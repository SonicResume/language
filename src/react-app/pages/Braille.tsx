import { useState } from "react";
import { toBraille } from "@/utils/braille";

export default function Braille() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const convert = () => {
    setOutput(toBraille(text));
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-2xl font-bold text-green-700 mb-4">
          🔵 Braille Converter
        </h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text..."
          className="w-full h-32 border p-3 rounded mb-3"
        />

        <button
          onClick={convert}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Convert
        </button>

        <div className="mt-4 p-3 border rounded min-h-[80px] text-xl tracking-widest">
          {output}
        </div>
      </div>
    </div>
  );
}