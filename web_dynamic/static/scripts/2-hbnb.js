const $ = window.$;
$(document).ready(function () {
  const listCheck = [];
  $('.checkbox_amenities').click(function () {
    const space = ' ';
    const string = space.concat('', $(this).attr('data-name'));
    if ($(this).is(':checked')) {
      listCheck.push(string);
    } else {
      const removeItemFromArr = (listCheck, item) => {
        const i = listCheck.indexOf(item);
        i !== -1 && listCheck.splice(i, 1);
      };
      removeItemFromArr(listCheck, string);
    }
    $('#h4_amenities').text(listCheck);
  });
  // in vagrant is with localhost instead 0.0.0.0
  $.getJSON('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === "OK") {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
