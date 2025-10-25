const slider = document.querySelector('.slider');

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('pointerdown', (e) => {
    isDown = true;
    slider.setPointerCapture(e.pointerId);
    startX = e.clientX;
    scrollLeft = slider.scrollLeft;
    e.preventDefault();
});

slider.addEventListener('pointermove', (e) => {
    if(!isDown) return;
    const x = e.clientX;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
    e.preventDefault();
});

slider.addEventListener('pointerup', (e) => {
    isDown = false;
    slider.releasePointerCapture(e.pointerId);
});

slider.addEventListener('pointerleave', (e) => {
    isDown = false;
});

document.querySelectorAll('.faq-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const answer = toggle.nextElementSibling;
        const icon = toggle.querySelector('.faq-card svg');
        const verticalLine = icon.querySelector('.vertical');
        
        answer.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
        verticalLine.classList.toggle('hidden');
      });
    });

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/xblpjrdv", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });
      
      if (response.ok) {
        status.textContent = "Message sent successfully!";
        status.className = "text-green-600 text-sm text-center mt-2";
        form.reset();
      } else {
        status.textContent = "An error occurred. Please try again.";
        status.className = "text-red-600 text-sm text-center mt-2";
      }
    } catch (error) {
      status.textContent = "Message not sent. Please check your connection.";
      status.className = "text-red-600 text-sm text-center mt-2";
    }
  });