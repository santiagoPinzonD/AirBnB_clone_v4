const $ = window.$;
$(document).ready(function () {
  const listCheck = [];
  const checkedItems = [];
  $('.checkbox_amenities').click(function () {
    const space = ' ';
    const string = space.concat('', $(this).attr('data-name'));
    if ($(this).is(':checked')) {
      listCheck.push(string);
      checkedItems.push($(this).attr('data-id'));
    } else {
      const removeItemFromArr = (listCheck, item) => {
        const i = listCheck.indexOf(item);
        i !== -1 && listCheck.splice(i, 1);
      };
      removeItemFromArr(listCheck, string);
      removeItemFromArr(checkedItems, $(this).attr('data-id'));
    }
    $('#h4_amenities').text(listCheck);
  });
  // in vagrant is with localhost instead 0.0.0.0
  $.getJSON('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  const queryPlaces = function (searchParam) {
    $.ajax({
      type: 'POST',
      // localhost instead of 0.0.0.0 to work on windows
      url: 'http://localhost:5001/api/v1/places_search/',
      data: searchParam,
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        console.log(data.length);
        $('SECTION.places').empty();
        for (const place of data) {
          const template = `<article>
                                <div class="title_box">
                                    <h2>${place.name}</h2>
                                    <div class="price_by_night">$${place.price_by_night}</div>
                                </div>
                                <div class="information">
                                    <div class="max_guest">${place.max_guest} Guests</div>
                                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                                </div>
                                <div class="description">${place.description}</div>
                              </article>`;
          $('SECTION.places').append(template); // Here, appends to the class
        }
      }
    });
  };
  queryPlaces('{}');
  $('BUTTON').click(function () {
    const dict = { amenities: checkedItems };
    queryPlaces(JSON.stringify(dict));
  });
});
