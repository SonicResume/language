import { useState } from "react";
import { callAI, uploadFile } from "../lib/api";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");

  const handleAI = async () => {
    const res = await callAI(text);
    setResult(res.result);
  };

  const handleUpload = async () => {
    if (!file) return;
    const res = await uploadFile(file);
    setResult(res.analysis || res.result);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">NOAH Analyzer Dashboard</h1>

      {/* TEXT AI */}
      <div>
        <textarea
          className="w-full border p-2"
          placeholder="Enter resume text..."
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAI} className="bg-black text-white px-4 py-2 mt-2">
          Analyze Text
        </button>
      </div>

      {/* FILE UPLOAD */}
      <div>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 ml-2">
          Upload Resume
        </button>
      </div>

      {/* OUTPUT */}
      <div className="p-4 border mt-4">
        <h2 className="font-bold">Result:</h2>
        <pre>{result}</pre>
      </div>
    </div>
  );
}