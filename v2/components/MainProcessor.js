/**
 * @class MainProcessor
 * @extends AudioWorkletProcessor
 */
class MainProcessor extends AudioWorkletProcessor {
  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];

    this.port.postMessage(inputs);
    for (let channel = 0; channel < output.length; ++channel) {
      output[channel].set(input[channel]);
    }

    return true;
  }
}

registerProcessor("main-processor", MainProcessor);
