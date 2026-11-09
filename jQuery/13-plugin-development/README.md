# 🔌 Module 13: Plugin Development

Author custom, reusable, stateful jQuery plugins by extending `jQuery.fn`, preserving method chaining, managing default options, applying the Bridge pattern, and implementing clean lifecycle teardowns.

---

### 1. Objective
Understand how jQuery's prototype (`$.fn`) works, author production-grade custom plugins, preserve method chainability, implement public methods via the Bridge pattern, and cleanly destroy plugin instances.

### 2. Explanation
Extending jQuery with reusable functionality is accomplished by adding methods to `jQuery.prototype`, aliased as `jQuery.fn`.

A well-architected jQuery 4.0 plugin adheres to four golden rules:
1. **Immediately Invoked Function Expression (IIFE)**: Wraps plugin code to keep private variables out of global scope and safely map `$` to `jQuery`.
2. **Prototype Extension**: Attach the method to `$.fn.myPluginName`.
3. **Preserve Chainability**: Always return `this.each(function() { ... })` so developers can chain further jQuery calls (e.g. `$('#box').myPlugin().addClass('active')`).
4. **Configurable Defaults**: Use `$.extend()` to merge user-supplied options with sensible defaults.

For **Stateful Plugins** (like carousels, modals, tabs):
- Store the class/instance reference using `$(el).data('plugin_name', this)`.
- Use the **Bridge Pattern** to allow external code to invoke methods: `$(el).myPlugin('open')` or `$(el).myPlugin('destroy')`.

### 3. Syntax
```javascript
(function($) {
  'use strict';

  $.fn.highlightPlugin = function(options) {
    const settings = $.extend({}, $.fn.highlightPlugin.defaults, options);

    return this.each(function() {
      // 'this' is the raw DOM element
      $(this).css('background-color', settings.color);
    });
  };

  $.fn.highlightPlugin.defaults = {
    color: '#fef08a'
  };
})(jQuery);
```

### 4. Parameters
- `options` *(Object | String)*: Options object to initialize, or method name to execute on an existing instance.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Module 13: Plugin Development</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <div class="counter-box" style="padding:15px; background:#f1f5f9; border-radius:6px; width:220px; text-align:center;">
    <h3 class="display">0</h3>
    <button class="btn-inc">+5</button>
  </div>
  <br>
  <button id="btnRead">Read Count via Plugin Method</button>
  <button id="btnDestroy">Destroy Plugin</button>

  <script>
    (function($) {
      'use strict';

      const PLUGIN_NAME = 'stepWidget';

      class StepWidget {
        constructor(element, options) {
          this.$el = $(element);
          this.options = $.extend({ step: 1 }, options);
          this.count = 0;
          this.init();
        }

        init() {
          this.$display = this.$el.find('.display').text(this.count);
          this.$el.on('click.stepWidget', '.btn-inc', () => {
            this.count += this.options.step;
            this.$display.text(this.count);
          });
        }

        getValue() {
          return this.count;
        }

        destroy() {
          this.$el.off('.stepWidget');
          this.$el.removeData(PLUGIN_NAME);
          this.$display.text('Destroyed');
        }
      }

      // Bridge Pattern
      $.fn[PLUGIN_NAME] = function(option, ...args) {
        if (typeof option === 'string') {
          let returnValue;
          this.each(function() {
            const instance = $(this).data(PLUGIN_NAME);
            if (!instance) throw new Error(`Plugin not initialized`);
            if (typeof instance[option] === 'function') {
              returnValue = instance[option](...args);
            }
          });
          return returnValue !== undefined ? returnValue : this;
        }

        return this.each(function() {
          if (!$(this).data(PLUGIN_NAME)) {
            $(this).data(PLUGIN_NAME, new StepWidget(this, option));
          }
        });
      };
    })(jQuery);

    // Initialize plugin with custom step
    $('.counter-box').stepWidget({ step: 5 });

    $('#btnRead').on('click', function() {
      const val = $('.counter-box').stepWidget('getValue');
      alert(`Current counter value: ${val}`);
    });

    $('#btnDestroy').on('click', function() {
      $('.counter-box').stepWidget('destroy');
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking `+5` increments the counter by 5.
- "Read Count" queries the stateful instance and alerts the live count.
- "Destroy Plugin" safely removes namespaced event listeners and purges the data instance.

### 7. Practical Use
- Packaging company design system widgets (modals, tooltips, lightboxes, carousels) into reusable modules.

### 8. Common Mistakes
- **Forgetting `return this.each(...)`**: Breaks method chaining and throws `TypeError` on subsequent chained methods.
- **Using `$(this)` instead of `this` in the outer plugin definition**: In the root of `$.fn.myPlugin`, `this` is **already** a jQuery collection object. Only inside `.each(function() {})` is `this` a raw DOM element.

### 9. Best Practices
- Always wrap plugin definitions in `(function($) { ... })(jQuery);`.
- Use namespaced events (e.g. `click.myPlugin`) so the plugin's `destroy()` method cleanly unbinds only its own listeners.

### 10. Exercises
1. Build a plugin `$.fn.autoSelect()` that selects all text when an input is focused.
2. Build a plugin `$.fn.wordCounter()` that displays character and word counts beneath a `<textarea>`.

### 11. Interview Questions & Answers
**Q: What is the purpose of `return this.each(function() { ... })` inside a jQuery plugin?**  
**A:** It serves two critical functions:
1. It iterates over every element in the jQuery selection, supporting collections of 1 or 1,000 elements.  
2. It returns the jQuery collection object itself (`this`), preserving method chaining.

### 12. Mini Project: Reusable Collapsible Card Plugin
```html
<div class="card-collapsible" style="border:1px solid #ccc; max-width:280px; padding:10px; font-family:sans-serif;">
  <div class="card-toggle" style="cursor:pointer; font-weight:bold;">Terms of Service ▾</div>
  <div class="card-body" style="display:none; margin-top:8px;">Please read these terms carefully before using our software.</div>
</div>

<script>
  (function($) {
    $.fn.collapsible = function() {
      return this.each(function() {
        const $card = $(this);
        $card.on('click.collapsible', '.card-toggle', function() {
          $card.find('.card-body').stop(true).slideToggle(200);
        });
      });
    };
  })(jQuery);

  $('.card-collapsible').collapsible();
</script>
```
