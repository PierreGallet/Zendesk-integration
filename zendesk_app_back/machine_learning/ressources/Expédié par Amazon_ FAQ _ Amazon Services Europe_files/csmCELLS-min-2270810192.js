(function(b,a){if(!b.useCel||b.ue_cel){return;
}b.ue_cel=(function(){var o=600000,h=[],j=[],d="csmCELLSframework",g="cel",k,p=b.ue,f=b.uet,c=b.uex,e=p.rid;
function m(){var s=a.performance||a.webkitPerformance,r=s&&s.navigation&&s.navigation.type==2,q=document.ue_backdetect&&document.ue_backdetect.ue_back&&document.ue_backdetect.ue_back.value,t=p.bfini;
if(r||(t&&(t>1))||(!t&&q&&(q>1))){return 1;
}return 0;
}function i(r,q){if(q){q.r=e;
}else{q={r:e,c:1};
}p.log(r,g,q);
}p.isBF=m();
if(p.isBF){i({k:"bft",t:p.d()});
return;
}if(typeof f=="function"){f("bb",d,{wb:1});
}function l(){var q=h.length;
if(q>0){var r=[];
for(var t=0;
t<q;
t++){var s=h[t].api;
if(s.ready()){s.on({ts:p.d,ns:g});
j.push(h[t]);
i({k:"mso",n:h[t].name,t:p.d()});
}else{r.push(h[t]);
}}h=r;
}}setTimeout(l,0);
function n(){if(!n.executed){for(var r=0;
r<j.length;
r++){if(j[r].api.off){j[r].api.off({ts:p.d,ns:g});
}}i({k:"eod",t0:p.t0,t:p.d()},{c:1});
n.executed=1;
for(var q=0;
q<j.length;
q++){h.push(j[q]);
}j=[];
clearTimeout(k);
}}p.onunload(n);
k=setTimeout(n,o);
if(typeof c=="function"){c("ld",d,{wb:1});
}return{registerModule:function(q,r){h.push({name:q,api:r});
i({k:"mrg",n:q,t:p.d()});
l();
},reset:function(r){i({k:"rst",t0:p.t0,t:p.d()});
e=r||p.rid;
h=h.concat(j);
j=[];
var q=h.length;
for(var s=0;
s<q;
s++){h[s].api.off();
h[s].api.reset();
}l();
clearTimeout(k);
k=setTimeout(n,o);
n.executed=0;
},log:i};
})();
})(ue_csm,window);
(function(a,c,b){if(!a.useCel||a.ue_pdm){return;
}if(ue.isBF){return;
}a.ue_pdm=(function(){var t,s,q,o,l,j,g="csmCELLSpdm",i,m=0,p=0,r=a.ue,k=a.ue_cel.log,h=a.uet,f=a.uex;
if(typeof h=="function"){h("bb",g,{wb:1});
}function e(){var v={w:t.width,aw:t.availWidth,h:t.height,ah:t.availHeight,cd:t.colorDepth,pd:t.pixelDepth};
var u={w:b.body.scrollWidth,h:b.body.scrollHeight};
if(!l||l.w!=v.w||l.h!=v.h||l.aw!=v.aw||l.ah!=v.ah||l.pd!=v.pd||l.cd!=v.cd){l=v;
l.t=q();
l.k="sci";
k(l);
}if(!j||j.w!=u.w||j.h!=u.h){j=u;
j.t=q();
j.k="doi";
k(j);
}s=setTimeout(e,o);
}function d(){k({k:"ebl",t:q()});
}function n(){k({k:"efo",t:q()});
}return{on:function(u){o=u.timespan||500;
q=u.ts;
i=u.ns;
t=c.screen;
if(r.attach){r.attach("blur",d,c);
r.attach("focus",n,c);
}setTimeout(e,0);
if(typeof f=="function"){f("ld",g,{wb:1});
}},off:function(u){clearTimeout(s);
if(r.detach){r.detach("blur",d,c);
r.detach("focus",n,c);
}if(r.count){r.count("cel.PDM.TotalExecutions",p);
r.count("cel.PDM.TotalExecutionTime",m);
r.count("cel.PDM.AverageExecutionTime",m/p);
}},ready:function(){return b.body&&a.ue_cel&&a.ue_cel.log;
},reset:function(){j=null;
l=null;
}};
})();
if(a.ue_cel){a.ue_cel.registerModule("page module",a.ue_pdm);
}})(ue_csm,window,document);
(function(a,b){if(!a.useCel||a.ue_vpm){return;
}if(ue.isBF){return;
}a.ue_vpm=(function(){var i,c,g,q,f="csmCELLSvpm",h,r=0,u=0,n=a.ue,e=a.ue_cel.log,l=a.uet,j=a.uex,o=n.attach,s=n.detach,m=a.ue_ueh;
if(typeof l=="function"){l("bb",f,{wb:1});
}function d(){var w=q(),v={w:b.innerWidth,h:b.innerHeight,x:b.pageXOffset,y:b.pageYOffset};
if(!i||i.w!=v.w||i.h!=v.h||i.x!=v.x||i.y!=v.y){v.t=w;
v.k="vpi";
i=v;
e(i);
}if(m){c=0;
}else{c=setTimeout(d,g);
}r=q()-w;
u+=1;
}function k(){if(c){return;
}c=setTimeout(d,g);
}function p(){if(o){o("scroll",k);
o("resize",k);
}}function t(){if(s){s("scroll",k);
s("resize",k);
}}return{on:function(v){q=v.ts;
h=v.ns;
g=v.timespan||100;
setTimeout(d,0);
if(m){p();
}if(typeof j=="function"){j("ld",f,{wb:1});
}},off:function(v){clearTimeout(c);
if(m){t();
}if(n.count){n.count("cel.VPI.TotalExecutions",u);
n.count("cel.VPI.TotalExecutionTime",r);
n.count("cel.VPI.AverageExecutionTime",r/u);
}},ready:function(){return a.ue_cel&&a.ue_cel.log;
},reset:function(){i=undefined;
},getVpi:function(){return i;
}};
})();
if(a.ue_cel){a.ue_cel.registerModule("viewport module",a.ue_vpm);
}})(ue_csm,window);
(function(c,e,d){var b=c.ue||{};
function a(){return c.useCelFF&&!b.isBF&&!c.ue_fem&&d.querySelector&&e.getComputedStyle&&[].forEach;
}if(!a()){return;
}c.ue_fem=(function(){var J=50,U=10,i=3000,M,v="csmCELLSfem",h=[],N=function(){},I=[],o=c.ue_cel.log,B,s,t,T,C=e.MutationObserver||e.WebKitMutationObserver||e.MozMutationObserver,l=!!C,Q,r,S="DOMAttrModified",z="DOMNodeInserted",O="DOMNodeRemoved",R,L,x=-i;
if(typeof uet=="function"){uet("bb",v,{wb:1});
}function n(){window.setTimeout(function(){I.splice(0).forEach(function(W){o(W);
});
},0);
}function y(W,X){I.push({n:W.cel_n,t:X,k:"ewd"});
}function V(W,X){I.push({n:W.cel_n,w:W.cel_b.w,h:W.cel_b.h,d:W.cel_b.d,x:W.cel_b.x,y:W.cel_b.y,t:X,k:"ewi",cl:W.className});
}function p(W,X){I.push({n:W.cel_n,w:W.cel_b.w,h:W.cel_b.h,d:W.cel_b.d,x:W.cel_b.x,y:W.cel_b.y,t:X,k:"ewi"});
}function u(ac){var Z={x:e.pageXOffset,y:e.pageYOffset};
for(var Y=0;
Y<h.length;
Y++){var W=h[Y];
if(!W.w||!W.w.length){continue;
}for(var aa=0;
aa<W.w.length;
aa++){var ab=W.w[aa],X=k(ab,Z);
if(X&&!ab.cel_b){ab.cel_b=X;
V(ab,ac);
}else{if(X&&K(ab.cel_b,X)){ab.cel_b=X;
p(ab,ac);
}}}}}function g(W){if(W.c){return d.getElementsByClassName(W.c);
}if(W.id){return[d.getElementById(W.id)];
}return d.querySelectorAll(W.s);
}function F(ad){for(var X=0;
X<h.length;
X++){var W=h[X],Y=g(W),ab=(W.w||[]),Z;
for(Z=0;
Z<ab.length;
Z++){var ac=ab[Z];
if(!B.contains(ac)){y(ac,ad);
}}W.w=[];
for(Z=0;
Z<Y.length;
Z++){var aa=Y[Z];
if(!aa){continue;
}if(!aa.cel_n){aa.cel_n=aa.getAttribute("cel_widget_id")||(W.id_gen||N)(aa,Z)||aa.id;
}W.w.push(aa);
}}f();
}function k(Y,X){try{return D(Y,X);
}catch(W){}}function D(Y,X){if(!Y){return;
}var W=Y.getBoundingClientRect();
return{x:(W.left+X.x)|0,y:(W.top+X.y)|0,w:W.width|0,h:W.height|0,d:(Y.offsetWidth===0&&Y.offsetHeight===0)|0};
}function w(X,W){if(X>W){return X-W<3;
}else{return W-X<3;
}}function K(X,W){return !(w(X.x,W.x)&&w(X.y,W.y)&&w(X.w,W.w)&&w(X.h,W.h)&&(X.d===W.d));
}function j(){if(!L){L=e.setTimeout(function(){L=null;
E("dwe",F);
n();
},J);
}}function f(){if(!L&&!R){R=e.setTimeout(function(){R=null;
E("dwpc",u);
n();
},J);
}}function q(X,W){if(X<=U){return 0;
}if((W-x)>=i){x=W;
return 0;
}ue_fem.off();
return 1;
}function E(X,ab){var aa=M();
ab(aa);
var W=M(),Z=W-aa,Y=q(Z,W);
if(I.length||Y){I.push({k:"ewt",e:X,d:Z,ex:Y,t:M()});
}}function G(){var X={attributes:true,subtree:true},W={childList:true};
Q=new C(f);
r=new C(j);
Q.observe(B,X);
r.observe(B,W);
r.observe(s,X);
}function H(){t.call(B,S,f);
t.call(B,z,j);
t.call(B,O,j);
t.call(s,z,f);
t.call(s,O,f);
}function P(){if(l){G();
}else{H();
}}function m(){if(r){r.disconnect();
r=null;
}if(Q){Q.disconnect();
Q=null;
}T.call(B,S,f);
T.call(B,z,j);
T.call(B,O,j);
T.call(s,z,f);
T.call(s,O,f);
}function A(){return t&&T&&B&&B.contains&&B.getBoundingClientRect&&M;
}return{on:function(W){B=d.body;
s=d.head;
t=B.addEventListener;
T=B.removeEventListener;
M=W.ts;
h=c.cel_widgets||[];
function X(){if(A()){P();
j();
}}if(b.deffered){X();
}else{if(b.attach){b.attach("load",X);
}}if(typeof uex=="function"){uex("ld",v,{wb:1});
}},off:function(){if(A()){m();
}},ready:function(){return c.ue_cel&&c.ue_cel.log;
},reset:function(){h=c.cel_widgets||[];
}};
})();
if(c.ue_cel&&c.ue_fem){c.ue_cel.registerModule("features module",c.ue_fem);
}})(ue_csm,window,document);
