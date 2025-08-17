document.addEventListener("DOMContentLoaded", function () {

    /* =====================
       1. Efek Salju
    ===================== */
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none"; // biar tidak ganggu klik

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const snowflakes = [];

    function createSnowflakes() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 4 + 1;
        const speed = Math.random() * 1 + 0.5;
        snowflakes.push({ x, y, radius, speed });
    }

    function drawSnowflakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for (let flake of snowflakes) {
            ctx.moveTo(flake.x, flake.y);
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        }
        ctx.fill();
        updateSnowflakes();
    }

    function updateSnowflakes() {
        for (let flake of snowflakes) {
            flake.y += flake.speed;
            if (flake.y > canvas.height) {
                flake.x = Math.random() * canvas.width;
                flake.y = -flake.radius;
            }
        }
    }

    function snow() {
        drawSnowflakes();
        requestAnimationFrame(snow);
    }

    for (let i = 0; i < 100; i++) {
        createSnowflakes();
    }
    snow();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });


    /* =====================
       2. Efek Tilt Foto Profil
    ===================== */
    const profileImg = document.querySelector(".profile-img");
    if (profileImg) {
        profileImg.style.transition = "transform 0.1s ease";
        profileImg.addEventListener("mousemove", (e) => {
            const rect = profileImg.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * -10;
            profileImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        profileImg.addEventListener("mouseleave", () => {
            profileImg.style.transform = "rotateX(0) rotateY(0) scale(1)";
        });
    }


    /* =====================
       3. Smooth Scroll
    ===================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

});
