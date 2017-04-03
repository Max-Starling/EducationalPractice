/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 */
( function(window) {
  'use strict';
  function classReg( className ) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }
  var addClass, removeClass;
  if ( 'classList' in document.documentElement ) {
    addClass = function( elem, c ) {
      elem.classList.add( c );
    };
    removeClass = function( elem, c ) {
      elem.classList.remove( c );
    };
  }
  else {
    addClass = function( elem, c ) {
      if ( !hasClass( elem, c ) ) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function( elem, c ) {
      elem.className = elem.className.replace( classReg( c ), ' ' );
    };
  }
  var classie = {
    // full names
    addClass: addClass,
    removeClass: removeClass,
    // short names
    add: addClass,
    remove: removeClass,
  };
  window.classie = classie;
})( window );
