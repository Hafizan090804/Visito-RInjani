// THEME TOGGLE
const themeBtn=document.getElementById('themeBtn');
const root=document.body;
themeBtn.addEventListener('click',()=>{
  const cur=root.getAttribute('data-theme');
  if(cur==='light'){root.setAttribute('data-theme','dark');themeBtn.textContent='Mode Terang'}
  else{root.setAttribute('data-theme','light');themeBtn.textContent='Mode Gelap'}
});

// DATA SIMULASI
function generateVisitors(days=30){
  const arr=[];
  for(let i=0;i<days;i++){
    const base=200+Math.round(300*Math.sin(i/6)+Math.random()*120);
    arr.push(base);
  }
  return arr;
}
const visitors=generateVisitors(30);
const labels=Array.from({length:30}).map((_,i)=>{
  const d=new Date();d.setDate(d.getDate()-(29-i));
  return `${d.getDate()}/${d.getMonth()+1}`;
});

document.getElementById('totalVisits').textContent = visitors.reduce((a,b)=>a+b,0).toLocaleString();
document.getElementById('avgDaily').textContent = Math.round(visitors.slice(-7).reduce((a,b)=>a+b,0)/7).toLocaleString();

const temp=22+Math.round(Math.random()*6);
const cond=['Cerah','Berawan','Hujan ringan'][Math.floor(Math.random()*3)];
document.getElementById('currentWeather').textContent=`${temp}°C — ${cond}`;

// CHART
const ctx=document.getElementById('visitorsChart').getContext('2d');
new Chart(ctx,{
  type:'line',
  data:{labels,datasets:[{label:'Kunjungan',data:visitors,tension:0.3,fill:true,backgroundColor:'rgba(10,147,150,0.1)',borderColor:'rgba(10,147,150,0.9)',pointRadius:2}]},
  options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}
});

// MAP
const map=L.map('map',{attributionControl:false}).setView([-8.3405,116.4558],10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
L.marker([-8.3405,116.4558]).addTo(map).bindPopup('<strong>Gunung Rinjani</strong><br>Segara Anak');

// SIDEBAR NAV ACTIVE
const navItems=document.querySelectorAll('.sidebar nav li');
navItems.forEach(li=>{
  li.addEventListener('click',()=>{
    navItems.forEach(x=>x.classList.remove('active'));
    li.classList.add('active');
  });
});
