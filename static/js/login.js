$(document).ready(function () {
  csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  $(".form-group i").on("click", function () {
    $("input").toggleClass("active");
    if ($("input").hasClass("active")) {
      $(this)
        .attr("class", "fa fa-eye-slash fa-lg")
        .prev("input")
        .attr("type", "text");
    } else {
      $(this)
        .attr("class", "fa fa-eye fa-lg")
        .prev("input")
        .attr("type", "password");
    }
  });
  $("#login-form").submit(function (e) {
    e.preventDefault();

    const nick = $("#nick").val();
    const pw = $("#pw").val();

    $.ajax({
      type: "POST",
      url: "/join",
      data: { nick: nick, pw: pw },
      headers: {
        'X-CSRFToken': csrfToken
      },
      success: function (response) {
        if (response.result === "success") {
          window.location.href = "/";
        } else {
          alert(response.err);
        }
      },
    });
  });
});
