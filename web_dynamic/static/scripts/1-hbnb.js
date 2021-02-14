$(document).ready( function () {
  let listCheck = []
  $(".checkbox_amenities").click( function () {
    let space = " ";
    let string = space.concat('', $(this).attr("data-name")); 
    if ($(this).is(':checked')){
      listCheck.push(string);
    } else {
	let removeItemFromArr = ( listCheck, item ) => {
		    let i = listCheck.indexOf( item );
		        i !== -1 && listCheck.splice( i, 1 );
	};
	removeItemFromArr(listCheck, string);
    }
    $("#h4_amenities").text(listCheck);
    });
});
