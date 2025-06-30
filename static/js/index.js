$(document).ready(function () {
  let selectedTd = null;
  document.querySelector(".inventory").addEventListener("click", function (e) {
    // 클릭된 게 td인지 확인
    if (e.target.tagName !== "TD") return;

    // 부모 tr 요소를 찾음
    const tr = e.target.parentElement;

    // 첫 번째 tr이면 무시
    const isFirstTr = tr === tr.parentElement.querySelector("tr");
    if (isFirstTr) return;

    // console.log(e.target.tagName, e.target);

    if (selectedTd === e.target) {
      $(e.target).css("outline", "none");
      selectedTd = null;
      return;
    }

    $("td").css("outline", "none");
    $("tr:first-child td").css("outline", "none");
    $(e.target).css("outline", "solid 3px saddlebrown");
    selectedTd = e.target;
  });
});
