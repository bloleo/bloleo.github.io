(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();const z=["recibida-mia.jpeg","recibida-mate.jpeg"],R=["food/1.jpeg","food/2.jpeg","food/3.jpeg","food/4.jpeg","food/5.jpeg","food/6.jpeg","food/7.jpeg","food/9.jpeg"];window.misFotosDeViaje=["mendoza/airport.jpeg","mendoza/giaquinta.jpeg","mendoza/me-vinito.jpeg","mendoza/us-almuerzo.jpeg","mendoza/you-vinito.jpeg","mendoza/resting-aconcagua.jpeg","mendoza/viniedo-mountains.jpeg","mendoza/laguna-aconcagua.jpeg","mendoza/birdie2-aconcagua.jpeg","mendoza/us-aconcagua2.jpeg","mendoza/parque-san-martin.jpeg","mendoza/mendoza-7.jpg","mendoza/mendoza-2.jpg","mendoza/mendoza-8.jpg","mendoza/mendoza-1.jpg","mendoza/mendoza-6.jpg","mendoza/mendoza-5.jpg","mendoza/mendoza-3.jpg","mendoza/mendoza-4.jpg","mendoza/kiss-aconcagua.jpeg","mendoza/us-aconcagua.jpeg"];window.currentTravelPhoto=0;const N=["movie_prisoners.jpg","movie_interstellar.jpg","movie_crepusculo.jpg","movie_flow.jpg","movie_nocturnal_animals.jfif","movie_MI.jfif","movie_nightcrawler.jpg","movie_doubt.jpg","movie_magnolia.png","movie_manchester.jpg","movie_ripley.jpeg","serie_mindhunter.jpg","serie_severance.jpg","serie_true_detective.jfif","serie_hannibal.jpg","serie_pluribus.jfif"],F=["it-takes2.jpg","bokura.png","AC2.jfif"];window.fotosRecuerdos=["varias/first-official-date.jpeg","varias/first-selfie.jpeg","varias/bucito.jpeg","varias/las-heras.jpeg","varias/us-time.jpeg","varias/ultima-materia.jpeg","varias/rio-cuarto-vuelta.jpeg","varias/concurso.jpeg","varias/chic.jpeg","varias/chefcito.jpeg","varias/bday.jpeg","varias/last-day.jpeg","varias/placita.jpeg","varias/coffee-post-gun-museum.jpeg","varias/eepyhead.jpeg","varias/silksong.jpeg","varias/backroom.jpeg","varias/areco-coffee.jpeg","varias/rio.jpeg","varias/nap.jpeg","varias/san-telmo.jpeg","varias/kiss.jpeg","varias/candy.jpeg","varias/shared-time.jpeg","varias/tarde-placita.jpeg","varias/us.jpeg"];window.currentRecuerdoPhoto=0;class _{constructor(){this.currentSceneId=null,this.scenes=new Map}registerScene(t,o){this.scenes.set(t,{element:document.getElementById(t),onEnter:o.onEnter||null,onExit:o.onExit||null})}transitionTo(t,o=1e3){const s=this.scenes.get(this.currentSceneId),n=this.scenes.get(t);if(!n){console.error(`Scene ${t} not found`);return}s&&(s.onExit&&s.onExit(),s.element.classList.remove("scene--fade-in"),s.element.offsetWidth,s.element.classList.add("scene--fade-out"),setTimeout(()=>{s.element.classList.remove("scene--active","scene--fade-out")},o)),setTimeout(()=>{n.element.classList.remove("scene--fade-out"),n.element.offsetWidth,n.element.classList.add("scene--active","scene--fade-in"),this.currentSceneId=t,setTimeout(()=>{n.onEnter&&n.onEnter()},600)},s?o:0)}getCurrentSceneId(){return this.currentSceneId}}const r=new _,E=document.getElementById("mailbox"),w=document.getElementById("bg-music");let P=!1;r.registerScene("scene-mail",{onEnter:()=>{}});E.addEventListener("click",()=>{w&&!P&&(A(w),P=!0,setTimeout(()=>{const e=document.getElementById("music-controls");e&&(e.classList.remove("opacity-0"),e.classList.add("opacity-100"))},1e3)),E.style.transform="scale(0.9) rotate(-10deg)",E.style.transition="all 0.3s ease",r.transitionTo("scene-letter")});function A(e){e.volume=0,e.play();let t=0;const o=.3,s=setInterval(()=>{t<o?(t+=.03,e.volume=Math.min(t,o)):clearInterval(s)},200)}function V(){const e=document.getElementById("play-pause-btn"),t=document.getElementById("volume-slider"),o=document.getElementById("volume-icon");e&&e.addEventListener("click",()=>{w.paused?(w.play(),e.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        `):(w.pause(),e.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        `)}),t&&(t.addEventListener("input",s=>{const n=s.target.value/100,i=Math.pow(n,2);w.volume=i,i===0?o.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        `:i<.25?o.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
          </svg>
        `:o.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        `}),t.value=55)}const a=document.getElementById("next-line-btn"),j=document.getElementById("next-button-container");let u=0,h=[],k=!1;const T=9515.7;let y=!1;r.registerScene("scene-letter",{onEnter:()=>{h=document.querySelectorAll(".seq-line"),u=0,y=!1,setTimeout(()=>{j.classList.add("opacity-100"),j.classList.remove("opacity-0")},500)}});function q(){const e=document.getElementById("distance-number");if(!e)return;let t=0;const s=T/(2e3/16),n=setInterval(()=>{t+=s,t>=T?(t=T,clearInterval(n),k=!1,e.textContent=t.toLocaleString("es-ES",{minimumFractionDigits:1,maximumFractionDigits:1})):e.textContent=Math.floor(t).toLocaleString("es-ES")},16)}function $(){if(u>=h.length){y=!0,a.textContent="Continuar →";return}const e=h[u];if(e.classList.contains("distance-counter-container")&&!k){k=!0,e.classList.add("is-visible"),setTimeout(()=>{q()},300),u++,a.textContent="Contando distancia...",a.disabled=!0,setTimeout(()=>{a.disabled=!1,u>=h.length?(y=!0,a.textContent="Continuar →"):a.textContent="Siguiente línea →"},2100);return}e.classList.add("is-visible"),u++,u>=h.length?(y=!0,a.textContent="Continuar →"):a.textContent="Siguiente línea →"}a.addEventListener("click",()=>{y?r.transitionTo("scene-3",1200):$()});let m=0;r.registerScene("scene-3",{onEnter:()=>{W()}});function H(){const e=new Date("2024-11-29"),o=new Date().getTime()-e.getTime();return Math.floor(o/(1e3*3600*24))}function O(){m=H();const e=[m];let t,o;do t=m+Math.floor(Math.random()*10)-5,t=Math.max(1,t);while(t===m||e.includes(t));do o=m+Math.floor(Math.random()*15)-7,o=Math.max(1,o);while(o===m||e.includes(o));return e.push(t,o),e.sort(()=>Math.random()-.5),document.querySelectorAll(".guess-btn span").forEach((n,i)=>{n.textContent=e[i],n.parentElement.dataset.days=e[i]}),e}function G(){const e=document.querySelectorAll(".guess-btn"),t=document.getElementById("correct-message"),o=document.getElementById("incorrect-message"),s=document.getElementById("guess-feedback");e.forEach(n=>{const i=n.cloneNode(!0);n.parentNode.replaceChild(i,n)}),document.querySelectorAll(".guess-btn").forEach(n=>{n.addEventListener("click",()=>{parseInt(n.dataset.days)===m?(t.classList.remove("hidden"),o.classList.add("hidden"),s.classList.remove("opacity-0"),s.classList.add("opacity-100"),document.querySelectorAll(".guess-btn").forEach(c=>{c.disabled=!0,c.classList.remove("hover:bg-rose-200","hover:scale-105"),c.classList.add("opacity-50")}),n.classList.remove("bg-rose-100","border-rose-300"),n.classList.add("bg-green-100","border-green-400"),setTimeout(()=>{r.transitionTo("scene-4")},2e3)):(t.classList.add("hidden"),o.classList.remove("hidden"),s.classList.remove("opacity-0"),s.classList.add("opacity-100"),n.classList.remove("bg-rose-100"),n.classList.add("bg-red-100","border-red-300"),setTimeout(()=>{n.classList.remove("bg-red-100","border-red-300"),n.classList.add("bg-rose-100","border-rose-300"),s.classList.add("opacity-0"),s.classList.remove("opacity-100")},1e3))})})}function W(){O(),G();const e=document.getElementById("guess-feedback");e.classList.add("opacity-0"),e.classList.remove("opacity-100"),document.querySelectorAll(".guess-btn").forEach(t=>{t.disabled=!1,t.classList.add("hover:bg-rose-200","hover:scale-105"),t.classList.remove("opacity-50","bg-green-100","border-green-400","bg-red-100","border-red-300"),t.classList.add("bg-rose-100","border-rose-300")})}let l=0,g=[];r.registerScene("scene-4",{onEnter:()=>{X()}});function K(){return[{id:"slide-te-amo",render:()=>`
        <div class="text-center flex flex-col items-center justify-center">
          <p class="text-xl md:text-2xl text-amber-900 mb-6 font-caveat">Intercambiamos por chat un aproximado de</p>
          
          <p class="text-7xl md:text-8xl font-bold font-caveat text-rose-500 mb-8">
            <span id="te-amo-counter">0</span>
          </p>
          
          <div class="relative bg-[#25D366] font-caveat text-white px-6 py-3 rounded-2xl rounded-tr-none shadow-lg flex items-center gap-2">
            <span class="font-bold tracking-wide">Te amo</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
            
            <div class="absolute -top-0 -right-2 w-0 h-0 border-t-[10px] border-t-[#25D366] border-r-[10px] border-r-transparent"></div>
          </div>
        </div>
      `,onEnter:()=>{Y()}},{id:"slide-peliculas",render:()=>`
        <div class="text-center w-full max-w-2xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-caveat mb-6 text-amber-900 leading-none">Vimos unas cuantas pelis y series</h2>
          
          <div class="grid grid-cols-4 md:grid-cols-8 gap-1.5 px-2">
            ${N.map(e=>`
              <div class="aspect-[2/3] bg-neutral-200 rounded shadow-sm overflow-hidden border border-white hover:scale-110 transition duration-300">
                <img src="/movie/${e}" class="w-full h-full object-cover" alt="Poster">
              </div>
            `).join("")}
          </div>
        </div>
      `},{id:"slide-food",render:()=>`
        <div class="text-center w-full max-w-4xl mx-auto px-2 flex flex-col justify-center min-h-full">
          <p class="text-2xl md:text-3xl mb-4 font-caveat text-amber-900">Me cocinaste comidita muy rica</p>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-3 gap-y-4 justify-items-center items-center py-2">
            ${R.map((e,t)=>{const o=(t%2===0?"-":"")+(Math.floor(Math.random()*6)+2);return`
                <div onclick="window.openLightbox(${t}, fotosFood)" 
                    class="cursor-zoom-in bg-white p-1 shadow-lg transform rotate-[${o}deg] hover:rotate-0 hover:scale-105 transition duration-300 w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
                  <img src="/${e}" class="w-full h-full object-cover border border-neutral-100">
                </div>
              `}).join("")}
          </div>
        </div>
      `},{id:"slide-graduacion",render:()=>`
        <div class="text-center w-full max-w-2xl mx-auto px-4">
          <p class="text-3xl md:text-4xl mb-8 font-caveat text-amber-900">¡Nos recibimos!</p>
          
          <div class="flex flex-col md:flex-row justify-center items-center gap-6">
            <div onclick="window.openLightbox(0, fotosGraduacion)" 
                 class="cursor-zoom-in bg-green-100 rounded-xl overflow-hidden shadow-xl border-4 border-white transform -rotate-2 hover:rotate-0 transition duration-300 w-full max-w-[280px]">
              <img src="${z[0]}" class="w-full h-64 object-cover">
            </div>
            
            <div onclick="window.openLightbox(1, fotosGraduacion)" 
                 class="cursor-zoom-in bg-green-100 rounded-xl overflow-hidden shadow-xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-300 w-full max-w-[280px]">
              <img src="${z[1]}" class="w-full h-64 object-cover">
            </div>
          </div>
        </div>
      `},{id:"slide-viaje",render:()=>`
        <div class="text-center flex flex-col items-center w-full">
          <h2 class="text-3xl md:text-4xl font-caveat mb-6 text-amber-900">Compartimos nuestro primer viaje</h2>
          
          <div class="flex items-center justify-center gap-2 w-full max-w-lg">
            <button id="travel-prev" class="w-10 h-10 flex items-center justify-center transition hover:scale-110 active:scale-90">
              <img src="/wine.png" alt="Prev" class="w-full h-full transform rotate-180">
            </button>
            
            <div id="travel-photo-container" 
                class="cursor-zoom-in bg-blue-100 rounded-xl h-72 md:h-80 flex-1 shadow-lg overflow-hidden border-4 border-white">
              <img id="travel-photo-display" src="${window.misFotosDeViaje[window.currentTravelPhoto]}" class="w-full h-full object-cover">
            </div>

            <button id="travel-next" class="w-10 h-10 flex items-center justify-center transition hover:scale-110 active:scale-90">
              <img src="/wine.png" alt="Next" class="w-full h-full">
            </button>
          </div>
        </div>
      `,onEnter:()=>{Q()}},{id:"slide-siestas",render:()=>`
        <div class="text-center w-full max-w-4xl mx-auto px-2">
          <p class="text-2xl md:text-3xl text-neutral-700 mb-10 font-caveat font-bold">Dormimos varias siestitas</p>
          
          <div class="flex flex-row flex-wrap justify-center items-center gap-2 md:gap-4 py-4">
            <div onclick="window.openLightbox(0, fotosSiestas)" 
                class="cursor-zoom-in bg-white p-1.5 shadow-xl transform -rotate-12 hover:rotate-0 transition duration-300 w-32 h-32 md:w-44 md:h-44 flex-shrink-0">
              <img src="/nap/1.jpeg" class="w-full h-full object-cover">
            </div>
            
            <div onclick="window.openLightbox(1, fotosSiestas)" 
                class="cursor-zoom-in bg-white p-1.5 shadow-xl transform rotate-6 hover:rotate-0 transition duration-300 w-32 h-32 md:w-44 md:h-44 flex-shrink-0 -mt-8">
              <img src="/nap/2.jpeg" class="w-full h-full object-cover">
            </div>
            
            <div onclick="window.openLightbox(2, fotosSiestas)" 
                class="cursor-zoom-in bg-white p-1.5 shadow-xl transform -rotate-3 hover:rotate-0 transition duration-300 w-32 h-32 md:w-44 md:h-44 flex-shrink-0 mt-4">
              <img src="/nap/3.jpeg" class="w-full h-full object-cover">
            </div>
            
            <div onclick="window.openLightbox(3, fotosSiestas)" 
                class="cursor-zoom-in bg-white p-1.5 shadow-xl transform rotate-12 hover:rotate-0 transition duration-300 w-32 h-32 md:w-44 md:h-44 flex-shrink-0 -mt-4">
              <img src="/nap/4.jpeg" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      `},{id:"slide-games",render:()=>`
        <div class="text-center w-full max-w-xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-caveat mb-6 text-amber-900 leading-none">Exploramos algunos juegos</h2>
          
          <div class="grid grid-cols-4 md:grid-cols-3 gap-1.5 px-2">
            ${F.map(e=>`
              <div class="aspect-1 bg-neutral-200 rounded shadow-sm overflow-hidden border border-white hover:scale-110 transition duration-300">
                <img src="/game/${e}" class="w-full h-full object-cover" alt="Poster">
              </div>
            `).join("")}
          </div>
          <p class="text-sm font-caveat text-rose-900">(It takes 2 and AC2 cry in abandoned)</p>
        </div>
      `},{id:"slide-fotos",render:()=>`
        <div class="text-center flex flex-col items-center justify-center w-full">
          <p class="text-3xl md:text-4xl font-caveat text-amber-900 mb-6">Y generamos muchos recuerdos 📸</p>
          
          <div class="flex items-center justify-center gap-2 w-full max-w-sm">
            <button id="photo-prev" class="w-12 h-12 flex items-center justify-center transition hover:scale-110 active:scale-90">
              <img src="/bcs-mug.png" alt="Prev" 
                  class="w-full h-full object-contain transform">
            </button>

            <div id="photo-container" class="cursor-zoom-in bg-yellow-100 rounded-xl h-72 md:h-80 flex-1 shadow-xl flex items-center justify-center overflow-hidden border-4 border-white">
                <img id="carousel-photo-display" src="${window.fotosRecuerdos[window.currentRecuerdoPhoto]}" class="w-full h-full object-cover">
            </div>

            <button id="photo-next" class="w-12 h-12 flex items-center justify-center transition hover:scale-110 active:scale-90">
              <img src="/bcs-mug.png" alt="Next" class="w-full h-full object-contain transform">
            </button>
          </div>
          
          <p id="photo-caption" class="text-base text-neutral-600 italic mt-4 font-caveat">Nuestros recuerdos juntos</p>
        </div>
      `,onEnter:()=>{J()}}]}function Q(){window.currentTravelPhoto===void 0&&(window.currentTravelPhoto=0);const e=document.getElementById("travel-photo-display"),t=document.getElementById("travel-photo-container"),o=document.getElementById("travel-prev"),s=document.getElementById("travel-next");t&&(t.onclick=()=>{window.openLightbox(window.currentTravelPhoto,window.misFotosDeViaje)}),o&&s&&(o.onclick=n=>{n.stopPropagation(),window.currentTravelPhoto=(window.currentTravelPhoto-1+window.misFotosDeViaje.length)%window.misFotosDeViaje.length,e.src=window.misFotosDeViaje[window.currentTravelPhoto]},s.onclick=n=>{n.stopPropagation(),window.currentTravelPhoto=(window.currentTravelPhoto+1)%window.misFotosDeViaje.length,e.src=window.misFotosDeViaje[window.currentTravelPhoto]})}function Y(){const e=document.getElementById("te-amo-counter");if(!e)return;let t=0;const o=215,n=o/(2e3/16),i=setInterval(()=>{t+=n,t>=o&&(t=o,clearInterval(i)),e.textContent=Math.floor(t)},16)}function J(){window.currentRecuerdoPhoto===void 0&&(window.currentRecuerdoPhoto=0);const e=document.getElementById("carousel-photo-display"),t=document.getElementById("photo-container"),o=document.getElementById("photo-caption"),s=document.getElementById("photo-prev"),n=document.getElementById("photo-next"),i=["Nuestra primera cita formal <3","Primera selfie juntos","Cuando me adueñe de tu bucito","El dia que me robaron el cel xd","silloncito","Día en que aprobamos la última materia !","Volviendo de Río Cuarto","Cuando me viste concursar","Primer recital juntitos","Mi chefcito","Bday kiss","<3","Tarde de parquecito","Cafecito post museo de las armas","eepyhead","Streameandome mientras estudiaba","Date <3","Coffee date en areco","Río areco","Mis peluchitos cuidandote","Date en san telmo ","besito","Mimos a distancia","Shared alone time","Sexy couple","De mis fotos favoritas"];o&&(o.textContent=i[window.currentRecuerdoPhoto]),t&&(t.onclick=()=>{window.openLightbox(window.currentRecuerdoPhoto,window.fotosRecuerdos,i)}),s&&n&&(s.onclick=c=>{c.stopPropagation(),window.currentRecuerdoPhoto=(window.currentRecuerdoPhoto-1+window.fotosRecuerdos.length)%window.fotosRecuerdos.length,e.src=window.fotosRecuerdos[window.currentRecuerdoPhoto],o&&(o.textContent=i[window.currentRecuerdoPhoto])},n.onclick=c=>{c.stopPropagation(),window.currentRecuerdoPhoto=(window.currentRecuerdoPhoto+1)%window.fotosRecuerdos.length,e.src=window.fotosRecuerdos[window.currentRecuerdoPhoto],o&&(o.textContent=i[window.currentRecuerdoPhoto])})}function I(e){const t=document.getElementById("carousel-content"),o=g[e];t.innerHTML=o.render(),o.onEnter&&setTimeout(()=>o.onEnter(),100),U();const s=document.getElementById("final-button-container");e===g.length-1?setTimeout(()=>{s.classList.remove("opacity-0"),s.classList.add("opacity-100")},500):(s.classList.add("opacity-0"),s.classList.remove("opacity-100"))}function U(){const e=document.getElementById("carousel-dots");e.innerHTML=g.map((t,o)=>`
    <div class="w-3 h-3 rounded-full transition-all duration-300 ${o===l?"bg-rose-500 w-8":"bg-rose-200"}"></div>
  `).join("")}function X(){g=K(),l=0,document.getElementById("days-count").textContent=m,I(l);const e=document.getElementById("prev-arrow"),t=document.getElementById("next-arrow"),o=e.cloneNode(!0),s=t.cloneNode(!0);e.parentNode.replaceChild(o,e),t.parentNode.replaceChild(s,t),o.addEventListener("click",()=>{l=(l-1+g.length)%g.length,I(l)}),s.addEventListener("click",()=>{l=(l+1)%g.length,I(l)});const n=document.getElementById("continue-to-final-btn");if(n){const i=n.cloneNode(!0);n.parentNode.replaceChild(i,n),i.addEventListener("click",()=>{r.transitionTo("scene-5",1200)})}}let d=0,f=[],S=[];window.openLightbox=function(e,t,o=[]){d=e,f=t,S=o;const s=document.getElementById("lightbox-prev-img"),n=document.getElementById("lightbox-next-img");t===window.fotosRecuerdos?(s.src="/bcs-mug.png",n.src="/bcs-mug.png",s.classList.replace("rotate-180","-scale-x-100")):(s.src="/wine.png",n.src="/wine.png",s.classList.add("rotate-180"),s.classList.remove("-scale-x-100")),window.updateLightbox();const i=document.getElementById("lightbox");i.classList.remove("hidden"),i.classList.add("flex")};window.updateLightbox=function(){const e=document.getElementById("lightbox-img"),t=document.getElementById("lightbox-caption");if(e&&f[d]){const o=f[d];e.src=o.startsWith("/")||o.includes("/")?o:`/${o}`}if(t){const o=S[d]||"";t.textContent=o,t.style.display=o?"block":"none"}};window.closeLightbox=function(){const e=document.getElementById("lightbox");e.classList.add("hidden"),e.classList.remove("flex")};window.lightboxNext=function(){d=(d+1)%f.length,M(),window.updateLightbox()};window.lightboxPrev=function(){d=(d-1+f.length)%f.length,M(),window.updateLightbox()};function M(){if(f===window.misFotosDeViaje){window.currentTravelPhoto=d;const e=document.getElementById("travel-photo-display");e&&(e.src=window.misFotosDeViaje[window.currentTravelPhoto])}else if(f===window.fotosRecuerdos){window.currentPhotoIndex=d;const e=document.getElementById("carousel-photo-display");e&&(e.src=window.fotosRecuerdos[window.currentPhotoIndex])}}const B=document.getElementById("final-next-line-btn"),p=document.getElementById("final-next-button-container");let x=0,L=[],v=!1;r.registerScene("scene-5",{onEnter:()=>{L=document.querySelectorAll(".final-seq-line"),x=0,v=!1,setTimeout(()=>{p.classList.add("opacity-100"),p.classList.remove("opacity-0")},500)}});function Z(){if(x>=L.length){v=!0;return}L[x].classList.add("is-visible"),x++,x>=L.length&&(v=!0,setTimeout(()=>{p.classList.add("opacity-0"),p.classList.remove("opacity-100")},800))}B&&B.addEventListener("click",()=>{v||Z()});document.addEventListener("keydown",e=>{const t=r.getCurrentSceneId();e.key==="Enter"&&(t==="scene-mail"?E.click():t==="scene-letter"&&!a.disabled?a.click():t==="scene-5"&&!v&&B.click()),e.key===" "&&(t==="scene-letter"&&!a.disabled?(e.preventDefault(),a.click()):t==="scene-5"&&!v&&(e.preventDefault(),B.click()))});document.addEventListener("keydown",e=>{e.key==="Escape"&&window.closeLightbox()});const b=document.getElementById("back-button");let C=[];const ee=r.transitionTo.bind(r);r.transitionTo=function(e,t=1e3,o=!1){const s=this.currentSceneId;!o&&s&&s!==e&&C.push(s),ee(e,t),D()};function D(){const e=r.getCurrentSceneId();e&&e!=="scene-mail"&&C.length>0?(b.classList.remove("opacity-0","pointer-events-none"),b.classList.add("opacity-100","pointer-events-auto")):(b.classList.add("opacity-0","pointer-events-none"),b.classList.remove("opacity-100","pointer-events-auto"))}b&&b.addEventListener("click",()=>{if(C.length>0){const e=C.pop();e==="scene-letter"?(u=0,y=!1,h.forEach(t=>t.classList.remove("is-visible")),j&&(j.classList.remove("opacity-0"),j.classList.add("opacity-100"))):e==="scene-5"?(x=0,v=!1,L.forEach(t=>t.classList.remove("is-visible")),p&&(p.classList.remove("opacity-0"),p.classList.add("opacity-100"))):e==="scene-4"&&(l=0,g.length>0&&I(0)),r.transitionTo(e,800,!0)}});document.addEventListener("DOMContentLoaded",()=>{r.currentSceneId="scene-mail",V(),D()});
