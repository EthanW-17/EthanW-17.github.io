const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html','utf8');
const source = html.match(/function p3fOverlap[\s\S]*?\n    }/)[0];
const overlap = new Function(source+';return p3fOverlap')();
let checks=0;
function near(a,b,tol=1e-10){assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);checks++;}
for(let n=1;n<=8;n++){
  near(overlap(.5,n,1,1).eta,n%2 ? 8/(n*Math.PI)**2 : 0);
  if(n%2 || n%4===0) near(overlap(.5,n,1,-1).eta,0);
  else near(overlap(.5,n,1,-1).eta,32/(n*Math.PI)**2);
  for(const r of [0,.05,.25,.37,.5,.63,.95,1]) for(const p1 of [-1,1]) for(const p2 of [-1,1]){
    const v=overlap(r,n,p1,p2);
    assert.ok(v.eta>=0 && v.eta<=1);
    near(v.eta,overlap(r,n,-p1,-p2).eta);
    near(v.eta,overlap(1-r,n,p2,p1).eta);
    // Independent midpoint quadrature, separately integrated on each layer.
    let integral=0; const count=4000;
    for(const [a,b,p] of [[0,r,p1],[r,1,p2]]) for(let j=0;j<count;j++) integral+=p*Math.sin(n*Math.PI*(a+(b-a)*(j+.5)/count))*(b-a)/count;
    near(v.i1+v.i2,integral,2e-7);
  }
}
assert.ok(overlap(.37,1,1,-1).eta>0);
for(const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Function(script[1]);
console.log(`${checks} numerical checks passed; inline JavaScript parses.`);
// Exercise the actual UI updater and handlers without a browser dependency.
const vm = require('node:vm');
const elements = new Map();
for(const id of html.matchAll(/id="([^"]+)"/g)) elements.set(id[1],{value:'',textContent:'',attrs:{},listeners:{},setAttribute(k,v){this.attrs[k]=v;},addEventListener(k,f){this.listeners[k]=f;}});
const $=id=>{assert.ok(elements.has(id),`missing ${id}`);return elements.get(id)};
$('p3f-ratio').value='.5';$('p3f-mode').value='2';$('p3f-p1').value='1';$('p3f-p2').value='-1';
const ui=html.slice(html.indexOf('    function p3fOverlap'),html.indexOf('    let orbitPaused'));
vm.runInNewContext(ui,{$,Math,Number,String});
assert.match($('p3f-metric').textContent,/0.8106/);
$('p3f-ratio').value='.37';$('p3f-mode').value='1';$('p3f-ratio').listeners.input();
assert.ok(!$('p3f-metric').textContent.includes('0.0000'));
$('p3f-equal').listeners.click();assert.match($('p3f-metric').textContent,/0.0000/);
$('reset-wave').listeners.click();assert.match($('p3f-metric').textContent,/0.8106/);
for(const r of [.05,.95])for(let n=1;n<=8;n++){
$('p3f-ratio').value=String(r);$('p3f-mode').value=String(n);$('p3f-mode').listeners.input();
assert.ok(!/NaN|Infinity/.test($('p3f-strain').attrs.d+$('p3f-weighted').attrs.d));
assert.equal(($('p3f-weighted').attrs.d.match(/M/g)||[]).length,2);
}
console.log('UI updater, input handlers, equal/reset and extreme SVG paths passed.');
