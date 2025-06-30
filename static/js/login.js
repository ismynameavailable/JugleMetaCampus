$(document).ready(function () {
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
  $("#login-form").submit(function(e){
    e.preventDefault();

    const nick = $("#nick").val();
    const pw = $("#pw").val();

    $.ajax({
      type: "POST",
      url: "/join",
      data: { nick:nick, pw:pw },
      success: function(response) {
        if (response.result === "success") {
          window.location.href = "/index";
        } else {
          alert(response.err);
        }
      }
    })
  })
});
