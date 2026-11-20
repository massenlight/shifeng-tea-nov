// Only enable payment after the company's checkout reports it can accept orders.
const videoLink=document.querySelector('.video a');
videoLink?.addEventListener('click',e=>{
 if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;
 e.preventDefault();const frame=document.createElement('iframe');
 frame.title='Threads 情報交流茶會';frame.src='https://www.youtube-nocookie.com/embed/PdFuuzz1oNo?autoplay=1';
 frame.allow='autoplay; encrypted-media; picture-in-picture';frame.allowFullscreen=true;
 videoLink.before(frame);videoLink.textContent='在 YouTube 觀看';videoLink.focus();
},{once:true});
const origin='https://massenlighten-platform.massenlighten-company.workers.dev';
fetch(origin+'/api/nov-tea/availability',{credentials:'omit',cache:'no-store',signal:AbortSignal.timeout(6000)})
 .then(async response=>{if(!response.ok)return;const data=await response.json();const status=document.querySelector('#status'),join=document.querySelector('#join');
 if(data.event!=='nov-tea-2026')return;
 if(data.status==='closed'){
 join.href=origin+'/events/nov-tea/checkout';join.textContent='用 LINE 查詢我的報名';
 status.textContent='可查詢自家入口報名狀態，目前尚未開放刷卡。';return;
 }
 if(data.status==='open'||data.status==='full'||data.status==='ended'){
 join.href=origin+'/events/nov-tea/checkout';join.textContent=data.status==='open'?'用 LINE 登入報名':'查詢我的報名';
 status.textContent=data.status==='open'?'使用原本的 LINE 帳號即可，不用重填學員資料。':data.status==='full'?'本入口名額已滿。':'本場報名已截止。';
 }}).catch(()=>{});
