/* global document, event, window, classie,
newsService, newModel, newRenderer, newsModal */

const searchBlock = document.querySelector('.search-block');
const criterionSearchArray = [];

criterionSearchArray.push({
  checkbox: searchBlock.querySelectorAll('.check')[0],
  criterion: 'title',
});

criterionSearchArray.push({
  checkbox: searchBlock.querySelectorAll('.check')[1],
  criterion: 'author',
});

criterionSearchArray.push({
  checkbox: searchBlock.querySelectorAll('.check')[2],
  criterion: 'date',
});

function search(state, searchByCriterion, criterionSearch) {
  const form = document.forms.searchform;
  if (!state) {
    form.onsubmit = function (event) {
      event.preventDefault();
      form.searchin.value = '';
      form.searchin.placeholder = 'please select a criterion';
    };
  } else {
    form.onsubmit = (event) => {
      event.preventDefault();
      const searchIn = document.forms.searchform.searchin;
      if (!searchIn.value) {
        newRenderer.loadNews();
      } else if (criterionSearch) {
        console.log(criterionSearch, searchIn.value);
        newRenderer.loadNews('search', criterionSearch, searchIn.value);
      }
      searchIn.value = '';
    };
  }
}
function startSearch() {
  criterionSearchArray.forEach((searchByCriterion) => {
    let state = false;
    searchByCriterion.checkbox.addEventListener('click', () => {
      document.forms.searchform.searchin.placeholder = 'search';
      if (searchByCriterion.checkbox.value === 'off') {
        searchByCriterion.checkbox.value = 'on';
        criterionSearchArray.forEach((item, i, criterionSearchArray) => {
          if (item.checkbox !== searchByCriterion.checkbox) {
            item.checkbox.checked = false;
            item.checkbox.value = 'off';
          }
        });
        state = true;
        search(state, searchByCriterion.checkbox, searchByCriterion.criterion);
      } else {
        state = false;
        search(state);
        searchByCriterion.checkbox.value = 'off';
      }
    });
    search(state);
  });
}
startSearch();
