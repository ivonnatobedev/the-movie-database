export function debounce(f) {
  let state = null;
  let COOLDOWN = 1;
  return function() {
    if (state) return;
    f.apply(this, arguments);
    state = COOLDOWN;
    setTimeout(function() { state = null }, 500);
  }
}
