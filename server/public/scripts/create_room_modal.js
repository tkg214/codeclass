$(document).ready(function() {

  const modal = document.getElementById('myModal')
  const button = document.getElementById("modal-button")
  const close = document.querySelectorAll(".closeModal")[0]
  const clickable = document.querySelectorAll('.clickable')

  const openModal = function() {
    modal.style.display = "block";
    modal.style.background = "rgba(33, 33, 33, 0.54)";
    $('body').addClass('modal-active');

  }
  const closeModal = function() {
    modal.style.display = "none";
    $('body').removeClass('modal-active');
  }
  //event listeners
  button.addEventListener('click', openModal, false)
  close.addEventListener('click', closeModal, false)
  for (let i = 0; i < clickable.length; i++) {
    clickable[i].addEventListener('click', openModal, false)
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none"
    }
  }

});
