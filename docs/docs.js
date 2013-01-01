
$(function(){
  $('code').each(function(){
    $(this).html(highlight($(this).text()));
  });

  $('pre, #menu ul').hide()
  $('.show_source').click(function(e) {
    $(this).parent().find('pre').slideToggle()
  })

  $('#menu ul').slideUp()
  $('#menu h3').click(function() {
    $(this).parent().find('ul').slideToggle()
  })

  $('#menu li').click(function() {
    var go = $(this).attr('id')
    window.location.href = window.location.origin + window.location.pathname + '#' + go
    $('#menu ul').slideUp()
  })
    
});

function highlight(js) {
  return js
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\/\/(.*)/gm, '<span class="comment">//$1</span>')
    .replace(/('.*?')/gm, '<span class="string">$1</span>')
    .replace(/(\d+\.\d+)/gm, '<span class="number">$1</span>')
    .replace(/(\d+)/gm, '<span class="number">$1</span>')
    .replace(/\bnew *(\w+)/gm, '<span class="keyword">new</span> <span class="init">$1</span>')
    .replace(/\b(function|new|throw|return|var|if|else)\b/gm, '<span class="keyword">$1</span>')
}
