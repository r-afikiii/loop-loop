const navLinks = document.querySelectorAll('.nav-menu .nav-link');
const menuOpenButton = document.querySelector('#menu-open-button');
const menuCloseButton = document.querySelector('#menu-close-button');

menuOpenButton.addEventListener('click', () => {
    // Toggle Mobile Menu Visibility
    document.body.classList.toggle("show-mobile-menu");
});

// Close Menu When The Close Button Is Clicked
menuCloseButton.addEventListener('click', () => menuOpenButton.click());

// Close Menu When The nav link Is Clicked
navLinks.forEach(link => {
    link.addEventListener("click", () => menuOpenButton.click());
});

// Initialize Swiper
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 25,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Responsive breakpoints
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    768: {
        slidesPerView: 2,
    },
    1024: {
        slidesPerView: 3,
    }
  }
});

const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

if (form) {
  form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    statusText.textContent = "Completa todos los campos.";
    return;
  }

  submitBtn.disabled = true;
  statusText.textContent = "Enviando...";

  try {
    const response = await fetch("https://loop-loop-api.vercel.app/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (data.success) {
      statusText.textContent = "Mensaje enviado correctamente.";
      form.reset();
    } else {
      statusText.textContent = "No se pudo enviar el mensaje.";
    }
  } catch (error) {
    console.error(error);
    statusText.textContent = "Error de conexión con el servidor.";
  } finally {
    submitBtn.disabled = false;
  }
});
}