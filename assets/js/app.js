window.isTouch = ('ontouchstart' in window) || ('msmaxtouchpoints' in window.navigator);
window.app = {
    init: function () {
        app.initEvents();
        //app.initFormValidation();
        //app.initFancyBox();
    },
    initEvents: function () {

    },
    initFancyBox: function () {
        $("[data-fancybox-form]").fancybox({
            modal: true,
            animationEffect: "zoom-in-out"
        });
    },
    initFormValidation: function () {
        $('.js-form-validation').each(function () {
            $(this).validate({
                errorClass: "input-validation input-validation--invalid",
                validClass: "input-validation input-validation--valid",
                rules: {
                    name: {
                        required: true,
                        // Using the normalizer to trim the value of the element
                        // before validating it.
                        //
                        // The value of `this` inside the `normalizer` is the corresponding
                        // DOMElement. In this example, `this` references the `username` element.
                        normalizer: function (value) {
                            return $.trim(value);
                        }
                    }
                },
                submitHandler: function (form, e) {
                    e.preventDefault();
                    app.submitForm($(form));
                }
            });
        })
    },
    submitForm: function (form) {
        $.ajax({
            url: form.attr('action'),
            method: form.attr('method'),
            data: form.serialize(),
            dataType: 'json',
            cache: false,
            success: function (data) {
                form[0].reset();
                console.log(data.message);
                //$.fancybox.close()
            },
            error: function (data) {
                var response = data.responseJSON;
                console.log(response.message);
            }
        });
    }
};

$(app.init);
