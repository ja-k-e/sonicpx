export default class File {
  constructor({ accept, handleChange, $parent }) {
    this.handleChange = handleChange;
    this.initDOM(accept, $parent);
  }

  initDOM(accept, $parent) {
    this.$container = document.createElement('div');
    this.$container.className = 'file-upload';
    $parent.appendChild(this.$container);

    this.$file = document.createElement('input');
    this.$file.setAttribute('type', 'file');
    this.$file.setAttribute('accept', accept);
    this.$container.appendChild(this.$file);

    this.$container.addEventListener('dragover', () =>
      this.$container.classList.add('is-active')
    );
    this.$container.addEventListener('dragleave', () =>
      this.$container.classList.remove('is-active')
    );

    this.$file.addEventListener('change', () => {
      this.$container.classList.remove('is-active');
      if (this.$file.files && this.$file.files[0]) {
        let reader = new FileReader();
        reader.onload = ({ target }) => {
          this.handleChange(target, this.$file.files[0]);
          this.$file.value = '';
        };
        reader.readAsDataURL(this.$file.files[0]);
      }
    });
  }
}
