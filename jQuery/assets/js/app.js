/**
 * Global Helper & Utilities for Modern jQuery 4.0 Examples
 */
(function($) {
  'use strict';

  // Global AJAX Spinner Configuration
  $(document).ajaxStart(function() {
    $('#globalSpinner').stop(true, true).fadeIn(150);
  });

  $(document).ajaxStop(function() {
    $('#globalSpinner').stop(true, true).fadeOut(200);
  });

  // Log runtime environment
  $(function() {
    console.log(`[Xivig] Initialized jQuery ${$.fn.jquery} in modern execution context.`);
  });
})(jQuery);
