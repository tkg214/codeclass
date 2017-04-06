//ideally this will be used to hold the axios code for delete/removing classrooms

$(document).ready(function() {

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


});
