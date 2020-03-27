$(document).ready(function() {

  let length = 140;

  $('#tweets-text').on("input", function() {
    let count = $(this).val().length;
    let maxCount = (length - count);

    $(this).parents().find('output').text(maxCount);

    if (maxCount < 0) {
      $(this).parents().find('output').attr('id', 'zero-counter');
    } else {
      $(this).parents().find('output').attr('id', 'counter');
    }
  });
});
