$(function() {
  function setHeight(){
    const h = $(window).height();
    const n = $('nav').height();
    const e = $('.terminal').height() + $('.env-nav-container').height();
    const evh = ((h - n - e - 84) / h) * 100 - 0.01;
    $('.editor').css('height', evh + 'vh');
  }

  function setTerminalWidth(){
    const totalWidth = $(window).width();
    const chatWidth = $('.chat-container').width();
    const chatBarWith = $('.chat-notificaiton-bar').width();
    const terminalWidth = $((totalWith - chatWidth - chatBarWidth) / totalWidth) * 100 - 0.01;
    $('.terminal').css('width', terminalWidth + 'vw');
  }

  $(document).ready(setTerminalWidth);
  $(window).resize(setTerminalWidth);
  $(document).ready(setHeight);
  $(window).resize(setHeight);
});
