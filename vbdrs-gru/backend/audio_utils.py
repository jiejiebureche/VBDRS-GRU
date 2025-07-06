import numpy as np
import librosa
from pydub import AudioSegment

def convert_webm_to_wav(webm_path, wav_path):
    audio = AudioSegment.from_file(webm_path, format="webm")
    audio = audio.set_channels(1).set_frame_rate(22050)
    audio.export(wav_path, format="wav")

def extract_features(file_path):
    y, sr = librosa.load(file_path, sr=22050)
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
    mfccs = mfccs.T[:40]  # Use only first 40 frames or pad
    if mfccs.shape[0] < 40:
        pad_width = 40 - mfccs.shape[0]
        mfccs = np.pad(mfccs, ((0, pad_width), (0, 0)))
    mfccs = np.expand_dims(mfccs, axis=0)
    return mfccs

def process_audio(webm_path):
    wav_path = webm_path.replace(".webm", ".wav")
    convert_webm_to_wav(webm_path, wav_path)
    features = extract_features(wav_path)
    return features