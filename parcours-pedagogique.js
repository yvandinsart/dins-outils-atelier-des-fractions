
/* Din's Outils — prototype de parcours. Aucune donnée personnelle n'est enregistrée. */
(function(){
'use strict';
var app=document.querySelector('#contenu-principal .app');
var title=document.querySelector('.activity-heading');
if(!app||!title)return;
var panel=document.createElement('section');
panel.className='dins-path';panel.id='dins-parcours';panel.setAttribute('aria-labelledby','dins-path-title');
panel.innerHTML='<div class="dins-path-header"><span class="dins-path-label">Din’s Outils · Parcours d’apprentissage</span><h2 id="dins-path-title">Les fractions, étape par étape</h2><p>Découvre, manipule, vérifie ta compréhension et progresse.</p></div>'+
'<div class="dins-stepbar"><span>1 · Je découvre</span><span>2 · Je manipule</span><span>3 · Je m’évalue</span><span>4 · Je progresse</span></div>'+
'<div id="dins-intro" class="dins-route"><div class="dins-media"><video id="dins-video" controls playsinline preload="metadata" aria-label="Vidéo Qu’est-ce qu’une fraction ?"><source src="assets/videos/quest-ce-quune-fraction.mp4" type="video/mp4">Vidéo non prise en charge.</video><p class="dins-media-status" id="dins-video-message" role="status">Vidéo de référence : « Qu’est-ce qu’une fraction ? »</p></div>'+
'<div class="dins-route-info"><h3>Bonjour ! Je suis Din’s.</h3><p>Découvrons le numérateur, le dénominateur et les parts égales, puis vérifions ensemble tes acquis.</p><div class="dins-mini-frac" aria-label="trois cinquièmes"><span>3</span><i></i><span>5</span></div>'+
'<button class="dins-btn dins-btn-primary" type="button" id="dins-manip">Je manipule les fractions</button><button class="dins-btn dins-btn-light" type="button" id="dins-start">J’ai compris : je commence le diagnostic</button><p class="dins-small">Tu peux revoir la vidéo. Aucun compte ni suivi nominatif.</p></div></div>'+
'<div id="dins-diagnostic" class="dins-route" hidden><div class="dins-question-panel"><div class="dins-diagnostic-top"><span>Diagnostic adaptatif</span><span id="dins-counter" aria-live="polite"></span></div>'+
'<div class="dins-progress-track"><span id="dins-meter"></span></div><h3 id="dins-question" tabindex="-1"></h3><div id="dins-choices" class="dins-choices" role="group" aria-label="Réponses possibles"></div><p id="dins-feedback" role="status" class="dins-answer-feedback"></p>'+
'<div class="dins-actions"><button class="dins-btn dins-btn-light" id="dins-return" type="button">Revoir la vidéo</button><button class="dins-btn dins-btn-primary" id="dins-next" type="button" hidden>Question suivante</button></div></div></div>'+
'<div id="dins-results" class="dins-route" hidden><div class="dins-results"><h3>Mon bilan</h3><p id="dins-summary"></p><div id="dins-remedies"></div><div class="dins-actions"><button class="dins-btn dins-btn-light" id="dins-restart" type="button">Recommencer</button><button class="dins-btn dins-btn-primary" id="dins-ateliers" type="button">Voir les ateliers</button></div><p class="dins-small">Les résultats ne sont ni enregistrés ni envoyés.</p></div></div>';
app.insertBefore(panel,title);
function el(id){return document.getElementById(id);}
var video=el('dins-video');
video.addEventListener('error',function(){el('dins-video-message').textContent='En attente du fichier vidéo : assets/videos/quest-ce-quune-fraction.mp4';});
var modes={parts:['Parts égales','represent','Observe un partage régulier, puis représente une fraction.'],lecture:['Numérateur et dénominateur','represent','Travaille la notation et les représentations.'],equivalences:['Fractions équivalentes','equivalent','Multiplie ou divise les deux nombres par le même facteur.'],comparaison:['Comparer des fractions','compare','Compare deux représentations ayant le même dénominateur.'],calcul:['Fraction d’un nombre','number','Divise par le dénominateur puis multiplie par le numérateur.'],pourcent:['Fractions et pourcentages','percent','Observe des grilles sur cent cases.']};
var core=[
{skill:'parts',q:'Pour écrire une fraction d’une unité, les parts doivent-elles être égales ?',opts:['Oui','Non'],a:0,why:'La fraction décrit un partage en parts égales.'},
{skill:'lecture',q:'Dans trois cinquièmes (3/5), quel nombre est le dénominateur ?',opts:['3','5'],a:1,why:'Le 5 indique cinq parts égales dans l’unité.'},
{skill:'lecture',q:'Une bande comporte cinq parts égales dont trois coloriées. Quelle fraction représente-t-elle ?',opts:['5/3','2/5','3/5'],a:2,why:'Le 3 compte les parts coloriées et le 5 compte toutes les parts égales.'},
{skill:'parts',q:'Chaque part d’un gâteau découpé en quatre parts égales représente…',opts:['1/4','4/1','1/5'],a:0,why:'Une part parmi quatre parts égales est un quart.'},
{skill:'equivalences',q:'Quelle fraction est égale à un demi (1/2) ?',opts:['2/4','1/3','3/4'],a:0,why:'1/2 = 2/4 : on multiplie les deux nombres par 2.'},
{skill:'comparaison',q:'Quelle fraction est la plus grande ?',opts:['2/5','3/5','Elles sont égales'],a:1,why:'À dénominateur égal, trois parts valent plus que deux parts.'},
{skill:'calcul',q:'Combien valent trois quarts de 12 ?',opts:['3','9','16'],a:1,why:'12 ÷ 4 = 3, puis 3 × 3 = 9.'},
{skill:'pourcent',q:'Une moitié correspond à…',opts:['25 %','50 %','75 %'],a:1,why:'La moitié représente 50 parts sur 100.'}
];
var help={
parts:{skill:'parts',help:true,q:'Un tiers correspond à…',opts:['Une part sur trois parts égales','Une part sur trois parts inégales'],a:0,why:'Un tiers signifie une des trois parts égales.'},
lecture:{skill:'lecture',help:true,q:'Dans 2/4, quel nombre indique les parts choisies ?',opts:['2','4'],a:0,why:'Le numérateur est le nombre du haut.'},
equivalences:{skill:'equivalences',help:true,q:'Si je double les deux nombres de 1/3, j’obtiens…',opts:['2/6','2/3'],a:0,why:'1/3 = 2/6.'},
comparaison:{skill:'comparaison',help:true,q:'À dénominateur identique, la plus grande fraction possède…',opts:['Le plus petit numérateur','Le plus grand numérateur'],a:1,why:'Plus de parts de la même taille signifie une quantité plus grande.'},
calcul:{skill:'calcul',help:true,q:'Le quart de 12 vaut…',opts:['3','4','12'],a:0,why:'12 ÷ 4 = 3.'},
pourcent:{skill:'pourcent',help:true,q:'100 % correspond à…',opts:['Une moitié','Une unité entière'],a:1,why:'Cent pour cent désigne la totalité.'}
};
function writeFraction(node,value){
node.replaceChildren();
var regex=/(\d+)\/(\d+)/g,previous=0,match;
while((match=regex.exec(value))!==null){
 if(match.index>previous)node.appendChild(document.createTextNode(value.slice(previous,match.index)));
 var span=document.createElement('span'),top=document.createElement('span'),line=document.createElement('span'),bottom=document.createElement('span');
 span.className='dins-inline-frac';span.setAttribute('aria-label',match[1]+' sur '+match[2]);
 top.textContent=match[1];line.className='dins-inline-bar';line.setAttribute('aria-hidden','true');bottom.textContent=match[2];
 top.setAttribute('aria-hidden','true');bottom.setAttribute('aria-hidden','true');
 span.append(top,line,bottom);node.appendChild(span);
 previous=regex.lastIndex;
}
if(previous<value.length)node.appendChild(document.createTextNode(value.slice(previous)));
}

var run=null;
function screen(name){
['intro','diagnostic','results'].forEach(function(k){el('dins-'+k).hidden=k!==name;});
if(name!=='intro'&&!video.paused)video.pause();
panel.scrollIntoView({behavior:'smooth',block:'start'});
}
function atelier(mode){
screen('intro');
var btn={represent:'representModeBtn',equivalent:'equivalentModeBtn',compare:'compareModeBtn',number:'numberModeBtn',percent:'percentModeBtn'}[mode];
if(el(btn))el(btn).click();
title.scrollIntoView({behavior:'smooth',block:'start'});
}
function begin(){run={items:core.map(function(q){return Object.assign({},q);}),at:0,answers:[],assists:{}};screen('diagnostic');display();}
function display(){
var q=run.items[run.at],box=el('dins-choices');
writeFraction(el('dins-question'),q.q);
el('dins-counter').textContent='Question '+(run.at+1)+' sur '+run.items.length;
el('dins-meter').style.width=Math.floor(run.at*100/run.items.length)+'%';
box.replaceChildren();
q.opts.forEach(function(s,i){
var b=document.createElement('button');b.type='button';b.className='dins-choice';writeFraction(b,s);
b.addEventListener('click',function(){answer(i);});box.appendChild(b);
});
el('dins-feedback').className='dins-answer-feedback';
el('dins-feedback').textContent=q.help?'Une question plus simple pour t’aider.':'Choisis une réponse.';
el('dins-next').hidden=true;el('dins-question').focus();
}
function answer(choice){
if(run.answers.some(function(a){return a.position===run.at;}))return;
var q=run.items[run.at],ok=choice===q.a;
run.answers.push({position:run.at,skill:q.skill,correct:ok,help:!!q.help});
Array.from(el('dins-choices').children).forEach(function(b,i){b.disabled=true;if(i===q.a)b.classList.add('right');else if(i===choice)b.classList.add('wrong');});
var msg=el('dins-feedback');writeFraction(msg,(ok?'Bravo ! ':'Pas encore. ')+q.why);msg.className='dins-answer-feedback '+(ok?'good':'needs-work');
if(!ok&&!q.help&&!run.assists[q.skill]){run.assists[q.skill]=true;run.items.splice(run.at+1,0,Object.assign({},help[q.skill]));}
el('dins-next').hidden=false;el('dins-next').textContent=run.at+1>=run.items.length?'Voir mon bilan':'Question suivante';
}
function finish(){
screen('results');
var basic=run.answers.filter(function(a){return !a.help;}),correct=basic.filter(function(a){return a.correct;}).length;
el('dins-summary').textContent=correct+' bonnes réponses sur '+basic.length+' questions principales. Les autres questions étaient des aides adaptées.';
var container=el('dins-remedies');container.replaceChildren();
var weak=Object.keys(modes).filter(function(k){return run.answers.some(function(a){return a.skill===k&&!a.correct;});});
var heading=document.createElement('h4');heading.textContent=weak.length?'Mes activités conseillées':'Bravo, tu peux poursuivre avec les ateliers !';container.appendChild(heading);
weak.forEach(function(k){var data=modes[k],block=document.createElement('div'),h=document.createElement('strong'),p=document.createElement('p'),button=document.createElement('button');
block.className='dins-remedy';h.textContent=data[0];p.textContent=data[2];button.textContent='M’entraîner : '+data[0];button.className='dins-btn dins-btn-primary';button.type='button';button.addEventListener('click',function(){atelier(data[1]);});
block.append(h,p,button);container.appendChild(block);});
}
el('dins-manip').addEventListener('click',function(){atelier('represent');});
el('dins-start').addEventListener('click',begin);
el('dins-return').addEventListener('click',function(){screen('intro');});
el('dins-next').addEventListener('click',function(){run.at++;if(run.at===run.items.length)finish();else display();});
el('dins-restart').addEventListener('click',begin);
el('dins-ateliers').addEventListener('click',function(){atelier('represent');});
})();
