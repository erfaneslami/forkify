import icons from '../../img/icons.svg';

export class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this.#clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkUp);

    const newElement = Array.from(newDom.querySelectorAll('*'));
    const cureElement = Array.from(this._parentElement.querySelectorAll('*'));

    newElement.forEach((newEl, i) => {
      const cureEl = cureElement[i];

      // check if the text content is changed and also only the el that has textContent
      if (
        !newEl.isEqualNode(cureEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        cureEl.textContent = newEl.textContent;
      }

      // update the attributes
      if (!newEl.isEqualNode(cureEl)) {
        Array.from(newEl.attributes).forEach(attribute =>
          cureEl.setAttribute(attribute.name, attribute.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this.#clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }

  #clear() {
    this._parentElement.innerHTML = '';
  }

  renderError(message = this._errorMessage) {
    const markup = `      
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
  </div>`;

    this.#clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }
}
