// Strength of the Infinity Stones

const rootMan = $('#root');
const infinity = $('<p>');

infinity.text = ('~Thanos')

infinity.addClass('.footer')
const motto = $('<h4>')

motto.text('Strength of the Infinity Stones')
motto.addClass('power');

console.log(infinity);

motto.append(infinity);

rootMan.append(motto);

$("#title").css("fontSize", "60px");
