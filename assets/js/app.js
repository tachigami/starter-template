window.isTouch = ('ontouchstart' in window) || ('msmaxtouchpoints' in window.navigator);

var app = (function() {
  function init() {
    initFancyBox();
  }

  function initFancyBox() {
    $('[data-fancybox-form]').fancybox({
      modal: true,
      animationEffect: 'zoom-in-out',
    });
  }

  function submitForm(form) {
    $.ajax({
      url: form.attr('action'),
      method: form.attr('method'),
      data: form.serialize(),
      dataType: 'json',
      // contentType: false,
      // processData: false,
      cache: false,
      success: function(data) {
        form[0].reset();
        console.log(data.message);
        //$.fancybox.close()
      },
      error: function(data) {
        var response = data.responseJSON;
        console.log(response.message);
      },
    });
  }

  return {
    init: init,
  };
})();

$(app.init);
