$(function() {

  function setHeight(){
      const h = $(window).height();
      const n = $('nav').height();
      const m = $('.user-count-container').height() + $('.chat-header').height() + $('.message-compose-container').height();
      const e = $('.terminal').height() + $('.env-nav-container').height();
      const evh = ((h - n - e) / h) * 100 - 0.1;
      $('.editor').css('height', evh + 'vh');
      const mvh = ((h - n - m) / h) * 100 - 0.1;
      $('.message-list-container').css('height', mvh + 'vh');
  }

  function setWidth(){
    const w = $(window).width();
    const m = $('.chat-container').width();
    const wh = ((w - m) / w) * 100 - 0.1;
    $('.editor').css('width', wh + 'wh');
  }

  function setOtherHeight(){
    const oh = $('.chat-container').height();
    const evh = ((oh - e) / oh) * 100 - 0.1;
    const mvh = ((oh - m) / oh) * 100 - 0.1;
    $('.message-list-container').css('height', mvh + 'vh');
    $('.editor').css('height', evh + 'vh');
  }

  $(document).ready(setHeight)
  $(window).resize(setHeight);
  $(document).ready(setWidth);
  $(window).resize(setWidth);
  // $(document).ready(setOtherHeight);
  // $(window).resize(setOtherHeight);

});
