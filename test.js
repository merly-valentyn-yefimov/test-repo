alert('hello');
alert('hello2');
alert('hello3');
alert('hello4');
alert('hello5');
alert('hello6');
alert('hello7');
alert('hello8');
alert('hello9');

(() => {
// highlight the TOC item that has same text as the heading in view as scrolling
if (toc && toc.scroll_highlight !== false && li.length > 0) (function() {
  // scroll the current TOC item into viewport
  var ht = $(window).height(), rect = li[0].getBoundingClientRect();
  if (rect.top >= ht || rect.top <= 0 || rect.bottom <= 0) {
    summary.scrollTop(li[0].offsetTop);
  }
  // current chapter TOC items
  var items = $('a[href^="' + href + '"]').parent('li.chapter'),
    m = items.length;
  if (m === 0) {
    items = summary.find('li.chapter');
    m = items.length;
  }
  if (m === 0) return;
  // all section titles on current page
  var hs = bookInner.find('.page-inner').find('h1,h2,h3'), n = hs.length,
    ts = hs.map(function(i, el) { return $(el).text(); });
  if (n === 0) return;
  var scrollHandler = function(e) {
    var ht = $(window).height();
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
      // find the first visible title in the viewport
      for (var i = 0; i < n; i++) {
        var rect = hs[i].getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= ht) break;
      }
      if (i === n) return;
      items.removeClass('active');
      for (var j = 0; j < m; j++) {
        if (items.eq(j).children('a').first().text() === ts[i]) break;
      }
      if (j === m) j = 0;  // highlight the chapter title
      // search bottom-up for a visible TOC item to highlight; if an item is
      // hidden, we check if its parent is visible, and so on
      while (j > 0 && items.eq(j).is(':hidden')) j--;
      items.eq(j).addClass('active');
    }, 250));
  };
  bookInner.on('scroll.bookdown', scrollHandler);
  bookBody.on('scroll.bookdown', scrollHandler);
})();