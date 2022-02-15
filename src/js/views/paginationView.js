import { View } from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.pagination__btn');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curePage = this._data.page;
    const numPage = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );

    //page one and others
    if (curePage === 1 && numPage > 1) {
      return `<button data-goto = "${
        curePage + 1
      }" class="btn--inline pagination__btn--next pagination__btn">
      <span>Page ${curePage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> 
      `;
    }

    //last page
    if (curePage === numPage && numPage > 1) {
      return `
        <button data-goto = "${
          curePage - 1
        }" class="btn--inline pagination__btn--prev pagination__btn">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curePage - 1}</span>
        </button>
      `;
    }

    // other pages
    if (curePage < numPage) {
      return `
      <button data-goto = "${
        curePage - 1
      }" class="btn--inline pagination__btn--prev pagination__btn">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curePage - 1}</span>
    </button>
    <button data-goto = "${
      curePage + 1
    }" class="btn--inline pagination__btn--next pagination__btn">
      <span>Page ${curePage + 1}</span>
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
