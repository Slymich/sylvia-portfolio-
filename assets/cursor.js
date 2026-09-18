// Custom animated cursor — a dot that snaps to the pointer and a ring that trails
// it with smooth easing. Skips entirely on touch devices.
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  var ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  var mouseX = -100, mouseY = -100;
  var ringX = -100, ringY = -100;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function tick() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  var interactiveSelector = 'a, button, .cs-card, .btn, .li-link';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(interactiveSelector)) ring.classList.add('is-active');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(interactiveSelector)) ring.classList.remove('is-active');
  });
})();
