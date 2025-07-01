$(document).ready(function () {
  let currentLine = 0;
  let dialogues = [];
  let questId = 0;

  function quest_start(questId) {
    // let title, description, temp_html;
    $.ajax({
      type: "POST",
      url: "/api/quest",
      data: { quest_id: questId },
      success: function (response) {
        if (response["result"] === "success") {
          // console.log("quest");
          console.log(response);
          const { title, description } = response;
          document.getElementById("quest-title").innerHTML = title;
          document.getElementById("quest-content").innerHTML = description;

        }
      }
    });
  };

  function quest_clear(questId) {

  }

  $(".dialogue").css("display","none");
  
  function dialogue(id) {
    $.ajax({
      type: "POST",
      url: "/api/quest",
      data: { quest_id: id },
      success: function (response) {
        if (response["result"] === "success") {
          dialogues = response.dialogues;
          questId = id;
          currentLine = 0;
          $(".dialogue").slideToggle(500)
          dialogue_continue();

        }
      }
    });
  }

  function dialogue_continue() {
    if (currentLine < dialogues.length) {
      document.getElementById("dialogue-content").innerHTML = dialogues[currentLine]["text"];
      currentLine++;
    }
    else {
      document.getElementById("dialogue-content").innerHTML = " ";
      $(".dialogue").slideToggle(500)
      quest_start(questId + 1); // 다음퀘 실행
      // console.log("Ss");
    }
  }

  document.getElementById("quest-btn0").addEventListener('click', function () {
    dialogue(0);
    // quest_start(0);
  });
  document.getElementById("quest-btn1").addEventListener('click', function () {
    dialogue(1);
    // quest_start(1);
  });
  document.getElementById("quest-btn2").addEventListener('click', function () {
    dialogue(2);
    // quest_start(2);
  });
  document.getElementById("quest-btn3").addEventListener('click', function () {
    dialogue(3);
    // quest_start(3);
  });
  quest_start(0);
  document.getElementById("continue-btn").addEventListener("click", dialogue_continue);
});