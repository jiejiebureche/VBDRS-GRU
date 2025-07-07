import numpy as np
import librosa
from pydub import AudioSegment
import tempfile
import os

def extract_features(audio_file):
    try:
        from pydub import AudioSegment
        import librosa
        import numpy as np
        import tempfile, os

        # Convert to wav and save to temp
        audio = AudioSegment.from_file(audio_file)
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
            temp_path = tmp.name
        audio.export(temp_path, format="wav")

        # Load with librosa
        y, sr = librosa.load(temp_path, sr=16000)
        os.remove(temp_path)

        # Extract only 1 MFCC (to match shape (40, 1))
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=1).T  # shape: (T, 1)

        # Trim or pad to exactly 40 timesteps
        desired_length = 40
        if mfccs.shape[0] > desired_length:
            mfccs = mfccs[:desired_length, :]
        else:
            mfccs = np.pad(mfccs, ((0, desired_length - mfccs.shape[0]), (0, 0)), mode='constant')

        return mfccs.astype(np.float32)

    except Exception as e:
        print("Feature extraction error:", e)
        return None

