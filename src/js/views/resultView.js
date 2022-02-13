import { View } from './View';
import previewView from './previewView';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipes found for your query! Please try again ;)`;

  _generateMarkup() {
    return this._data.map(recipe => previewView.render(recipe, false));
  }
}

export default new ResultView();
