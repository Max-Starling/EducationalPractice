/* global document, event, window*/
(function (window) {
  function classReg(className) {
    return new RegExp(`(^|\\s+)${className}(\\s+|$)`);
  }
  let addClass;
  let removeClass;
  if ('classList' in document.documentElement) {
    addClass = function (elem, c) {
      elem.classList.add(c);
    };
    removeClass = function (elem, c) {
      elem.classList.remove(c);
    };
  } else {
    addClass = function (elem, c) {
      if (!hasClass(elem, c)) {
        elem.className = `${elem.className} ${c}`;
      }
    };
    removeClass = function (elem, c) {
      elem.className = elem.className.replace(classReg(c), ' ');
    };
  }
  const classie = {
    // full names
    addClass,
    removeClass,
    // short names
    add: addClass,
    remove: removeClass,
  };
  window.classie = classie;
}(window));
