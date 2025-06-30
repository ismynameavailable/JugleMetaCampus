$(document).ready(function () {
  initCanvas(currentMap, () => {
    initEventListeners();
    draw(); // character.js의 draw 함수
  });
});
