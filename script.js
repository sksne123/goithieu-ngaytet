(function () {
  // Lấy năm hiện tại
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Back to top
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Intersection Observer cho fade-in
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 },
  );
  fadeElements.forEach((el) => observer.observe(el));

  // ===== PETAL FALL EFFECT (HOA ĐÀO RƠI) =====
  const petalContainer = document.getElementById("petal-container");
  const PETAL_COUNT = 25; // số cánh hoa cùng lúc

  function createPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";
    // Kích thước ngẫu nhiên
    const size = Math.random() * 15 + 12; // 12-27px
    petal.style.width = size + "px";
    petal.style.height = size * 1.2 + "px";
    petal.style.left = Math.random() * 100 + "%";
    petal.style.animationDuration = Math.random() * 4 + 5 + "s"; // 5-9s
    petal.style.animationDelay = Math.random() * -10 + "s"; // trải đều
    petal.style.background = `linear-gradient(145deg, #ffb7c5, #ff8da${Math.floor(Math.random() * 5 + 1)})`;
    petal.style.opacity = Math.random() * 0.6 + 0.3;
    petalContainer.appendChild(petal);

    // Tự động xóa sau khi rơi xong (phòng trường hợp tích tụ)
    setTimeout(() => {
      if (petal.parentNode) petal.remove();
    }, 15000);
  }

  // Tạo mỗi 400ms một cánh hoa mới, duy trì khoảng 25 cánh cùng lúc
  setInterval(() => {
    if (petalContainer.children.length < PETAL_COUNT * 1.5) {
      createPetal();
    }
  }, 350);

  // Tạo sẵn vài cánh ban đầu
  for (let i = 0; i < PETAL_COUNT; i++) {
    setTimeout(createPetal, i * 150);
  }

  // ===== HIỆU ỨNG CLICK VÀO TIÊU ĐỀ =====
  const logo = document.getElementById("logo-title");
  const header = document.getElementById("main-header");

  // Danh sách các hiệu ứng
  const effects = [
    // 0: Bùng nổ cánh hoa (tạo nhanh 15 cánh)
    function burstPetals() {
      for (let i = 0; i < 18; i++) {
        setTimeout(() => {
          const p = document.createElement("div");
          p.className = "petal";
          p.style.width = Math.random() * 20 + 10 + "px";
          p.style.height = Math.random() * 25 + 12 + "px";
          p.style.left = 50 + (Math.random() - 0.5) * 30 + "%"; // quanh giữa
          p.style.animationDuration = Math.random() * 2 + 3 + "s";
          p.style.background = `linear-gradient(145deg, #ffb7c5, #ff6f91)`;
          p.style.opacity = 0.9;
          petalContainer.appendChild(p);
          setTimeout(() => {
            if (p.parentNode) p.remove();
          }, 5000);
        }, i * 50);
      }
      showToast("🌸 Rộn ràng hoa đào!");
    },
    // 1: Đổi màu header thành vàng kim trong 2 giây
    function goldHeader() {
      header.classList.add("header-gold");
      setTimeout(() => header.classList.remove("header-gold"), 2000);
      showToast("✨ Header lấp lánh!");
    },
    // 2: Rung lắc tiêu đề
    function shakeTitle() {
      logo.classList.add("shake");
      setTimeout(() => logo.classList.remove("shake"), 600);
      showToast("🎋 Lắc xì tiền vàng!");
    },
    // 3: Thay đổi tốc độ rơi của cánh hoa (tạm thời tăng tốc)
    function speedUpPetals() {
      const petals = document.querySelectorAll(".petal");
      petals.forEach((p) => {
        const oldDur = p.style.animationDuration;
        p.style.animationDuration = parseFloat(oldDur) * 0.5 + "s"; // nhanh gấp đôi
        setTimeout(() => {
          p.style.animationDuration = oldDur;
        }, 3000);
      });
      showToast("🌀 Hoa rơi nhanh hơn!");
    },
    // 4: Hiện lời chúc ngẫu nhiên
    function randomGreeting() {
      const greetings = [
        "Chúc mừng năm mới! 🧧",
        "Vạn sự như ý! 🌸",
        "An khang thịnh vượng! 🏮",
        "Phát tài phát lộc! 💰",
        "Sức khỏe dồi dào! 🍊",
      ];
      const msg = greetings[Math.floor(Math.random() * greetings.length)];
      showToast(msg);
    },
    // 5: Tạm dừng hoa rơi 2 giây
    function pausePetals() {
      document.body.classList.add("pause-petals");
      setTimeout(() => document.body.classList.remove("pause-petals"), 2000);
      showToast("⏸️ Hoa ngừng rơi...");
    },
  ];

  function showToast(text) {
    const toast = document.createElement("div");
    toast.className = "greeting-toast";
    toast.textContent = text;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  logo.addEventListener("click", (e) => {
    e.stopPropagation();
    // Chọn hiệu ứng ngẫu nhiên
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect();
    // Phóng to nhẹ khi click
    logo.style.transform = "scale(1.1)";
    setTimeout(() => (logo.style.transform = ""), 200);
  });
})();
