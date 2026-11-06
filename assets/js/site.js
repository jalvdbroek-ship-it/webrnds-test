(function(){
  var PAGES=['home','pricing','resources','events','changelog'];
  var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12}):null;
  function show(id){
    if(PAGES.indexOf(id)<0) id='home';
    document.querySelectorAll('.page').forEach(function(p){p.classList.toggle('on',p.dataset.page===id)});
    document.querySelectorAll('[data-nav]').forEach(function(a){a.classList.toggle('active',a.dataset.nav===id)});
    document.getElementById('mobile-menu').classList.remove('open');
    window.scrollTo(0,0);
    var page=document.querySelector('.page[data-page="'+id+'"]');
    page.querySelectorAll('.reveal:not(.in)').forEach(function(el){io?io.observe(el):el.classList.add('in')});
    document.dispatchEvent(new CustomEvent('pageshow:'+id));
  }
  function route(){var h=(location.hash||'#home').slice(1).split('/')[0];show(h)}
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href^="#"]');
    if(a){var h=a.getAttribute('href').slice(1);if(PAGES.indexOf(h)>=0){e.preventDefault();try{history.pushState(null,'','#'+h)}catch(_){}show(h)}}
    var t=e.target.closest('[data-toast]');
    if(t){e.preventDefault();toast(t.getAttribute('data-toast'))}
  });
  window.addEventListener('popstate',route);
  window.addEventListener('hashchange',route);
  var burger=document.querySelector('.nav-burger');
  burger.addEventListener('click',function(){var m=document.getElementById('mobile-menu');var o=m.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
  var tt;window.toast=function(msg){var el=document.getById('toast');el.querySelector('span').textContent=msg;el.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){el.classList.remove('show')},2600)};
  window.__show=show;
  document.addEventListener('DOMContentLoaded',route);
  if(document.readyState!=='loading') route();
})();


