$(function() {
  function setHeight(){
    const h = $(window).height();
    const n = $('nav').height();
    const e = $('.terminal').height() + $('.env-nav-container').height();
    const evh = ((h - n - e - 84) / h) * 100 - 0.01;
    $('.editor').css('height', evh + 'vh');
  }

  $(document).ready(setHeight);
  $(window).resize(setHeight);
});
