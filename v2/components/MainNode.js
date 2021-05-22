/**
 * @class MainNode
 * @extends AudioWorkletNode
 */
export default class MainNode extends AudioWorkletNode {
  constructor(context) {
    super(context, "main-processor");
    this.port.onmessage = this.handleMessage.bind(this);
  }

  handleMessage(event) {
    if (!this.logged) {
      console.log(event.data);
      this.logged = true;
    }
  }
}
