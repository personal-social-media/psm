jQuery.fn.ready = (cb) => {
  document.addEventListener("turbo:load", cb);
}