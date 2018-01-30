export default class File {
  constructor({ accept, handleChange, $parent }) {
    this.handleChange = handleChange;
    this.accept = accept;
    this.$parent = $parent;
    this.initDOM();
  }

  disable() {
    this.$parent.classList.add('disabled');
  }

  enable() {
    this.$parent.classList.remove('disabled');
  }

  initDOM() {
    this.$container = document.createElement('div');
    this.$container.className = 'file-upload';
    this.$parent.appendChild(this.$container);

    this.$file = document.createElement('input');
    this.$file.setAttribute('type', 'file');
    this.$file.setAttribute('accept', this.accept);
    this.$file.setAttribute('required', '');
    this.$container.appendChild(this.$file);

    this.$container.addEventListener('dragover', () =>
      this.$container.classList.add('is-active')
    );
    this.$container.addEventListener('dragleave', () =>
      this.$container.classList.remove('is-active')
    );

    this.$file.addEventListener('change', () => {
      this.$parent.classList.remove('is-active');
      this.$container.classList.remove('is-active');
      if (this.$file.files && this.$file.files[0]) {
        let reader = new FileReader(),
          accept = this.accept.replace(/\*/, ''),
          file = this.$file.files[0];
        reader.onload = ({ target }) => {
          this.$file.value = '';
        };
        if (file && file.type.match(accept)) reader.readAsDataURL(file);
        else this.$file.value = '';
      } else {
        this.$file.value = '';
      }
    });
  }
}
