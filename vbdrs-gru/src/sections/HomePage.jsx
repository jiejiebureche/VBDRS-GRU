import { useState } from "react";
import { ReactMic } from "react-mic";
import { Mic, Upload, ShieldAlert, ChevronDown } from "lucide-react";

export default function HomePage() {
  const [showRecorder, setShowRecorder] = useState(false);
  const [record, setRecord] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [detectedEmotion, setDetectedEmotion] = useState("");

  const handleStartRecording = () => setRecord(true);
  const handleStopRecording = () => setRecord(false);

  const handleOnStop = (recordedBlob) => {
    setAudioFile(recordedBlob.blob);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setAudioFile(file);
    } else {
      alert("File must be less than 5MB.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-0 m-0">
      <header className="w-full bg-gray-800 flex justify-left items-center px-4 py-4 shadow-md">
        <span className="text-xl font-semibold flex items-center gap-2">
          <ShieldAlert className="text-red-400 w-6 h-6" />
          VBDRS
        </span>
      </header>

      <main className="w-full max-w-4xl mx-auto text-center p-4 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold mt-6">
          VOICE-BASED DANGER RECOGNITION SYSTEM
        </h1>
        <p className="italic text-xs md:text-sm mt-2 px-2 text-gray-300 leading-relaxed">
          Voice-Based Danger Recognition System is a Web System created for the study{" "}
          <q>
            An Enhancement of Gated Recurrent Unit (GRU) for Speech Emotion Recognition in the
            Implementation of Voice-Based Danger Recognition System
          </q>
          . This detects 6 classified emotions namely: Sad, Happy, Anger, Disgust, Fear, and
          Neutral and correlates the 'Fear' emotion to the state of danger.
        </p>

        {!showRecorder ? (
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10">
            <button
              className="w-60 h-40 bg-red-500 text-white flex flex-col items-center justify-center rounded-lg shadow hover:bg-red-600 transition"
              onClick={() => setShowRecorder(true)}
            >
              <Mic className="w-10 h-10 text-gray-900" />
              <span className="mt-2 font-medium text-gray-900">Record an Audio</span>
              <span className="text-sm italic mt-1 text-gray-500">Max. of 4 seconds</span>
            </button>

            <label className="w-60 h-40 bg-gray-800 text-white flex flex-col items-center justify-center rounded-lg shadow hover:bg-gray-700 transition cursor-pointer">
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Upload className="w-10 h-10" />
              <span className="mt-2 font-medium">Upload a File</span>
              <span className="text-sm italic mt-1 text-gray-400">Max. of 5 MB</span>
            </label>
          </div>
        ) : (
          <div className="mt-10 w-full flex flex-col items-center">
            <div className="w-full max-w-2xl h-40 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400 italic">[ Spectrogram Placeholder ]</span>
            </div>

            <button
              className="bg-gray-700 p-4 rounded-full text-white hover:bg-gray-600 transition"
              onClick={record ? handleStopRecording : handleStartRecording}
            >
              <Mic className="w-6 h-6 text-gray-900" />
            </button>
            <span className="mt-2 text-sm italic text-gray-400">Max. of 4 seconds</span>

            <ReactMic
              record={record}
              className="hidden"
              onStop={handleOnStop}
              mimeType="audio/webm"
              strokeColor="#ffffff"
              backgroundColor="#1f2937"
            />
          </div>
        )}

        <div className="mt-10 bg-gray-800 rounded-lg p-6 text-center w-full max-w-3xl mx-auto">
          <p className="italic text-gray-300">Detected Emotion:</p>
          <p className="text-2xl font-semibold mt-2 text-white">
            Result: {detectedEmotion || ""}
          </p>
        </div>

        <p className="mt-10 italic text-lg text-gray-300">Prediction Table</p>
        <div className="mt-2 text-white animate-bounce">
          <ChevronDown className="w-8 h-8 mx-auto" />
        </div>
      </main>
    </div>
  );
}
