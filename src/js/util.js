// function hasClass(el, className) {
//   var ret = new RegExp('(^|\\s)' + className + '(\\s|$)');
//   return ret.test(el.className);
// }

// function addClass(el, className) {
//   if (hasClass(el, className)) {
//     return;
//   }

//   var newClass = el.className.split(' ');
//   newClass.push(className);
//   el.className = newClass.join(' ');
// }

(function() {
  var util = {};

  util.hasClass = function(el, className) {
    var ret = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return ret.test(el.className);
  }

  util.addClass = function(el, className) {
    if (util.hasClass(el, className)) {
      return;
    }
  
    var newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
  }

  util.removeClass = function (el, className) {
    if (!util.hasClass(el, className)) {
      return;
    }
    var newClass = el.className.split(' ');
    var removeIndex = newClass.indexOf(className);
    if (removeIndex > -1) {
      newClass.splice(removeIndex, 1);
    }
    el.className = newClass.join(' ');
  }
  window.util = util;
})();
