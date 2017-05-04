/* global document, event, window, classie, newModel, newRenderer, modalModule */
function showSearchResult(criterion, value) {
  const news = newModel.getNews(0, newModel.getLength(), criterion, value);
  newRenderer.insertNewsInDOM(news);
}

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

// modalModule.notice("qq", "","","");
function search(state, searchByCriterion, criterionSearch) {
  // console.log(state);
  const form = document.forms.searchform;
  if (!state) {
    form.onsubmit = function (event) {
      event.preventDefault();
      // //console.log("qq");
      form.searchin.value = '';
      form.searchin.placeholder = 'please select a criterion';
      // return;
      // modalModule.notice("qq");
    };
  } else {
    form.onsubmit = function (event) {
      event.preventDefault();
      const searchIn = document.forms.searchform.searchin;
      // var authorsArray = newModel.getAuthors();
      // var news;
      if (!searchIn.value) {
        newRenderer.removeNewsFromDom();
        newRenderer.insertNewsInDOM(newModel.getNews());
      } else {
        let occurrenceArray;
        if (criterionSearch) {
          // console.log(searchByCriterion, criterionSearch);
          occurrenceArray = newModel.searchNews(
            searchIn.value,
            newModel.getNews(),
            criterionSearch,
          );
          // console.log(occurrenceArray);
          newRenderer.removeNewsFromDom();
          occurrenceArray.forEach((el) => {
            // console.log(criterionSearch, el);
            showSearchResult(criterionSearch, el);
          });
        } else {
          newRenderer.removeNewsFromDom();
          newRenderer.insertNewsInDOM();
        }
      }
      searchIn.value = '';
      // return;
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
