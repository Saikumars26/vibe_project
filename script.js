// ===== COLOR PICKER =====
const bagShape = document.getElementById("bagShape");
const colorNameText = document.getElementById("colorNameText");
const colorDots = document.querySelectorAll(".color-dot");
const previewPrice = document.getElementById("previewPrice");

const colorStyles = {
  ocean: {
    gradient: "linear-gradient(135deg, #38bdf8, #2563eb)",
    name: "Ocean Blue",
  },
  sunset: {
    gradient: "linear-gradient(135deg, #fb923c, #f97316)",
    name: "Sunset Orange",
  },
  forest: {
    gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
    name: "Forest Green",
  },
  berry: {
    gradient: "linear-gradient(135deg, #ec4899, #db2777)",
    name: "Berry Pink",
  },
};

colorDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const key = dot.getAttribute("data-color");
    const style = colorStyles[key];
    if (!style) return;

    bagShape.style.background = style.gradient;
    colorNameText.textContent = style.name;

    colorDots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");
  });
});

// ===== CAPACITY SLIDER =====
const capacityRange = document.getElementById("capacityRange");
const capacityOutput = document.getElementById("capacityOutput");
const capacityLabel = document.getElementById("capacityLabel");

function updateCapacityText(value) {
  const v = Number(value);
  let label = "";
  let text = "";

  if (v <= 20) {
    label = `${v}L · compact`;
    text = `${v}L is good for light carry and short trips.`;
  } else if (v <= 26) {
    label = `${v}L · everyday`;
    text = `${v}L works well for school, office, or college days.`;
  } else {
    label = `${v}L · extra space`;
    text = `${v}L is better for travel and carrying clothes as well.`;
  }

  capacityLabel.textContent = label;
  capacityOutput.textContent = text;
  capacityRange.setAttribute("aria-valuenow", String(v));
}

capacityRange.addEventListener("input", (e) => {
  updateCapacityText(e.target.value);
});

updateCapacityText(capacityRange.value);

// ===== PRICE CALCULATOR =====
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
  previewPrice.textContent = `$${basePrice}`;

  if (selected.length === 0) {
    addonsSummaryEl.textContent = "No add-ons selected yet.";
  } else {
    addonsSummaryEl.textContent = "Add-ons: " + selected.join(", ");
  }
}

updatePrice();

// ===== TESTIMONIALS CAROUSEL =====
const testimonials = [
  {
    text:
      "“On a busy bus, I don't worry about my backpack anymore. The hidden zipper gives me peace of mind.”",
    name: "Jared · Grad student",
    location: "Austin, TX",
  },
  {
    text:
      "“I use it every day for college. The inside is simple, so I always know where my laptop and books are.”",
    name: "Anita · College student",
    location: "Chicago, IL",
  },
  {
    text:
      "“Travelling between cities is easier now. The bright color makes it easy to spot on luggage racks.”",
    name: "Rohit · Consultant",
    location: "Dallas, TX",
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

renderTestimonial();

// ===== FAQ ACCORDION =====
function toggleFaq(button) {
  const item = button.closest(".faq-item");
  const panel = item.querySelector(".faq-panel");

  const isOpen = item.classList.contains("open");
  item.classList.toggle("open", !isOpen);

  button.setAttribute("aria-expanded", String(!isOpen));
  panel.setAttribute("aria-hidden", String(isOpen));
}

// ===== SMOOTH SCROLL =====
function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTopWrap = document.getElementById("scrollTopWrap");

window.addEventListener("scroll", () => {
  if (window.scrollY > 220) {
    scrollTopWrap.style.display = "block";
  } else {
    scrollTopWrap.style.display = "none";
  }
});

// ===== FOOTER YEAR =====
document.getElementById("yearNow").textContent = new Date().getFullYear();
