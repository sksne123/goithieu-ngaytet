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

  // ===== PETAL FALL EFFECT =====
  const petalContainer = document.getElementById("petal-container");
  const PETAL_COUNT = 25;

  function createPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";
    const size = Math.random() * 15 + 12;
    petal.style.width = size + "px";
    petal.style.height = size * 1.2 + "px";
    petal.style.left = Math.random() * 100 + "%";
    petal.style.animationDuration = Math.random() * 4 + 5 + "s";
    petal.style.animationDelay = Math.random() * -10 + "s";
    petal.style.background = `linear-gradient(145deg, #ffb7c5, #ff8da${Math.floor(Math.random() * 5 + 1)})`;
    petal.style.opacity = Math.random() * 0.6 + 0.3;
    petalContainer.appendChild(petal);
    setTimeout(() => {
      if (petal.parentNode) petal.remove();
    }, 15000);
  }

  setInterval(() => {
    if (petalContainer.children.length < PETAL_COUNT * 1.5) {
      createPetal();
    }
  }, 350);
  for (let i = 0; i < PETAL_COUNT; i++) {
    setTimeout(createPetal, i * 150);
  }

  // ===== HIỆU ỨNG CLICK VÀO TIÊU ĐỀ =====
  const logo = document.getElementById("logo-title");
  const header = document.getElementById("main-header");

  const effects = [
    function burstPetals() {
      for (let i = 0; i < 18; i++) {
        setTimeout(() => {
          const p = document.createElement("div");
          p.className = "petal";
          p.style.width = Math.random() * 20 + 10 + "px";
          p.style.height = Math.random() * 25 + 12 + "px";
          p.style.left = 50 + (Math.random() - 0.5) * 30 + "%";
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
    function goldHeader() {
      header.classList.add("header-gold");
      setTimeout(() => header.classList.remove("header-gold"), 2000);
      showToast("✨ Header lấp lánh!");
    },
    function shakeTitle() {
      logo.classList.add("shake");
      setTimeout(() => logo.classList.remove("shake"), 600);
      showToast("🎋 Lắc xì tiền vàng!");
    },
    function speedUpPetals() {
      const petals = document.querySelectorAll(".petal");
      petals.forEach((p) => {
        const oldDur = p.style.animationDuration;
        p.style.animationDuration = parseFloat(oldDur) * 0.5 + "s";
        setTimeout(() => {
          p.style.animationDuration = oldDur;
        }, 3000);
      });
      showToast("🌀 Hoa rơi nhanh hơn!");
    },
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
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect();
    logo.style.transform = "scale(1.1)";
    setTimeout(() => (logo.style.transform = ""), 200);
  });

  // ===== MODAL POPUP CHO CARD =====
  const modal = document.getElementById("cardModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalDetail = document.getElementById("modalDetail");
  const closeModal = document.querySelector(".close-modal");

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      const title = this.dataset.title;
      const desc = this.dataset.desc;
      const detail = this.dataset.detail;
      const img = this.dataset.img;

      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalDetail.textContent = detail;

      modal.style.display = "flex";
    });
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // ===== MUSIC CONTROL =====
  const music = document.getElementById("backgroundMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicStatus = document.getElementById("musicStatus");
  let isPlaying = false;

  if (music && musicToggle) {
    music.volume = 0.4;
    musicToggle.addEventListener("click", function () {
      if (isPlaying) {
        music.pause();
        musicStatus.textContent = "Bật nhạc";
        musicToggle.classList.remove("playing");
      } else {
        music
          .play()
          .then(() => {
            musicStatus.textContent = "Tắt nhạc";
            musicToggle.classList.add("playing");
          })
          .catch((error) => {
            console.log("Không thể phát nhạc:", error);
            alert("Vui lòng tương tác với trang để phát nhạc.");
          });
      }
      isPlaying = !isPlaying;
    });
  }

  // ===== VIDEO SOUND CONTROL =====
  const heroVideo = document.getElementById("heroVideo");
  const videoSoundBtn = document.getElementById("videoSoundBtn");
  let videoSoundOn = false;

  if (heroVideo && videoSoundBtn) {
    videoSoundBtn.addEventListener("click", function () {
      if (videoSoundOn) {
        heroVideo.muted = true;
        videoSoundBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      } else {
        heroVideo.muted = false;
        videoSoundBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        heroVideo.play();
      }
      videoSoundOn = !videoSoundOn;
    });
  }

  // ===== ĐÓNG GÓP Ý KIẾN =====
  let feedbacks = [];
  const commentsContainer = document.getElementById("commentsContainer");
  const feedbackForm = document.getElementById("feedbackForm");

  function loadFeedbacks() {
    const stored = localStorage.getItem("tet_feedbacks");
    if (stored) {
      feedbacks = JSON.parse(stored);
    } else {
      feedbacks = [
        {
          name: "Nguyễn Thị Hoa",
          email: "hoa@example.com",
          comment:
            "Trang web rất đẹp, đúng không khí Tết! Cảm ơn nhóm đã thực hiện.",
          date: new Date().toLocaleString(),
        },
        {
          name: "Trần Văn Xuân",
          email: "xuan@example.com",
          comment:
            "Phần video nền và hoa đào rơi rất ấn tượng. Chúc mừng năm mới!",
          date: new Date().toLocaleString(),
        },
      ];
      saveFeedbacks();
    }
    renderFeedbacks();
  }

  function saveFeedbacks() {
    localStorage.setItem("tet_feedbacks", JSON.stringify(feedbacks));
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>]/g, function (m) {
      if (m === "&") return "&amp;";
      if (m === "<") return "&lt;";
      if (m === ">") return "&gt;";
      return m;
    });
  }

  function renderFeedbacks() {
    if (!commentsContainer) return;
    if (feedbacks.length === 0) {
      commentsContainer.innerHTML =
        '<div class="empty-comment">Chưa có ý kiến. Hãy là người đầu tiên chia sẻ!</div>';
      return;
    }
    commentsContainer.innerHTML = feedbacks
      .map(
        (fb) => `
      <div class="comment-item">
        <div class="comment-name">${escapeHtml(fb.name)}</div>
        ${
          fb.email
            ? `<div class="comment-email">📧 ${escapeHtml(fb.email)}</div>`
            : ""
        }
        <div class="comment-text">${escapeHtml(fb.comment).replace(
          /\n/g,
          "<br>",
        )}</div>
        <div class="comment-date">${fb.date || ""}</div>
      </div>
    `,
      )
      .join("");
  }

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const nameInput = document.getElementById("fbName");
      const emailInput = document.getElementById("fbEmail");
      const commentInput = document.getElementById("fbComment");
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const comment = commentInput.value.trim();
      if (!name || !comment) {
        alert("Vui lòng nhập họ tên và nội dung ý kiến.");
        return;
      }
      const newFeedback = {
        name: name,
        email: email,
        comment: comment,
        date: new Date().toLocaleString(),
      };
      feedbacks.unshift(newFeedback);
      saveFeedbacks();
      renderFeedbacks();
      feedbackForm.reset();
      const toast = document.createElement("div");
      toast.className = "greeting-toast";
      toast.textContent = "✅ Cảm ơn bạn đã đóng góp ý kiến!";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    });
  }

  loadFeedbacks();
})();
