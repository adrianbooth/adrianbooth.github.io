(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const u of n)if(u.type==="childList")for(const d of u.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function a(n){const u={};return n.integrity&&(u.integrity=n.integrity),n.referrerPolicy&&(u.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?u.credentials="include":n.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function o(n){if(n.ep)return;n.ep=!0;const u=a(n);fetch(n.href,u)}})();const D="practice-planner:items";function E(){const e=localStorage.getItem(D);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function L(e){localStorage.setItem(D,JSON.stringify(e))}function U(){return crypto.randomUUID()}const y={list(){return E().sort((e,r)=>r.createdAt-e.createdAt)},byCategory(e){return y.list().filter(r=>r.category===e)},get(e){return E().find(r=>r.id===e)},create(e,r,a=""){const o={id:U(),title:e,notes:a,category:r,createdAt:Date.now(),lastPracticedAt:null},n=E();return n.push(o),L(n),o},update(e,r){const a=E(),o=a.find(n=>n.id===e);o&&(Object.assign(o,r),L(a))},markPracticed(e){const r=E(),a=r.find(o=>o.id===e);a&&(a.lastPracticedAt=Date.now(),L(r))},remove(e){L(E().filter(r=>r.id!==e))}},b=["red","review","new"],T={red:"Red",review:"Review",new:"New"},A=20,I=8,O=220;function Y(e){const r=b.indexOf(e),a=b[(r-1+b.length)%b.length],o=b[(r+1)%b.length];return{prev:a,next:o}}function P(e,r,a){let o=r,n=!1;function u(t){const i=e.querySelector(".category-carousel"),c=e.querySelector(".category-track"),l=e.querySelectorAll(".category-card"),m=i.clientWidth-A*2;return l.forEach(k=>{k.style.flex=`0 0 ${m}px`}),c.style.gap=`${I}px`,c.style.transition=t?`transform ${O}ms ease`:"none",c.style.transform=`translateX(${-(m+I)+A}px)`,{track:c,cardWidth:m}}function d(){const{prev:t,next:i}=Y(o);e.innerHTML=`
      <div class="category-carousel">
        <div class="category-track">
          <button type="button" class="category-card ${t}" data-role="prev">${T[t]}</button>
          <button type="button" class="category-card ${o}" data-role="current">${T[o]}</button>
          <button type="button" class="category-card ${i}" data-role="next">${T[i]}</button>
        </div>
      </div>
    `,u(!1),e.querySelectorAll(".category-card").forEach(c=>{c.addEventListener("click",()=>s(c.dataset.role==="prev"?-1:1))})}function s(t){if(n)return;n=!0;const{track:i,cardWidth:c}=u(!0);i.offsetWidth;const l=-(c+I)+A;i.style.transform=`translateX(${l-t*(c+I)}px)`,window.setTimeout(()=>{const v=b.indexOf(o);o=b[(v+t+b.length)%b.length],n=!1,a(o),d()},O)}return d(),{get value(){return o},reset(t){o=t,d()}}}const K={red:"Red",review:"Review",new:"New"},V=500;function J(e){e.innerHTML=`
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
  `;const r=e.querySelector("#category-mount"),a=P(r,"red",()=>{});e.querySelector("#add-form").addEventListener("submit",s=>{s.preventDefault();const t=e.querySelector("#title"),i=t.value.trim();i&&(y.create(i,a.value),t.value="",n())});function n(){const s=e.querySelector("#item-list"),t=y.list();if(t.length===0){s.innerHTML='<li class="empty-state">No items yet. Add something to Red, Review, or New above.</li>';return}s.innerHTML=t.map(i=>`
        <li class="item-card" data-id="${i.id}">
          <span class="tag ${i.category}">${K[i.category]}</span>
          <span class="title">${N(i.title)}</span>
          <button class="ghost delete-btn" data-id="${i.id}" aria-label="Delete">✕</button>
        </li>`).join(""),s.querySelectorAll(".delete-btn").forEach(i=>{i.addEventListener("click",c=>{c.stopPropagation(),y.remove(i.dataset.id),n()})}),s.querySelectorAll(".item-card").forEach(i=>{u(i,()=>{const c=y.get(i.dataset.id);c&&d(c)})})}function u(s,t){let i,c=!1;const l=()=>{c=!1,i=window.setTimeout(()=>{c=!0,t()},V)},v=()=>{i!==void 0&&window.clearTimeout(i)};s.addEventListener("pointerdown",l),s.addEventListener("pointerup",v),s.addEventListener("pointerleave",v),s.addEventListener("pointercancel",v),s.addEventListener("click",m=>{c&&(m.preventDefault(),m.stopPropagation())})}function d(s){const t=e.querySelector("#edit-overlay");t.innerHTML=`
      <div class="modal-backdrop">
        <div class="modal">
          <h2>Edit item</h2>
          <div class="form-row">
            <input type="text" id="edit-title" value="${N(s.title)}" />
          </div>
          <div class="form-row" id="edit-category-mount"></div>
          <div class="form-row">
            <textarea id="edit-notes" rows="4" placeholder="Notes (fingering, tempo, cues...)">${N(s.notes)}</textarea>
          </div>
          <div class="runner-controls">
            <button type="button" class="ghost" id="edit-cancel">Cancel</button>
            <button type="button" class="primary" id="edit-save">Save</button>
          </div>
          <button type="button" class="ghost" id="edit-delete" style="margin-top: 0.5rem; width: 100%;">Delete item</button>
        </div>
      </div>
    `;const i=()=>{t.innerHTML=""},c=t.querySelector("#edit-category-mount"),l=P(c,s.category,()=>{});t.querySelector("#edit-cancel").addEventListener("click",i),t.querySelector(".modal-backdrop").addEventListener("click",v=>{v.target===v.currentTarget&&i()}),t.querySelector("#edit-save").addEventListener("click",()=>{const v=t.querySelector("#edit-title").value.trim(),m=t.querySelector("#edit-notes").value,k=l.value;v&&(y.update(s.id,{title:v,notes:m,category:k}),i(),n())}),t.querySelector("#edit-delete").addEventListener("click",()=>{y.remove(s.id),i(),n()})}n()}function N(e){const r=document.createElement("div");return r.textContent=e,r.innerHTML}const C=[{key:"red",label:"Red"},{key:"review",label:"Review"},{key:"new",label:"New"}],_="practice-planner:advance-mode";function X(){return localStorage.getItem(_)==="manual"?"manual":"auto"}function F(e,r){const a=y.list(),o=C.filter(t=>a.every(i=>i.category!==t.key));if(o.length>0){e.innerHTML=`
      <h1>New session</h1>
      <p class="empty-state">
        Add at least one item to each of Red, Review, and New before starting a session.
        Missing: ${o.map(t=>t.label).join(", ")}.
      </p>
    `;return}const n={duration:30,advanceMode:X(),picks:{red:y.byCategory("red")[0].id,review:y.byCategory("review")[0].id,new:y.byCategory("new")[0].id},contextItemId:y.byCategory("red")[0].id};e.innerHTML=`
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

    ${C.map(t=>u(t.key,t.label)).join("")}

    <h2>Context (play in wider context)</h2>
    <div class="item-option-list" id="picker-context"></div>

    <button class="primary" id="start-btn" style="margin-top: 1.5rem;">Start session</button>
  `;function u(t,i){return`
      <h2>${i}</h2>
      <div class="item-option-list" id="picker-${t}"></div>
    `}function d(t,i,c,l){const v=e.querySelector(`#${t}`);v.innerHTML=i.map(m=>`<button class="item-option ${m.category} ${m.id===c?"selected":""}" data-id="${m.id}">${z(m.title)}</button>`).join(""),v.querySelectorAll(".item-option").forEach(m=>{m.addEventListener("click",()=>{l(m.dataset.id),s()})})}function s(){for(const t of C)d(`picker-${t.key}`,y.byCategory(t.key).map(i=>({id:i.id,title:i.title,category:i.category})),n.picks[t.key],i=>{n.picks[t.key]=i});d("picker-context",a.map(t=>({id:t.id,title:t.title,category:t.category})),n.contextItemId,t=>{n.contextItemId=t}),e.querySelectorAll("#duration-row button").forEach(t=>{t.classList.toggle("selected",Number(t.dataset.duration)===n.duration)}),e.querySelectorAll("#advance-row button").forEach(t=>{t.classList.toggle("selected",t.dataset.mode===n.advanceMode)})}e.querySelectorAll("#duration-row button").forEach(t=>{t.addEventListener("click",()=>{n.duration=Number(t.dataset.duration),s()})}),e.querySelectorAll("#advance-row button").forEach(t=>{t.addEventListener("click",()=>{n.advanceMode=t.dataset.mode,s()})}),e.querySelector("#start-btn").addEventListener("click",()=>{localStorage.setItem(_,n.advanceMode);const t={id:crypto.randomUUID(),date:Date.now(),durationMins:n.duration,advanceMode:n.advanceMode,redItemId:n.picks.red,reviewItemId:n.picks.review,newItemId:n.picks.new,contextItemId:n.contextItemId};r(t)}),s()}function z(e){const r=document.createElement("div");return r.textContent=e,r.innerHTML}const h={red:{label:"Red",className:"red"},review:{label:"Review",className:"review"},new:{label:"New",className:"new"},"red-memory":{label:"Red (from memory)",className:"red-memory"},"review-memory":{label:"Review (from memory)",className:"review-memory"},context:{label:"Context",className:"context"}};function Q(e){return[{kind:"red",label:h.red.label,itemId:e.redItemId},{kind:"review",label:h.review.label,itemId:e.reviewItemId},{kind:"new",label:h.new.label,itemId:e.newItemId},{kind:"red-memory",label:h["red-memory"].label,itemId:e.redItemId},{kind:"review-memory",label:h["review-memory"].label,itemId:e.reviewItemId},{kind:"context",label:h.context.label,itemId:e.contextItemId}]}function Z(){try{const e=new(window.AudioContext||window.webkitAudioContext),r=e.createOscillator(),a=e.createGain();r.connect(a),a.connect(e.destination),r.frequency.value=880,a.gain.setValueAtTime(.001,e.currentTime),a.gain.exponentialRampToValueAtTime(.3,e.currentTime+.02),a.gain.exponentialRampToValueAtTime(.001,e.currentTime+.6),r.start(),r.stop(e.currentTime+.6),r.onended=()=>e.close()}catch{}navigator.vibrate&&navigator.vibrate([200,100,200])}function H(e){const r=Math.floor(e/60),a=e%60;return`${r}:${a.toString().padStart(2,"0")}`}function ee(e,r,a,o){const n=Q(r),u=Math.round(r.durationMins*60/n.length);let d=0,s=u,t=!1,i=!1,c;e.innerHTML='<div class="runner" id="runner"></div>';const l=e.querySelector("#runner");function v(){c!==void 0&&window.clearInterval(c)}function m(f){d=f,s=u,i=!1,q()}function k(){const f=n[d].itemId;y.markPracticed(f);const p=d+1;if(p>=n.length){v(),a();return}r.advanceMode==="auto"?m(p):(i=!0,B(p))}function W(){if(t||i)return;if(s-=1,s<=0){Z(),k();return}const f=l.querySelector("#timer");f&&(f.textContent=H(s));const p=l.querySelector("#progress");p&&x(p)}function R(){l.querySelector("#exit-btn").addEventListener("click",()=>{window.confirm("End this practice session? Progress on the current section won't be saved.")&&(v(),o())})}function x(f){f.innerHTML=n.map((p,g)=>`<span class="stage-dot ${g<d?"done":g===d?"active":""}"></span>`).join("")}function q(){const f=n[d],p=y.get(f.itemId),g=h[f.kind];l.innerHTML=`
      <button class="ghost exit-btn" id="exit-btn" aria-label="End session">✕ End</button>
      <div class="stage-progress" id="progress"></div>
      <div>
        <div class="stage-label ${g.className}">${g.label}</div>
        <div class="item-title">${(p==null?void 0:p.title)??"(item removed)"}</div>
        <div class="item-notes">${(p==null?void 0:p.notes)??""}</div>
      </div>
      <div class="timer" id="timer">${H(s)}</div>
      <div class="runner-controls-grid">
        <div class="runner-controls">
          <button class="ghost" id="restart-btn">Restart</button>
          <button class="ghost" id="pause-btn">${t?"Resume":"Pause"}</button>
        </div>
        <div class="runner-controls">
          <button class="ghost" id="back-btn" ${d===0?"disabled":""}>Back</button>
          <button class="ghost" id="skip-btn">Skip</button>
        </div>
      </div>
    `,x(l.querySelector("#progress")),R(),l.querySelector("#pause-btn").addEventListener("click",()=>{t=!t,l.querySelector("#pause-btn").textContent=t?"Resume":"Pause"}),l.querySelector("#restart-btn").addEventListener("click",()=>{s=u,t=!1,q()}),l.querySelector("#back-btn").addEventListener("click",()=>{d!==0&&m(d-1)}),l.querySelector("#skip-btn").addEventListener("click",()=>{k()})}function B(f){const p=n[f],g=y.get(p.itemId),M=h[p.kind];l.innerHTML=`
      <button class="ghost exit-btn" id="exit-btn" aria-label="End session">✕ End</button>
      <div class="stage-progress" id="progress"></div>
      <div class="waiting-block">
        <div class="stage-label ${M.className}">Up next</div>
        <div class="item-title">Next: ${M.label}</div>
        <div class="item-notes">${(g==null?void 0:g.title)??""}</div>
      </div>
      <div></div>
      <div class="runner-controls">
        <button class="ghost" id="back-btn" ${d===0?"disabled":""}>Back</button>
        <button class="primary" id="continue-btn">Continue</button>
      </div>
    `,x(l.querySelector("#progress")),R(),l.querySelector("#back-btn").addEventListener("click",()=>{d!==0&&m(d-1)}),l.querySelector("#continue-btn").addEventListener("click",()=>{m(f)})}q(),c=window.setInterval(W,1e3)}function te(e,r,a){e.innerHTML=`
    <div class="done-screen">
      <h1>Session complete 🎉</h1>
      <p class="empty-state">Nice work. Every stage practiced.</p>
      <div class="runner-controls">
        <button class="ghost" id="items-btn">Back to items</button>
        <button class="primary" id="again-btn">New session</button>
      </div>
    </div>
  `,e.querySelector("#items-btn").addEventListener("click",r),e.querySelector("#again-btn").addEventListener("click",a)}const $=document.querySelector("#app");let S=null;function w(e){location.hash=e}function j(e){$.innerHTML="";const r=document.createElement("nav");r.className="tabs",r.innerHTML=`
    <button data-route="items" class="${e==="items"?"selected":"ghost"}">Items</button>
    <button data-route="setup" class="${e==="setup"||e==="run"||e==="done"?"selected":"ghost"}">Practice</button>
  `,r.querySelectorAll("button").forEach(o=>{o.addEventListener("click",()=>w(o.dataset.route))});const a=document.createElement("div");switch(a.id="content",e==="run"||$.appendChild(r),$.appendChild(a),e){case"items":J(a);break;case"setup":F(a,o=>{S=o,w("run")});break;case"run":if(!S){w("setup");return}ee(a,S,()=>w("done"),()=>{S=null,w("items")});break;case"done":te(a,()=>{S=null,w("items")},()=>{S=null,w("setup")});break}}function G(){const e=location.hash.replace("#","");return e==="setup"||e==="run"||e==="done"||e==="items"?e:"items"}window.addEventListener("hashchange",()=>j(G()));location.hash||(location.hash="items");j(G());"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").catch(()=>{})});
