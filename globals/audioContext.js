let audioContext;
export default function getAudioContext() {
  if (audioContext) {
    return audioContext;
  }
  audioContext = new AudioContext();
  return audioContext;
}
