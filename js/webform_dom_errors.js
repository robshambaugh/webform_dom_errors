(function ($, Drupal) {
  Drupal.behaviors.webformDomErrors = {
    attach: function (context, settings) {
      $('form', context).once('webform-dom-errors').each(function () {
        // Iterate over each input field
        $(this).find(':input').not(':button, :submit, :reset, :hidden').each(function () {
          var $input = $(this);
          // Append an error message placeholder
          if (!$input.next('.error-placeholder').length) {
            $('<span class="error-placeholder" style="display:none;"></span>').insertAfter($input);
          }
        });

        // On form submit, validate each field
        $(this).on('submit', function (e) {
          var hasError = false;
          $(this).find(':input').not(':button, :submit, :reset, :hidden').each(function () {
            var $input = $(this);
            var $errorPlaceholder = $input.next('.error-placeholder');
            // Example validation: field must not be empty
            if (!$input.val()) {
              $errorPlaceholder.text('This field cannot be empty').show();
              hasError = true;
            } else {
              $errorPlaceholder.hide();
            }
          });

          if (hasError) {
            e.preventDefault();
          }
        });
      });
    }
  };
})(jQuery, Drupal);
