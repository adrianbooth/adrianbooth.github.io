(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const d of n)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function a(n){const d={};return n.integrity&&(d.integrity=n.integrity),n.referrerPolicy&&(d.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?d.credentials="include":n.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(n){if(n.ep)return;n.ep=!0;const d=a(n);fetch(n.href,d)}})();const P="practice-planner:items";function w(){const e=localStorage.getItem(P);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function L(e){localStorage.setItem(P,JSON.stringify(e))}function W(){return crypto.randomUUID()}const p={list(){return w().sort((e,r)=>r.createdAt-e.createdAt)},byCategory(e){return p.list().filter(r=>r.category===e)},get(e){return w().find(r=>r.id===e)},create(e,r,a=""){const o={id:W(),title:e,notes:a,category:r,createdAt:Date.now(),lastPracticedAt:null},n=w();return n.push(o),L(n),o},update(e,r){const a=w(),o=a.find(n=>n.id===e);o&&(Object.assign(o,r),L(a))},markPracticed(e){const r=w(),a=r.find(o=>o.id===e);a&&(a.lastPracticedAt=Date.now(),L(r))},remove(e){L(w().filter(r=>r.id!==e))}},g=["red","review","new"],T={red:"Red",review:"Review",new:"New"},A=20,I=8,R=220;function B(e){const r=g.indexOf(e),a=g[(r-1+g.length)%g.length],o=g[(r+1)%g.length];return{prev:a,next:o}}function O(e,r,a){let o=r,n=!1;function d(t){const i=e.querySelector(".category-carousel"),s=e.querySelector(".category-track"),f=e.querySelectorAll(".category-card"),m=i.clientWidth-A*2;return f.forEach(S=>{S.style.flex=`0 0 ${m}px`}),s.style.gap=`${I}px`,s.style.transition=t?`transform ${R}ms ease`:"none",s.style.transform=`translateX(${-(m+I)+A}px)`,{track:s,cardWidth:m}}function u(){const{prev:t,next:i}=B(o);e.innerHTML=`
      <div class="category-carousel">
        <div class="category-track">
          <button type="button" class="category-card ${t}" data-role="prev">${T[t]}</button>
          <button type="button" class="category-card ${o}" data-role="current">${T[o]}</button>
          <button type="button" class="category-card ${i}" data-role="next">${T[i]}</button>
        </div>
      </div>
    `,d(!1),e.querySelectorAll(".category-card").forEach(s=>{s.addEventListener("click",()=>c(s.dataset.role==="prev"?-1:1))})}function c(t){if(n)return;n=!0;const{track:i,cardWidth:s}=d(!0);i.offsetWidth;const f=-(s+I)+A;i.style.transform=`translateX(${f-t*(s+I)}px)`,window.setTimeout(()=>{const l=g.indexOf(o);o=g[(l+t+g.length)%g.length],n=!1,a(o),u()},R)}return u(),{get value(){return o},reset(t){o=t,u()}}}const U={red:"Red",review:"Review",new:"New"},Y=500;function K(e){e.innerHTML=`
    <h1>Items</h1>
    <form id="add-form">
      <div class="form-row">
        <input type="text" id="title" placeholder="Item name" required />
      </div>
      <div class="form-row" id="category-mount"></div>
      <button type="submit" class="primary">Add item</button>
    </form>
    <h2>All items</h2>
    <ul class="item-list" id="item-list"></ul>
    <div id="edit-overlay"></div>
  `;const r=e.querySelector("#category-mount"),a=O(r,"red",()=>{});e.querySelector("#add-form").addEventListener("submit",c=>{c.preventDefault();const t=e.querySelector("#title"),i=t.value.trim();i&&(p.create(i,a.value),t.value="",n())});function n(){const c=e.querySelector("#item-list"),t=p.list();if(t.length===0){c.innerHTML='<li class="empty-state">No items yet. Add something to Red, Review, or New above.</li>';return}c.innerHTML=t.map(i=>`
        <li class="item-card" data-id="${i.id}">
          <span class="tag ${i.category}">${U[i.category]}</span>
          <span class="title">${N(i.title)}</span>
          <button class="ghost delete-btn" data-id="${i.id}" aria-label="Delete">✕</button>
        </li>`).join(""),c.querySelectorAll(".delete-btn").forEach(i=>{i.addEventListener("click",s=>{s.stopPropagation(),p.remove(i.dataset.id),n()})}),c.querySelectorAll(".item-card").forEach(i=>{d(i,()=>{const s=p.get(i.dataset.id);s&&u(s)})})}function d(c,t){let i,s=!1;const f=()=>{s=!1,i=window.setTimeout(()=>{s=!0,t()},Y)},l=()=>{i!==void 0&&window.clearTimeout(i)};c.addEventListener("pointerdown",f),c.addEventListener("pointerup",l),c.addEventListener("pointerleave",l),c.addEventListener("pointercancel",l),c.addEventListener("click",m=>{s&&(m.preventDefault(),m.stopPropagation())})}function u(c){const t=e.querySelector("#edit-overlay");t.innerHTML=`
      <div class="modal-backdrop">
        <div class="modal">
          <h2>Edit item</h2>
          <div class="form-row">
            <input type="text" id="edit-title" value="${N(c.title)}" />
          </div>
          <div class="form-row" id="edit-category-mount"></div>
          <div class="form-row">
            <textarea id="edit-notes" rows="4" placeholder="Notes (fingering, tempo, cues...)">${N(c.notes)}</textarea>
          </div>
          <div class="runner-controls">
            <button type="button" class="ghost" id="edit-cancel">Cancel</button>
            <button type="button" class="primary" id="edit-save">Save</button>
          </div>
          <button type="button" class="ghost" id="edit-delete" style="margin-top: 0.5rem; width: 100%;">Delete item</button>
        </div>
      </div>
    `;const i=()=>{t.innerHTML=""},s=t.querySelector("#edit-category-mount"),f=O(s,c.category,()=>{});t.querySelector("#edit-cancel").addEventListener("click",i),t.querySelector(".modal-backdrop").addEventListener("click",l=>{l.target===l.currentTarget&&i()}),t.querySelector("#edit-save").addEventListener("click",()=>{const l=t.querySelector("#edit-title").value.trim(),m=t.querySelector("#edit-notes").value,S=f.value;l&&(p.update(c.id,{title:l,notes:m,category:S}),i(),n())}),t.querySelector("#edit-delete").addEventListener("click",()=>{p.remove(c.id),i(),n()})}n()}function N(e){const r=document.createElement("div");return r.textContent=e,r.innerHTML}const C=[{key:"red",label:"Red"},{key:"review",label:"Review"},{key:"new",label:"New"}],D="practice-planner:advance-mode";function V(){return localStorage.getItem(D)==="manual"?"manual":"auto"}function J(e,r){const a=p.list(),o=C.filter(t=>a.every(i=>i.category!==t.key));if(o.length>0){e.innerHTML=`
      <h1>New session</h1>
      <p class="empty-state">
        Add at least one item to each of Red, Review, and New before starting a session.
        Missing: ${o.map(t=>t.label).join(", ")}.
      </p>
    `;return}const n={duration:30,advanceMode:V(),picks:{red:p.byCategory("red")[0].id,review:p.byCategory("review")[0].id,new:p.byCategory("new")[0].id},contextItemId:p.byCategory("red")[0].id};e.innerHTML=`
    <h1>New session</h1>

    <h2>Duration</h2>
    <div class="duration-row" id="duration-row">
      ${[30,45,60].map(t=>`<button data-duration="${t}" class="${t===n.duration?"selected":""}">${t} min</button>`).join("")}
    </div>

    <h2>Advance between sections</h2>
    <div class="duration-row" id="advance-row">
      <button data-mode="auto" class="${n.advanceMode==="auto"?"selected":""}">Auto</button>
      <button data-mode="manual" class="${n.advanceMode==="manual"?"selected":""}">Manual</button>
    </div>

    ${C.map(t=>d(t.key,t.label)).join("")}

    <h2>Context (play in wider context)</h2>
    <div class="item-option-list" id="picker-context"></div>

    <button class="primary" id="start-btn" style="margin-top: 1.5rem;">Start session</button>
  `;function d(t,i){return`
      <h2>${i}</h2>
      <div class="item-option-list" id="picker-${t}"></div>
    `}function u(t,i,s,f){const l=e.querySelector(`#${t}`);l.innerHTML=i.map(m=>`<button class="item-option ${m.category} ${m.id===s?"selected":""}" data-id="${m.id}">${X(m.title)}</button>`).join(""),l.querySelectorAll(".item-option").forEach(m=>{m.addEventListener("click",()=>{f(m.dataset.id),c()})})}function c(){for(const t of C)u(`picker-${t.key}`,p.byCategory(t.key).map(i=>({id:i.id,title:i.title,category:i.category})),n.picks[t.key],i=>{n.picks[t.key]=i});u("picker-context",a.map(t=>({id:t.id,title:t.title,category:t.category})),n.contextItemId,t=>{n.contextItemId=t}),e.querySelectorAll("#duration-row button").forEach(t=>{t.classList.toggle("selected",Number(t.dataset.duration)===n.duration)}),e.querySelectorAll("#advance-row button").forEach(t=>{t.classList.toggle("selected",t.dataset.mode===n.advanceMode)})}e.querySelectorAll("#duration-row button").forEach(t=>{t.addEventListener("click",()=>{n.duration=Number(t.dataset.duration),c()})}),e.querySelectorAll("#advance-row button").forEach(t=>{t.addEventListener("click",()=>{n.advanceMode=t.dataset.mode,c()})}),e.querySelector("#start-btn").addEventListener("click",()=>{localStorage.setItem(D,n.advanceMode);const t={id:crypto.randomUUID(),date:Date.now(),durationMins:n.duration,advanceMode:n.advanceMode,redItemId:n.picks.red,reviewItemId:n.picks.review,newItemId:n.picks.new,contextItemId:n.contextItemId};r(t)}),c()}function X(e){const r=document.createElement("div");return r.textContent=e,r.innerHTML}const h={red:{label:"Red",className:"red"},review:{label:"Review",className:"review"},new:{label:"New",className:"new"},"red-memory":{label:"Red (from memory)",className:"red-memory"},"review-memory":{label:"Review (from memory)",className:"review-memory"},context:{label:"Context",className:"context"}};function F(e){return[{kind:"red",label:h.red.label,itemId:e.redItemId},{kind:"review",label:h.review.label,itemId:e.reviewItemId},{kind:"new",label:h.new.label,itemId:e.newItemId},{kind:"red-memory",label:h["red-memory"].label,itemId:e.redItemId},{kind:"review-memory",label:h["review-memory"].label,itemId:e.reviewItemId},{kind:"context",label:h.context.label,itemId:e.contextItemId}]}function z(){try{const e=new(window.AudioContext||window.webkitAudioContext),r=e.createOscillator(),a=e.createGain();r.connect(a),a.connect(e.destination),r.frequency.value=880,a.gain.setValueAtTime(.001,e.currentTime),a.gain.exponentialRampToValueAtTime(.3,e.currentTime+.02),a.gain.exponentialRampToValueAtTime(.001,e.currentTime+.6),r.start(),r.stop(e.currentTime+.6),r.onended=()=>e.close()}catch{}navigator.vibrate&&navigator.vibrate([200,100,200])}function H(e){const r=Math.floor(e/60),a=e%60;return`${r}:${a.toString().padStart(2,"0")}`}function Q(e,r,a){const o=F(r),n=Math.round(r.durationMins*60/o.length);let d=0,u=n,c=!1,t=!1,i;e.innerHTML='<div class="runner" id="runner"></div>';const s=e.querySelector("#runner");function f(){i!==void 0&&window.clearInterval(i)}function l(y){d=y,u=n,t=!1,x()}function m(){const y=o[d].itemId;p.markPracticed(y);const v=d+1;if(v>=o.length){f(),a();return}r.advanceMode==="auto"?l(v):(t=!0,G(v))}function S(){if(c||t)return;if(u-=1,u<=0){z(),m();return}const y=s.querySelector("#timer");y&&(y.textContent=H(u));const v=s.querySelector("#progress");v&&q(v)}function q(y){y.innerHTML=o.map((v,b)=>`<span class="stage-dot ${b<d?"done":b===d?"active":""}"></span>`).join("")}function x(){const y=o[d],v=p.get(y.itemId),b=h[y.kind];s.innerHTML=`
      <div class="stage-progress" id="progress"></div>
      <div>
        <div class="stage-label ${b.className}">${b.label}</div>
        <div class="item-title">${(v==null?void 0:v.title)??"(item removed)"}</div>
        <div class="item-notes">${(v==null?void 0:v.notes)??""}</div>
      </div>
      <div class="timer" id="timer">${H(u)}</div>
      <div class="runner-controls-grid">
        <div class="runner-controls">
          <button class="ghost" id="restart-btn">Restart</button>
          <button class="ghost" id="pause-btn">${c?"Resume":"Pause"}</button>
        </div>
        <div class="runner-controls">
          <button class="ghost" id="back-btn" ${d===0?"disabled":""}>Back</button>
          <button class="ghost" id="skip-btn">Skip</button>
        </div>
      </div>
    `,q(s.querySelector("#progress")),s.querySelector("#pause-btn").addEventListener("click",()=>{c=!c,s.querySelector("#pause-btn").textContent=c?"Resume":"Pause"}),s.querySelector("#restart-btn").addEventListener("click",()=>{u=n,c=!1,x()}),s.querySelector("#back-btn").addEventListener("click",()=>{d!==0&&l(d-1)}),s.querySelector("#skip-btn").addEventListener("click",()=>{m()})}function G(y){const v=o[y],b=p.get(v.itemId),M=h[v.kind];s.innerHTML=`
      <div class="stage-progress" id="progress"></div>
      <div class="waiting-block">
        <div class="stage-label ${M.className}">Up next</div>
        <div class="item-title">Next: ${M.label}</div>
        <div class="item-notes">${(b==null?void 0:b.title)??""}</div>
      </div>
      <div></div>
      <div class="runner-controls">
        <button class="ghost" id="back-btn" ${d===0?"disabled":""}>Back</button>
        <button class="primary" id="continue-btn">Continue</button>
      </div>
    `,q(s.querySelector("#progress")),s.querySelector("#back-btn").addEventListener("click",()=>{d!==0&&l(d-1)}),s.querySelector("#continue-btn").addEventListener("click",()=>{l(y)})}x(),i=window.setInterval(S,1e3)}function Z(e,r,a){e.innerHTML=`
    <div class="done-screen">
      <h1>Session complete 🎉</h1>
      <p class="empty-state">Nice work. Every stage practiced.</p>
      <div class="runner-controls">
        <button class="ghost" id="items-btn">Back to items</button>
        <button class="primary" id="again-btn">New session</button>
      </div>
    </div>
  `,e.querySelector("#items-btn").addEventListener("click",r),e.querySelector("#again-btn").addEventListener("click",a)}const $=document.querySelector("#app");let E=null;function k(e){location.hash=e}function _(e){$.innerHTML="";const r=document.createElement("nav");r.className="tabs",r.innerHTML=`
    <button data-route="items" class="${e==="items"?"selected":"ghost"}">Items</button>
    <button data-route="setup" class="${e==="setup"||e==="run"||e==="done"?"selected":"ghost"}">Practice</button>
  `,r.querySelectorAll("button").forEach(o=>{o.addEventListener("click",()=>k(o.dataset.route))});const a=document.createElement("div");switch(a.id="content",e==="run"||$.appendChild(r),$.appendChild(a),e){case"items":K(a);break;case"setup":J(a,o=>{E=o,k("run")});break;case"run":if(!E){k("setup");return}Q(a,E,()=>k("done"));break;case"done":Z(a,()=>{E=null,k("items")},()=>{E=null,k("setup")});break}}function j(){const e=location.hash.replace("#","");return e==="setup"||e==="run"||e==="done"||e==="items"?e:"items"}window.addEventListener("hashchange",()=>_(j()));location.hash||(location.hash="items");_(j());"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").catch(()=>{})});
