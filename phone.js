/**
 * Implements hook_field_widget_form().
 */
function phone_field_widget_form(form, form_state, field, instance, langcode, items, delta, element) {
  // Set the input type to a telephone.
  items[delta].type = 'tel';
}

/**
 * Implements hook_field_formatter_view().
 */
function phone_field_formatter_view(entity_type, entity, field, instance, langcode, items, display) {
  // Iterate over each item, and place a widget onto the render array.
  var content = {};
  $.each(items, function(delta, item) {
    // Grab the text to display, then display it is a phone link or
    // plain text.
    var text = item.value;
    if (display.type === 'phone') {
      if (!empty(display.settings.title)) { text = display.settings.title; }
      content[delta] = {
        theme: 'phone_link',
        text: text,
        path: null,
        attributes: {
          href: 'tel:+' + item.value.replace('+', '')
        }
      };
    }
    else { content[delta] = { markup: text }; }
  });
  return content;
}

/**
 *
 */
function theme_phone_link(variables) {
  if (!variables.attributes['data-icon']) {
    variables.attributes['data-icon'] = 'phone';
  }
  return theme('button_link', variables);
}
