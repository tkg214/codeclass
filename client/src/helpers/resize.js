$(function() {
  function setHeight(){
    const h = $(window).height();
    const n = $('nav').height();
    const e = $('.terminal').height() + $('.env-nav-container').height();
    const evh = ((h - n - e - 84) / h) * 100 - 0.01;
    $('.editor').css('height', evh + 'vh');
  }

  function setTerminalWidth(){
    const editorWidth = $('#brace-editor').width();
    // const totalWidth = $(window).width();
    // console.log('total width: ', totalWidth)
    // const chatWidth = $('.chat-container').width();
    // console.log('chat width: ', chatWidth);
    // const chatBarWidth = $('.chat-notification-bar').width();
    // console.log('chatbar width: ', chatBarWidth);
    // const terminalWidth = ((totalWidth - chatWidth - chatBarWidth) / totalWidth) * 100 - 0.01;
    // console.log(terminalWidth);
    $('.terminal').css(width, editorWidth + 'px');
  }

  $(document).ready(setTerminalWidth);
  $(window).resize(setTerminalWidth);
  $(document).ready(setHeight());
  $(window).resize(setHeight());
});
