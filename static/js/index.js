$(document).ready(function () {
  initCanvas(currentMap, () => {
    initEventListeners();
    draw(); // character.js의 draw 함수
  });

  function quest_start() {
    let title, description, temp_html;
    $.ajax({
      type: "POST",
      url: "/api/quest",
      data: {},
      success: function (response) {
        if (response["result"] === "success") {
          console.log(response);
          const { title, description } = response;
          document.getElementById("quest-title").innerHTML = title;
        }
      },
    });
  }
  quest_start();
});
