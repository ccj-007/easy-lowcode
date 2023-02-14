function throttle(func: Function, wait: number = 1000) {
  var context, args;
  var previous = 0;
  return function () {
    var now = +new Date();
    context = this;
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}

const utils = {
  throttle
}

export default utils