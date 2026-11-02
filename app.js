(function(){
  'use strict';
  var root=document.documentElement;
  var themeButton=document.getElementById('theme-toggle');
  try { if(localStorage.getItem('paper-review-theme')==='dark'){root.dataset.theme='dark';themeButton.setAttribute('aria-pressed','true');} } catch(e){}
  themeButton.addEventListener('click',function(){
    var dark=root.dataset.theme!=='dark';
    root.dataset.theme=dark?'dark':'light';
    themeButton.setAttribute('aria-pressed',dark?'true':'false');
    try{localStorage.setItem('paper-review-theme',dark?'dark':'light');}catch(e){}
  });
  var search=document.getElementById('search');
  var filters=Array.from(document.querySelectorAll('.filter'));
  var cards=Array.from(document.querySelectorAll('.paper-card'));
  var empty=document.getElementById('no-results');
  var currentFilter='all';
  function filterCards(){
    var query=search.value.trim().toLocaleLowerCase();
    var visible=0;
    cards.forEach(function(card){
      var text=(card.textContent+' '+(card.dataset.keywords||'')).toLocaleLowerCase();
      var match=(currentFilter==='all'||card.dataset.type===currentFilter)&&text.includes(query);
      card.hidden=!match;
      if(match)visible+=1;
    });
    empty.hidden=visible>0;
  }
  search.addEventListener('input',filterCards);
  filters.forEach(function(btn){btn.addEventListener('click',function(){
    currentFilter=btn.dataset.filter;
    filters.forEach(function(b){var active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    filterCards();
  });});
  var progress=document.getElementById('scroll-progress');
  var scheduled=false;
  function paintProgress(){var doc=document.documentElement;var distance=Math.max(1,doc.scrollHeight-window.innerHeight);progress.style.width=Math.min(100,Math.max(0,100*window.scrollY/distance))+'%';scheduled=false;}
  window.addEventListener('scroll',function(){if(!scheduled){scheduled=true;requestAnimationFrame(paintProgress);}}, {passive:true});
  window.addEventListener('resize',paintProgress);
  paintProgress();
})();