//ideally this will be used to hold the axios code for delete/removing classrooms

$(document).ready(function() {

  // $('.delete-card-icon').click(() => {
  //   console.log(this);
  // })

  const $grid = $('.myrooms-container').isotope({
    itemSelector: '.card',
    layoutMode: 'fitRows',
    getSortData: {
      topic: '.card-header',
      language: '[data-language]'
    }
  });

  $('.btn-group.filter-language-group').on('click', 'button', function() {
    const filterValue = $(this).attr('data-filter');
    $grid.isotope({filter: filterValue});
  });

  $('.sort-by-button-group').on('click', 'button', function() {
    const sortByValue = $(this).attr('data-sort-by');
    const sortOrder = $(this).attr('data-order');
    if (sortOrder === "ascending") {

      $grid.isotope({sortBy: sortByValue, sortAscending: true});

    } else {
      $grid.isotope({sortBy: sortByValue, sortAscending: false});
    }
  });

  // get the elements
  const modal = document.getElementById('myModal')
  const button = document.getElementById("modal-button")
  const close = document.querySelectorAll(".closeModal")[0]
  const clickable = document.querySelectorAll('.clickable')

  const openModal = function() {
  	modal.style.display = "block";
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
