import { useState } from "react";
import { ReactMic } from "react-mic";

export default function HomePage() {
  const [showRecorder, setShowRecorder] = useState(false);
  const [record, setRecord] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [detectedEmotion, setDetectedEmotion] = useState("");

  const handleStartRecording = () => {
    setRecord(true);
  };

  const handleStopRecording = () => {
    setRecord(false);
  };

  const handleOnStop = (recordedBlob) => {
    console.log("Recorded blob:", recordedBlob);
    setAudioFile(recordedBlob.blob);
    // Send recordedBlob.blob to backend
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setAudioFile(file);
      // Send file to backend
    } else {
      alert("File must be less than 5MB.");
    }
  };

return (
    <div className="min-h-screen bg-[#070e1a] text-gray-100 flex flex-col p-0 m-0">
        <header className="w-full bg-[#10182a] flex justify-left items-center px-10 py-4 shadow-md">
            <span className="text-lg font-semibold flex items-center gap-2">
                <span className="text-[#5eb3f7] font-bold"> VBDRS </span>
            </span>
        </header>

        <main className="w-full max-w-4xl mx-auto text-center p-4 md:p-8">
            <h1 className="text-xl md:text-2xl font-bold mt-6 text-[#5eb3f7]">
                VOICE-BASED DANGER RECOGNITION SYSTEM
            </h1>
            <p className="italic text-xs md:text-sm mt-2 px-2 text-gray-400">
                Voice-Based Danger Recognition System is a Web System created for the study{" "}
                <q>
                    An Enhancement of Gated Recurrent Unit (GRU) for Speech Emotion Recognition in the
                    Implementation of Voice-Based Danger Recognition System
                </q>
                .<br />
                This detects 6 classified emotions namely: Sad, Happy, Anger, Disgust, Fear and
                Neutral and correlates the 'Fear' emotion to the state of danger.
            </p>

            {!showRecorder ? (
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10">
                    <button
                        className="w-60 h-40 bg-[#10182a] flex flex-col items-center justify-center rounded-lg shadow hover:bg-[#17213a] transition"
                        onClick={() => setShowRecorder(true)}
                    >
                        <span className="text-3xl">🎤</span>
                        <span className="mt-2 font-medium text-sm">Record an Audio</span>
                        <span className="text-xs italic mt-1">Max. of 4 seconds</span>
                    </button>

                    <label className="w-60 h-40 bg-[#10182a] flex flex-col items-center justify-center rounded-lg shadow hover:bg-[#17213a] transition cursor-pointer">
                        <input
                            type="file"
                            accept="audio/*"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                        <span className="text-3xl">⬆️</span>
                        <span className="mt-2 font-medium text-sm">Upload a File</span>
                        <span className="text-xs italic mt-1">Max. of 5 MB</span>
                    </label>
                </div>
            ) : (
                <div className="mt-10 w-full flex flex-col items-center">
                    <div className="w-full max-w-2xl h-40 bg-[#10182a] rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-[#5eb3f7] italic text-sm">[ Spectrogram Placeholder ]</span>
                    </div>

                    <button
                        className="bg-[#17213a] p-4 rounded-full text-xl hover:bg-[#22305a] transition"
                        onClick={record ? handleStopRecording : handleStartRecording}
                    >
                        🎤
                    </button>
                    <span className="mt-2 text-xs italic text-gray-400">Max. of 4 seconds</span>

                    <ReactMic
                        record={record}
                        className="hidden"
                        onStop={handleOnStop}
                        mimeType="audio/webm"
                        strokeColor="#5eb3f7"
                        backgroundColor="#070e1a"
                    />
                </div>
            )}

            <div className="mt-10 bg-[#10182a] rounded-lg p-6 text-center w-full max-w-3xl mx-auto">
                <p className="italic text-sm text-gray-400">Detected Emotion:</p>
                <p className="text-lg font-semibold mt-2 text-[#5eb3f7]">Result: {detectedEmotion || ""}</p>
            </div>

            <p className="mt-10 italic text-base text-[#5eb3f7]">Prediction Table</p>
            <div className="animate-bounce mt-2 text-lg">⬇️</div>
        </main>
    </div>
);
}
