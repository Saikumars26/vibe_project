// Run after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // ========== NAV TOGGLE ==========
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Smooth scroll for buttons with data-scroll-target
  document.querySelectorAll("[data-scroll-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-scroll-target");
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // close mobile nav if open
      if (navLinks && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
      }
    });
  });

  // ========== COLOR PICKER ==========
  
  const colorDots = document.querySelectorAll(".color-dot");
  const colorNameSpan = document.getElementById("selectedColorName");
  const productImage = document.getElementById("productImage");

  const colorAccentMap = {
    ocean: "#2563eb",
    sunset: "#f97316",
    forest: "#16a34a",
    berry: "#db2777",
  };

  colorDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const key = dot.getAttribute("data-color");
      const name = dot.getAttribute("data-color-name") || "";
      const imgPath = dot.getAttribute("data-img");

      colorDots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");

      // Update color name text
      if (colorNameSpan) colorNameSpan.textContent = name;

      // Update dynamic accent color (affects buttons, logo, etc.)
      const accent = colorAccentMap[key] || "#2563eb";
      root.style.setProperty("--dynamic-accent", accent);
    });
  });

  // ========== CONFIGURATOR / PRICE CALC ==========
  const BASE_PRICE = 89;

  const sizeRadios = document.querySelectorAll('input[name="size"]');
  const addonCheckboxes = document.querySelectorAll(
    '.addon-list input[type="checkbox"]'
  );
  const qtyInput = document.getElementById("qtyInput");

  const summaryBase = document.getElementById("summaryBase");
  const summarySize = document.getElementById("summarySize");
  const summaryAddons = document.getElementById("summaryAddons");
  const summaryQty = document.getElementById("summaryQty");
  const summaryTotal = document.getElementById("summaryTotal");
  const summaryNote = document.getElementById("summaryNote");
  const basePriceText = document.getElementById("basePriceText");

  function updatePrice() {
    let sizeExtra = 0;
    sizeRadios.forEach((radio) => {
      if (radio.checked) {
        sizeExtra = Number(radio.dataset.extra || 0);
      }
    });

    let addonsTotal = 0;
    const selectedLabels = [];
    addonCheckboxes.forEach((box) => {
      if (box.checked) {
        addonsTotal += Number(box.value || 0);
        selectedLabels.push(box.dataset.label);
      }
    });

    let qty = Number(qtyInput?.value || 1);
    if (!qty || qty < 1) qty = 1;

    const base = BASE_PRICE;
    const perBag = base + sizeExtra + addonsTotal;
    const total = perBag * qty;

    if (summaryBase) summaryBase.textContent = `$${base}`;
    if (summarySize) summarySize.textContent = `$${sizeExtra}`;
    if (summaryAddons) summaryAddons.textContent = `$${addonsTotal}`;
    if (summaryQty) summaryQty.textContent = String(qty);
    if (summaryTotal) summaryTotal.textContent = `$${total}`;
    if (basePriceText) basePriceText.textContent = `$${base}`;

    if (summaryNote) {
      if (selectedLabels.length === 0) {
        summaryNote.textContent = "No add-ons selected yet.";
      } else {
        summaryNote.textContent = `Add-ons: ${selectedLabels.join(", ")}`;
      }
    }
  }

  sizeRadios.forEach((radio) =>
    radio.addEventListener("change", updatePrice)
  );
  addonCheckboxes.forEach((box) =>
    box.addEventListener("change", updatePrice)
  );
  if (qtyInput) {
    qtyInput.addEventListener("input", updatePrice);
  }

  updatePrice();

  // ========== TESTIMONIALS ==========
  const testimonials = [
    {
      text:
        "“On a busy bus, I don't keep checking my backpack anymore. The hidden zipper helps me relax.”",
      name: "Jared · Grad student",
      location: "Austin, TX",
    },
    {
      text:
        "“I use it every day for college. The inside is simple, so I always know where my laptop and notebook are.”",
      name: "Anita · College student",
      location: "Chicago, IL",
    },
    {
      text:
        "“Bright color, strong straps, and easy organization. Perfect for short work trips.”",
      name: "Rohit · Consultant",
      location: "Dallas, TX",
    },
  ];

  let testimonialIndex = 0;
  const testimonialText = document.getElementById("testimonialText");
  const testimonialName = document.getElementById("testimonialName");
  const testimonialLocation = document.getElementById(
    "testimonialLocation"
  );

  function renderTestimonial() {
    const t = testimonials[testimonialIndex];
    if (!t) return;
    if (testimonialText) testimonialText.textContent = t.text;
    if (testimonialName) testimonialName.textContent = t.name;
    if (testimonialLocation) testimonialLocation.textContent = t.location;
  }

  renderTestimonial();

  document
    .querySelectorAll("[data-testimonial-dir]")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const dir = Number(btn.getAttribute("data-testimonial-dir") || 1);
        testimonialIndex += dir;
        if (testimonialIndex < 0) testimonialIndex = testimonials.length - 1;
        if (testimonialIndex >= testimonials.length) testimonialIndex = 0;
        renderTestimonial();
      });
    });

  // ========== FAQ ACCORDION ==========
  document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector(".faq-button");
    const panel = item.querySelector(".faq-panel");
    if (!button || !panel) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      item.classList.toggle("open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
      panel.setAttribute("aria-hidden", String(isOpen));
    });
  });

  // ========== SCROLL TO TOP ==========
  const scrollTop = document.getElementById("scrollTop");
  if (scrollTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 220) {
        scrollTop.style.display = "block";
      } else {
        scrollTop.style.display = "none";
      }
    });

    scrollTop
      .querySelector("button")
      ?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }

  // ========== FOOTER YEAR ==========
  const yearSpan = document.getElementById("yearNow");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
});
const root = document.documentElement;
const colorDots = document.querySelectorAll(".color-dot");
const colorNameSpan = document.getElementById("selectedColorName");
const productImage = document.getElementById("productImage"); // 👈 add this

const colorAccentMap = {
  ocean: "#2563eb",
  sunset: "#f97316",
  forest: "#16a34a",
  berry: "#db2777",
};

colorDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const key = dot.getAttribute("data-color");
    const name = dot.getAttribute("data-color-name") || "";
    const imgPath = dot.getAttribute("data-img"); // 👈 new

    // active state
    colorDots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");

    // update color name text
    if (colorNameSpan) colorNameSpan.textContent = name;

    // update accent color
    const accent = colorAccentMap[key] || "#2563eb";
    root.style.setProperty("--dynamic-accent", accent);

    // ✅ change the image
    if (productImage && imgPath) {
      productImage.src = imgPath;
    }
  });
});

