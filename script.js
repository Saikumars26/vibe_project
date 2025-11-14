// COLOR PICKER
const backpackShellColor = document.getElementById("backpackShellColor");
const colorNameText = document.getElementById("colorNameText");
const colorDots = document.querySelectorAll(".color-dot");

const colorStyles = {
  shadow: {
    gradient: "radial-gradient(circle at 20% 0%, #9ca3af, #020617)",
    name: "Shadow Black",
  },
  forest: {
    gradient: "radial-gradient(circle at 20% 0%, #6ee7b7, #064e3b)",
    name: "Forest Green",
  },
  sunrise: {
    gradient: "radial-gradient(circle at 20% 0%, #fb923c, #7c2d12)",
    name: "Sunrise Orange",
  },
  midnight: {
    gradient: "radial-gradient(circle at 20% 0%, #38bdf8, #0f172a)",
    name: "Midnight Blue",
  },
};

colorDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const colorKey = dot.getAttribute("data-color");
    const style = colorStyles[colorKey];

    if (!style) return;

    backpackShellColor.style.background = style.gradient;
    colorNameText.textContent = style.name;

    colorDots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");
  });
});

// CAPACITY SLIDER
const capacityRange = document.getElementById("capacityRange");
const capacityOutput = document.getElementById("capacityOutput");
const capacityLabel = document.getElementById("capacityLabel");

function updateCapacityText(value) {
  let label;
  let description;

  const v = Number(value);

  if (v <= 20) {
    label = `${v}L · compact`;
    description = `${v}L is perfect for light travel, errands, and minimalist carry.`;
  } else if (v <= 26) {
    label = `${v}L · daily carry`;
    description = `${v}L comfortably fits books, laptop, chargers, and a hoodie.`;
  } else {
    label = `${v}L · weekend trip`;
    description = `${v}L is great for short trips and overnight stays with extra clothes.`;
  }

  capacityLabel.textContent = label;
  capacityOutput.textContent = description;

  capacityRange.setAttribute("aria-valuenow", String(v));
}

capacityRange.addEventListener("input", (e) => {
  updateCapacityText(e.target.value);
});

// Initialize capacity text on load
updateCapacityText(capacityRange.value);

// PRICE CALCULATOR
const basePrice = 129;
const totalPriceEl = document.getElementById("totalPrice");
const addonsSummaryEl = document.getElementById("addonsSummary");

function updatePrice() {
  const checkboxes = document.querySelectorAll('.addons input[type="checkbox"]');
  let addonsTotal = 0;
  const selected = [];

  checkboxes.forEach((box) => {
    if (box.checked) {
      addonsTotal += Number(box.value);
      selected.push(box.dataset.label);
    }
  });

  const total = basePrice + addonsTotal;
  totalPriceEl.textContent = `$${total}`;

  if (!selected.length) {
    addonsSummaryEl.textContent = "No add-ons selected yet.";
  } else {
    addonsSummaryEl.textContent = "Add-ons: " + selected.join(", ");
  }
}

// initialize price
updatePrice();

// TESTIMONIALS CAROUSEL
const testimonials = [
  {
    text:
      "“On a packed metro, I finally stopped checking my backpack every five seconds. The hidden zipper design just makes sense.”",
    name: "Jared · Grad student",
    location: "Austin, TX",
  },
  {
    text:
      "“VaultPack has its own place in my daily setup. Laptop, tablet, notebook – everything has a pocket, and nothing feels loose.”",
    name: "Maya · UX designer",
    location: "Seattle, WA",
  },
  {
    text:
      "“I travel between cities every week. This is the first backpack where I’m not worried about someone unzipping it behind me.”",
    name: "Rohit · Consultant",
    location: "Chicago, IL",
  },
];

let testimonialIndex = 0;
const testimonialText = document.getElementById("testimonialText");
const testimonialName = document.getElementById("testimonialName");
const testimonialLocation = document.getElementById("testimonialLocation");

function renderTestimonial() {
  const t = testimonials[testimonialIndex];
  testimonialText.textContent = t.text;
  testimonialName.textContent = t.name;
  testimonialLocation.textContent = t.location;
}

function changeTestimonial(direction) {
  testimonialIndex += direction;
  if (testimonialIndex < 0) testimonialIndex = testimonials.length - 1;
  if (testimonialIndex >= testimonials.length) testimonialIndex = 0;
  renderTestimonial();
}

// initialize testimonials
renderTestimonial();

// FAQ ACCORDION
function toggleFaq(button) {
  const item = button.closest(".faq-item");
  const panel = item.querySelector(".faq-panel");

  const isOpen = item.classList.contains("open");

  item.classList.toggle("open", !isOpen);
  button.setAttribute("aria-expanded", String(!isOpen));
  panel.setAttribute("aria-hidden", String(isOpen));
}

// SMOOTH SCROLL
function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

// SCROLL TO TOP VISIBILITY
const scrollTopWrap = document.getElementById("scrollTopWrap");

window.addEventListener("scroll", () => {
  if (window.scrollY > 220) {
    scrollTopWrap.style.display = "block";
  } else {
    scrollTopWrap.style.display = "none";
  }
});

// FOOTER YEAR
document.getElementById("yearNow").textContent = new Date().getFullYear();
