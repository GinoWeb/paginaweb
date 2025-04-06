document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".item");

    items.forEach(item => {
        item.addEventListener("mouseover", () => {
            item.style.boxShadow = "0px 0px 15px #00ffcc";
        });
        item.addEventListener("mouseout", () => {
            item.style.boxShadow = "none";
        });
    });

    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("¡Mensaje enviado! Nos pondremos en contacto pronto. 🚀🍔");
    });
});