(function(){
  var root=document.querySelector('.p-home'); if(!root) return;
  var $=function(s,c){return (c||root).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||root).querySelectorAll(s))};
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fmt(n,dec){var s=n.toFixed(dec);var p=s.split('.');p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');return p.join('.')}
  function countUp(el,to,dec,pre,suf,ms){
    pre=pre||'';suf=suf||'';dec=dec||0;
    if(reduce){el.textContent=pre+fmt(to,dec)+suf;return}
    var t0=null;ms=ms||1100;
    if(el._raf) cancelAnimationFrame(el._raf);
    function step(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/ms);var e=1-Math.pow(1-k,3);el.textContent=pre+fmt(to*e,dec)+suf;if(k<1)el._raf=requestAnimationFrame(step)}
    el._raf=requestAnimationFrame(step);
  }

  /* ---- de vier stappen van de werkwijze ---- */
  var STEPS=[
    {title:'01 · Vraag',status:'Stap 1 van 4',heading:'Vertel wat er moet gebeuren',
     tiles:[['Doel','Waar loop je tegen aan','in je eigen woorden'],['Reactie','Binnen één werkdag','ook gewoon per mail'],['Voorbereiding','Niks','geen plan nodig'],['Omvang','Nog onbekend','dat bepalen we samen']],
     finding:'Je hoeft geen plan mee te brengen. Eén vraag is genoeg om te beginnen.'},
    {title:'02 · Gesprek',status:'Stap 2 van 4',heading:'Dertig minuten, dan weet je meer',
     tiles:[['Duur','30 minuten','online of op locatie'],['Onderwerp','Je proces','niet je software'],['Notitie','Een samenvatting','per mail, na afloop'],['Voorwaarde','Geen verplichtingen','wel een eerlijke blik']],
     finding:'We praten over hoe je werk nu loopt, en wat daarin beter kan zonder dat je er zelf aan hoeft te sleutelen.'},
    {title:'03 · Vaste prijs',status:'Stap 3 van 4',heading:'Eén bedrag, vooraf afgesproken',
     tiles:[['Website','Vanaf 2.500','eenmalig'],['Webapp','Vanaf 5.000','eenmalig'],['Platform','Vanaf 10.000','eenmalig'],['Onderhoud','175 per maand','apart op te nemen']],
     finding:'Verandert je vraag tijdens het project, dan maken we daar apart een afspraak over. Je oorspronkelijke prijs blijft gelijk.'},
    {title:'04 · Bouwen',status:'Stap 4 van 4',heading:'Per stap, met preview voor je',
     tiles:[['Stappen','Vier tot zes','per stap opleveren'],['Terugkoppeling','Direct','bij elke oplevering'],['Broncode','Jouw repository','vanaf het begin'],['Oplevering','Documentatie','inbegrepen']],
     finding:'Je ziet elke stap voor je hem vrijgeeft, en de code is vanaf het begin van jou.'}
  ];

  var tiles=$('[data-k=tiles]');
  function renderTiles(step){
    tiles.innerHTML='';
    step.tiles.forEach(function(t){
      var d=document.createElement('div'); d.className='kpi text';
      d.innerHTML='<span class="l"></span><span class="v"></span><span class="d"></span>';
      d.querySelector('.l').textContent=t[0];
      d.querySelector('.v').textContent=t[1];
      d.querySelector('.d').textContent=t[2];
      tiles.appendChild(d);
    });
  }
  function render(i){
    var s=STEPS[i];
    $('[data-k=title]').textContent=s.title;
    $('[data-k=heading]').textContent=s.heading;
    $('[data-k=status]').textContent=s.status;
    $('[data-k=finding]').textContent=s.finding;
    renderTiles(s);
    $$('.steps span').forEach(function(sp,j){sp.classList.toggle('now',j<=i)});
  }
  var cur=0;
  $$('.task').forEach(function(b){
    b.addEventListener('click',function(){
      var i=+b.dataset.r; if(i===cur) return; cur=i;
      $$('.task').forEach(function(t){var on=t===b;t.classList.toggle('on',on);t.setAttribute('aria-selected',on)});
      var sw=$$('.swap'); sw.forEach(function(s){s.classList.add('fade')});
      setTimeout(function(){render(i);sw.forEach(function(s){s.classList.remove('fade')})},180);
    });
  });
  render(0);

  /* ---- rolchips ---- */
  $$('.role').forEach(function(b){b.addEventListener('click',function(){
    $$('.role').forEach(function(x){x.classList.toggle('on',x===b)});
    var p=b.dataset.role.split('|'); $('.role-a').textContent=p[0]; $('.role-b').textContent=p[1];
  })});

  /* ---- prijschips ---- */
  $$('.model').forEach(function(b){b.addEventListener('click',function(){
    $$('.model').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
    toast('Startprijs: '+b.textContent);
  })});

  /* ---- akkoord ---- */
  var ap=$('.approval'), apb=$('.approve');
  apb.addEventListener('click',function(){
    if(ap.classList.contains('ok')) return;
    ap.classList.add('ok'); $('.approve-t').textContent='Akkoord';
    $('.approval-q').textContent='Broncode staat in jouw repository';
    toast('Akkoord — de broncode wordt in jouw repository gezet');
  });

  /* ---- onderhoudsplanning ---- */
  var runs=$$('.run'), stIdx=0, stTimer=null;
  function tick(){
    runs.forEach(function(r,j){r.classList.toggle('lit',j<stIdx);r.classList.toggle('now',j===stIdx-1)});
    stIdx++; if(stIdx>runs.length+2) stIdx=0;
  }
  function startSched(){if(stTimer) return; stIdx=0; tick(); stTimer=setInterval(tick,1100)}

  /* ---- feiten onder de belofte ---- */
  var proofDone=false;
  function runProof(){if(proofDone) return; proofDone=true;
    $$('.proof [data-count]').forEach(function(b){countUp(b,parseFloat(b.dataset.count),+(b.dataset.dec||0),b.dataset.pre,b.dataset.suf,1400)})}

  if('IntersectionObserver' in window){
    var io2=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting) return;
      if(e.target.classList.contains('proof')) runProof();
      if(e.target.classList.contains('sched')) startSched();
    })},{threshold:.4});
    io2.observe($('.proof')); io2.observe($('.sched'));
  } else {runProof();startSched()}
})();


