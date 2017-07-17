export const debounce = f => {
  let state = null;
  let COOLDOWN = 1;
  return () => {
    if (state) return;
    f.apply(this, arguments);
    state = COOLDOWN;
    setTimeout(function() { state = null }, 500);
  };
};
