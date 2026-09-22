const sheets = {
  kids1:{title:"Kids",file:"01_Kids_Gang_Sheet.jpeg",cols:8,rows:8,count:64,width:1312,height:1199},
  fairyA:{title:"Fairy / Women",file:"03_Fairy_Gang_Sheet.jpeg",cols:5,rows:4,count:20,width:1145,height:1374},
  funny:{title:"Funny & Sarcastic",file:"04_Funny_Gang_Sheet.jpeg",cols:6,rows:6,count:36,width:1227,height:1282},
  stonerA:{title:"Stoner",file:"05_Stoner_Gang_Sheet_A.jpeg",cols:6,rows:6,count:36,width:1312,height:1199},
  rust:{title:"Rust Gaming",file:"06_Rust_Gang_Sheet.jpeg",cols:5,rows:4,count:20,width:1312,height:1199},
  assortedA:{title:"Assorted",file:"07_Assorted_Gang_Sheet_A.jpeg",cols:10,rows:10,count:100,width:1312,height:1199},
  stonerB:{title:"Stoner",file:"09_Stoner_Gang_Sheet_B.jpeg",cols:7,rows:6,count:42,width:1024,height:1536},
  fairyB:{title:"Fairy",file:"10_Fairy_Gang_Sheet_B.jpeg",cols:6,rows:8,count:48,width:1024,height:1536},
  kidsB:{title:"Kids",file:"11_Kids_Gang_Sheet_B.jpeg",cols:6,rows:9,count:50,width:1225,height:1284},
  assortedB:{title:"Assorted",file:"12_Assorted_Gang_Sheet_B.jpeg",cols:7,rows:7,count:49,width:1223,height:1286},
  mens:{title:"Men's / Blue Collar",file:"13_Blue_Collar_Gang_Sheet.jpeg",cols:5,rows:6,count:28,width:1024,height:1536},
  stonerC:{title:"Stoner",file:"14_Stoner_Gang_Sheet_C.jpeg",cols:4,rows:6,count:24,width:1145,height:1374}
};

const collections = [
  ["Fairy","Fairy designs","fairyA","fairyB"],
  ["Stoner","Stoner designs","stonerA","stonerB","stonerC"],
  ["Kids","Kids designs","kids1","kidsB"],
  ["Funny & Sarcastic","Funny, petty and chaotic designs","funny"],
  ["Rust Gaming","Rust gaming designs","rust"],
  ["Men's / Blue Collar","Outdoors, work, country and men's designs","mens"],
  ["Women's / Boutique","Women's, southern and lifestyle designs","fairyA"],
  ["Assorted","Mixed designs and extra drops","assortedA","assortedB"]
];

const cards = document.getElementById("collectionCards");
const gallery = document.getElementById("gallery");
const galleryGrid = document.getElementById("galleryGrid");
const galleryTitle = document.getElementById("galleryTitle");
const galleryEyebrow = document.getElementById("galleryEyebrow");
const search = document.getElementById("search");
const lightbox = document.getElementById("lightbox");
const lightboxArt = document.getElementById("lightboxArt");
const lightboxTitle = document.getElementById("lightboxTitle");

function makeCard(c){
  const [name, desc, ...keys] = c;
  const el = document.createElement("button");
  el.className = "collection-card";
  el.dataset.search = `${name} ${desc}`.toLowerCase();
  const previewKey = keys[0];
  const preview = sheets[previewKey];
  el.innerHTML = `<span class="collection-photo"><img src="${preview.file}" alt="${name} collection preview" loading="lazy"></span><span class="collection-copy"><h3>${name}</h3><p>${desc}</p></span>`;
  el.addEventListener("click",()=>openCollection(name, keys));
  return el;
}
collections.forEach(c=>cards.appendChild(makeCard(c)));

function spriteStyle(s, index){
  const col=index % s.cols, row=Math.floor(index/s.cols);
  const x = s.cols===1 ? 0 : (col/(s.cols-1))*100;
  const y = s.rows===1 ? 0 : (row/(s.rows-1))*100;
  const cellAspect = (s.width / s.cols) / (s.height / s.rows);
  return {
    backgroundImage:`url("${s.file}")`,
    backgroundSize:`${s.cols*100}% ${s.rows*100}%`,
    backgroundPosition:`${x}% ${y}%`,
    aspectRatio:String(cellAspect),
    backgroundRepeat:"no-repeat",
    backgroundColor:"#fff"
  };
}

function openCollection(name, keys){
  gallery.classList.remove("hidden");
  galleryTitle.textContent=name;
  galleryEyebrow.textContent=`${name.toUpperCase()} COLLECTION`;
  galleryGrid.innerHTML="";
  keys.forEach(key=>{
    const s=sheets[key];
    for(let i=0;i<s.count;i++){
      const card=document.createElement("button");
      card.className="design-card";
      const art=document.createElement("span");
      art.className="sprite";
      const st=spriteStyle(s,i);
      Object.assign(art.style,st);
      card.appendChild(art);
      const label=document.createElement("span");
      label.className="label";
      label.textContent=`${s.title} • Design ${i+1}`;
      card.appendChild(label);
      card.addEventListener("click",()=>{
        lightboxTitle.textContent=`${s.title} • Design ${i+1}`;
        Object.assign(lightboxArt.style,st);
        lightboxArt.style.width="100%";
        lightboxArt.style.maxHeight="78vh";
        lightboxArt.style.minHeight="0";
        lightboxArt.style.aspectRatio=String((s.width / s.cols) / (s.height / s.rows));
        lightboxArt.style.backgroundSize=`${s.cols*100}% ${s.rows*100}%`;
        lightboxArt.style.backgroundPosition=st.backgroundPosition;
        lightbox.classList.remove("hidden");
      });
      galleryGrid.appendChild(card);
    }
  });
  gallery.scrollIntoView({behavior:"smooth",block:"start"});
}

document.getElementById("backBtn").addEventListener("click",()=>{
  gallery.classList.add("hidden");
  document.getElementById("collections").scrollIntoView({behavior:"smooth"});
});
document.getElementById("closeLightbox").addEventListener("click",()=>lightbox.classList.add("hidden"));
lightbox.addEventListener("click",e=>{if(e.target===lightbox)lightbox.classList.add("hidden")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")lightbox.classList.add("hidden")});
search.addEventListener("input",()=>{
  const q=search.value.trim().toLowerCase();
  [...cards.children].forEach(c=>c.hidden=q && !c.dataset.search.includes(q));
});
