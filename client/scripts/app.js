$(function() {

  function SetHeight(){
      const h = $(window).height();
      const n = $('.navbar').height();
      const vh = ((h - n) / h) * 100 - 0.1;
      $('.chat-container').css('height', vh + 'vh');
      $('.env-container').css('height', vh + 'vh');
  }

  $(document).ready(SetHeight);
  $(window).resize(SetHeight);

});
