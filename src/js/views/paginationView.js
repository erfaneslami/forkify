import { View } from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curePage = this._data.page;
    const numPage = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );

    console.log(curePage, numPage);

    //page one and others
    if (curePage === 1 && numPage > 1) {
      return `<button class="btn--inline pagination__btn--next">
      <span>Page 3</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> 
      `;
    }

    //last page
    if (curePage === numPage && numPage > 1) {
      return `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page 1</span>
        </button>
      `;
    }

    // other pages
    if (curePage < numPage) {
      return `
      <button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page 1</span>
    </button>
    <button class="btn--inline pagination__btn--next">
      <span>Page 3</span>
        <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button> 
      `;
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