(function(){
  var root=document.querySelector('.p-pricing'); if(!root) return;
  var tog=root.querySelector('.pr-toggle'), pill=tog.querySelector('.pr-pill'), btns=tog.querySelectorAll('button');
  var cycle='monthly';
  function placePill(){
    var b=tog.querySelector('button[aria-pressed="true"]'); if(!b||!b.offsetWidth) return;
    pill.style.width=b.offsetWidth+'px';
    pill.style.transform='translateX('+(b.offsetLeft-4)+'px)';
  }
  function tween(el,to){
    var from=el._val==null?parseInt(el.dataset.m,10):el._val; el._val=to;
    if(from===to) return;
    el.classList.add('swap');
    setTimeout(function(){
      el.classList.remove('swap');
      var t0=performance.now(), d=420;
      (function step(t){
        var k=Math.min(1,(t-t0)/d), e=1-Math.pow(1-k,3);
        el.textContent=Math.round(from+(to-from)*e).toLocaleString('nl-NL');
        if(k<1) requestAnimationFrame(step);
      })(t0);
    },160);
  }
  function setCycle(c){
    if(c===cycle) return; cycle=c;
    btns.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.cycle===c)});
    placePill();
    var key=c==='yearly'?'y':'m';
    root.querySelectorAll('.price .amt').forEach(function(el){tween(el,parseInt(el.dataset[key],10))});
    root.querySelectorAll('.price .per').forEach(function(el){el.textContent=el.dataset[key]});
    root.querySelectorAll('.bill').forEach(function(el){
      var txt=el.dataset[key]; if(el.textContent===txt) return;
      el.classList.add('swap'); setTimeout(function(){el.textContent=txt;el.classList.remove('swap')},180);
    });
  }
  btns.forEach(function(b){b.addEventListener('click',function(){setCycle(b.dataset.cycle)})});
  window.addEventListener('resize',placePill);
  document.addEventListener('pageshow:pricing',function(){requestAnimationFrame(placePill)});
  requestAnimationFrame(placePill);
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(placePill);

  var qas=root.querySelectorAll('.qa');
  function setOpen(qa,open){
    var ans=qa.querySelector('.ans'), btn=qa.querySelector('button');
    qa.classList.toggle('open',open); btn.setAttribute('aria-expanded',open);
    if(open){ans.style.height=ans.scrollHeight+'px'}
    else{ans.style.height=ans.scrollHeight+'px'; ans.offsetHeight; ans.style.height='0px'}
  }
  qas.forEach(function(qa){
    var ans=qa.querySelector('.ans');
    ans.addEventListener('transitionend',function(){if(qa.classList.contains('open')) ans.style.height='auto'});
    if(qa.classList.contains('open')) ans.style.height='auto';
    qa.querySelector('button').addEventListener('click',function(){
      var willOpen=!qa.classList.contains('open');
      qas.forEach(function(o){if(o!==qa&&o.classList.contains('open')) setOpen(o,false)});
      setOpen(qa,willOpen);
    });
  });
})();


(function(){
  var root=document.querySelector('.p-resources'); if(!root) return;
  var box=root.querySelector('.rs-search'), input=root.querySelector('.rs-input');
  var chips=[].slice.call(root.querySelectorAll('.rs-chip'));
  var cats=[].slice.call(root.querySelectorAll('.rs-cat'));
  var arts=[].slice.call(root.querySelectorAll('.rs-art'));
  var tuts=[].slice.call(root.querySelectorAll('.rs-tut'));
  function hay(el){return (el.textContent+' '+(el.dataset.k||'')).toLowerCase()}
  function match(el,terms){var h=hay(el);return terms.every(function(t){return h.indexOf(t)>=0})}
  function filter(){
    var q=input.value.trim(), terms=q.toLowerCase().split(/\s+/).filter(Boolean);
    box.classList.toggle('has',!!q);
    var nc=0,na=0;
    cats.forEach(function(c){var ok=!terms.length||match(c,terms);c.classList.toggle('rs-hide',!ok);if(ok)nc++});
    arts.forEach(function(a){var ok=!terms.length||match(a,terms);a.parentNode.classList.toggle('rs-hide',!ok);if(ok)na++});
    tuts.forEach(function(t){t.classList.toggle('rs-hide',!!terms.length&&!match(t,terms))});
    root.querySelectorAll('.rs-q').forEach(function(b){b.textContent='“'+q+'”'});
    root.querySelector('.rs-empty-cats').classList.toggle('show',!nc);
    root.querySelector('.rs-grid').classList.toggle('rs-hide',!nc);
    root.querySelector('.rs-empty-arts').classList.toggle('show',!na);
    chips.forEach(function(c){c.classList.toggle('on',c.textContent.toLowerCase()===q.toLowerCase())});
  }
  input.addEventListener('input',filter);
  input.addEventListener('keydown',function(e){if(e.key==='Escape'){input.value='';filter();input.blur()}});
  root.querySelector('.rs-clear').addEventListener('click',function(e){e.preventDefault();input.value='';filter();input.focus()});
  chips.forEach(function(c){c.addEventListener('click',function(){input.value=c.classList.contains('on')?'':c.textContent;filter();input.focus()})});
  document.addEventListener('keydown',function(e){
    if(!root.classList.contains('on')) return;
    var typing=/INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName||'');
    if(((e.metaKey||e.ctrlKey)&&(e.key==='k'||e.key==='K'))||(e.key==='/'&&!typing)){
      e.preventDefault();input.focus();input.select();
      box.scrollIntoView({block:'center',behavior:'smooth'});
    }
  });
  cats.forEach(function(c){c.addEventListener('click',function(){toast('Onderwerp: '+c.querySelector('h3').textContent)})});
  arts.forEach(function(a){a.addEventListener('click',function(){toast('Opening: '+a.querySelector('.t').textContent)})});
  tuts.forEach(function(t){t.addEventListener('click',function(){toast('Opening: '+t.querySelector('h4').textContent)})});
})();


