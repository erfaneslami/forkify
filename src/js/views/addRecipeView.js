import { View } from './View';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _closeBtn = document.querySelector('.btn--close-modal');
  _openBtn = document.querySelector('.nav__btn--add-recipe');

  constructor() {
    super();

    this._addHandlerOpen();
    this._addHandlerClose();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerOpen() {
    this._openBtn.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerClose() {
    this._closeBtn.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerAddRecipe(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const dataArr = [...new FormData(this._parentElement)];
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }
}

export default new addRecipeView();
