const collections = [
  "Western / Country","Southern","Girly / Boutique","Cute","Spooky","Horror / Dark",
  "Funny / Sarcastic","Y2K / Retro","Floral / Nature","Animals","Family / Personalized",
  "Gaming","Sports","Patriotic","Seasonal / Holidays","Inspirational","Faith","Music",
  "Stoners","Mens","Womens","Kids","Newborn / Toddler","Blue Collar / Work Life",
  "Mom Life","Dad Life","Outdoors / Adventure","Hunting / Fishing","Biker / Motorcycle",
  "Drinks / Party Life","Truck / Off-Road","Jeep / ATV","Lake Life","Beach Life",
  "Pet Lovers","Beauty / Self-Care","Home Body","College Life","Nurse / Medical",
  "Teacher","Chaos / Mentality","Couples / Relationship","Redneck / Southern Humor",
  "Concert / Country Music","Petty / Savage","Rust Gaming","Custom Orders"
];

const masters = [
  ["01_Kids_Gang_Sheet.jpeg","Kids"],
  ["02_Collection_Categories.jpeg","Collection Categories"],
  ["03_Fairy_Gang_Sheet.jpeg","Fairy"],
  ["04_Funny_Gang_Sheet.jpeg","Funny"],
  ["05_Stoner_Gang_Sheet_A.jpeg","Stoner A"],
  ["06_Rust_Gang_Sheet.jpeg","Rust"],
  ["07_Assorted_Gang_Sheet_A.jpeg","Assorted A"],
  ["08_SCT_Collection_Cards.jpeg","SCT Collection Cards"],
  ["09_Stoner_Gang_Sheet_B.jpeg","Stoner B"],
  ["10_Fairy_Gang_Sheet_B.jpeg","Fairy B"],
  ["11_Kids_Gang_Sheet_B.jpeg","Kids B"],
  ["12_Assorted_Gang_Sheet_B.jpeg","Assorted B"],
  ["13_Blue_Collar_Gang_Sheet.jpeg","Blue Collar"],
  ["14_Stoner_Gang_Sheet_C.jpeg","Stoner C"]
];

const collectionGrid = document.getElementById("collection-grid");
collections.forEach((name, i) => {
  const card = document.createElement("a");
  card.className = "collection-card";
  card.href = "#masters";
  card.innerHTML = `<span class="num">${String(i+1).padStart(2,"0")}</span>
    <h3>${name}</h3>
    <p>Design gallery coming next</p>`;
  collectionGrid.appendChild(card);
});

const masterGrid = document.getElementById("master-grid");
masters.forEach(([file, name]) => {
  const card = document.createElement("article");
  card.className = "master-card";
  card.innerHTML = `<img src="assets/masters/${file}" alt="${name} master gang sheet" loading="lazy">
    <div class="master-info"><strong>${name}</strong><span>Master artwork</span></div>`;
  const img = card.querySelector("img");
  img.addEventListener("click", () => openLightbox(img.src, name));
  masterGrid.appendChild(card);
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");

function openLightbox(src, caption) {
  lightboxImage.src = src;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  lightboxImage.src = "";
}
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.getElementById("year").textContent = new Date().getFullYear();
