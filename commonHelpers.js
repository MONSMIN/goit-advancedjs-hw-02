import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */const o=()=>`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,"0")}`,t=document.querySelector("[data-start]"),r=document.querySelector("[data-stop]");let e;t.addEventListener("click",()=>{t.disabled=!0,e=setInterval(()=>document.body.style.backgroundColor=o(),1e3)});r.addEventListener("click",()=>{clearInterval(e),t.disabled=!1});
//# sourceMappingURL=commonHelpers.js.map