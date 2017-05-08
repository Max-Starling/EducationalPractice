/* global document, event, window, classie, newModel, newRenderer, newsModal*/
const criterionSortArray = [];
function sort(sortByCriterion, criterion) {
  sortByCriterion.removeEventListener('click', {});
  sortByCriterion.addEventListener('click', () => {
    if (sortByCriterion.value === 'off') {
      sortByCriterion.value = 'on';
      criterionSortArray.forEach((item, i, criterionSortArray) => {
        if (item !== sortByCriterion) {
          item.checked = false;
          item.value = 'off';
        }
      });
      newRenderer.removeNewsFromDom();
      const news = newModel.getNews();
      newModel.sortNews(news, criterion);
      newRenderer.insertNewsInDOM(news);
    } else {
      sortByCriterion.value = 'off';
      newRenderer.removeNewsFromDom();
      newRenderer.insertNewsInDOM(newModel.getNews());
    }
  });
}
const sortBlock = document.querySelector('.sort-block');

const sortByTitle = sortBlock.querySelectorAll('.check')[0];
criterionSortArray.push(sortByTitle);
sort(sortByTitle, 'title');

const sortByAuthor = sortBlock.querySelectorAll('.check')[1];
sort(sortByAuthor, 'author');
criterionSortArray.push(sortByAuthor);

const sortByTextsize = sortBlock.querySelectorAll('.check')[2];
sort(sortByTextsize, 'textsize');
criterionSortArray.push(sortByTextsize);