(function(){
  var root=document.querySelector('.p-events'); if(!root) return;
  // aftellen naar de volgende open kennismaking
  var target=new Date(2026,10,20,19,0,0).getTime();
  var els={d:root.querySelector('[data-u="d"]'),h:root.querySelector('[data-u="h"]'),m:root.querySelector('[data-u="m"]'),s:root.querySelector('[data-u="s"]')};
  function pad(n){return (n<10?'0':'')+n}
  function set(el,v){if(el.textContent!==v){el.textContent=v;el.classList.remove('tick');void el.offsetWidth;el.classList.add('tick')}}
  function tick(){
    var t=Math.max(0,Math.floor((target-Date.now())/1000));
    set(els.d,pad(Math.floor(t/86400)));set(els.h,pad(Math.floor(t%86400/3600)));set(els.m,pad(Math.floor(t%3600/60)));set(els.s,pad(t%60));
  }
  tick(); setInterval(tick,1000);

  // plek reserveren
  var save=root.querySelector('.ev-save'), saved=false;
  save.addEventListener('click',function(){
    if(saved){toast('Je plek is al vastgelegd — tot 20 november');return}
    saved=true;
    save.classList.add('done'); save.querySelector('span').textContent='Plek vastgelegd';
    toast('Plek vastgelegd — je krijgt de uitnodiging per mail');
  });

  // filters
  var list=root.querySelector('.ev-list'), rows=[].slice.call(root.querySelectorAll('.ev-row')), pills=[].slice.call(root.querySelectorAll('.ev-pill')), ft;
  pills.forEach(function(p){p.addEventListener('click',function(){
    pills.forEach(function(x){var on=x===p;x.classList.toggle('on',on);x.setAttribute('aria-selected',on)});
    var f=p.dataset.f; list.classList.add('fading'); clearTimeout(ft);
    ft=setTimeout(function(){rows.forEach(function(r){r.hidden=!(f==='all'||r.dataset.type===f)});list.classList.remove('fading')},180);
  })});

  // aanmelden
  root.querySelectorAll('.ev-regbtn').forEach(function(b){b.addEventListener('click',function(){
    var on=b.classList.toggle('done'), t=b.closest('.ev-row').querySelector('h3').textContent;
    b.querySelector('.lbl').textContent=on?'Aangemeld':'Aanmelden';
    toast(on?'Aangemeld voor “'+t+'”':'Aanmelding geannuleerd');
  })});

  // onderwerpen
  root.querySelectorAll('.ev-card').forEach(function(c){c.addEventListener('click',function(){toast('Onderwerp: '+c.dataset.title)})});

  // nieuwsbrief
  var form=root.querySelector('.ev-form'), inp=form.querySelector('input');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var v=inp.value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)){form.classList.add('err');inp.focus();return}
    form.classList.remove('err'); inp.value=''; toast('Aangemeld — de eerstvolgende mail komt binnen een maand');
  });
  inp.addEventListener('input',function(){form.classList.remove('err')});
})();


(function(){
  var root=document.querySelector('.p-changelog');
  if(!root) return;
  root.querySelector('[data-cl="subscribe"]').addEventListener('click',function(){toast('Aangemeld — je hoort van ons als er iets verandert')});
  root.querySelector('[data-cl="rss"]').addEventListener('click',function(e){e.preventDefault();e.stopPropagation();toast('RSS-feed: voeg de changelog van webrnds.com toe aan je reader')});

  // oudere releases laden
  var more=root.querySelector('.cl-more');
  more.addEventListener('click',function(){
    var older=root.querySelectorAll('.rel.older[hidden]');
    older.forEach(function(r,i){
      r.hidden=false;
      setTimeout(function(){r.classList.add('shown')},60+i*140);
    });
    more.disabled=true;
    more.innerHTML='<svg class="i"><use href="#i-circle-check"/></svg>Alles geladen';
    toast('Oudere releases geladen');
    setTimeout(update,120);
  });

  // actieve node volgt de viewport
  var ticking=false;
  function update(){
    ticking=false;
    if(!root.classList.contains('on')) return;
    var mid=window.innerHeight/2,best=null,bd=1e9;
    root.querySelectorAll('.rel:not([hidden])').forEach(function(r){
      var c=r.querySelector('.rel-card').getBoundingClientRect();
      var d=(mid>=c.top&&mid<=c.bottom)?0:Math.min(Math.abs(c.top-mid),Math.abs(c.bottom-mid));
      if(d<bd){bd=d;best=r}
    });
    root.querySelectorAll('.rel').forEach(function(r){r.classList.toggle('active',r===best)});
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
  window.addEventListener('resize',update);
  document.addEventListener('pageshow:changelog',function(){setTimeout(update,50)});
})();
