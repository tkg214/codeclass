$(function() {
    $.each($('.imac'), function(i, code) {
        var max = 5,
            min = 1,
            rand = (Math.floor(Math.random() * max) + min),
            colors = ["#E9484E", "#19B98B", "#18B0F1", "#FFCA4A"],
            randcolor = Math.floor(Math.random()*colors.length);

      $(code).css({
        'width': rand + "em",
        "background-color": colors[randcolor]
      });
    });

  $('button').click(function () {
    $('.screen').toggleClass('box-rotate');

  });
});
