(function () {
  // Năm hiện tại
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Back to top
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });
  backToTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  // Fade-in observer
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 },
  );
  fadeElements.forEach((el) => observer.observe(el));

  // Petal fall effect
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
    if (petalContainer.children.length < PETAL_COUNT * 1.5) createPetal();
  }, 350);
  for (let i = 0; i < PETAL_COUNT; i++) setTimeout(createPetal, i * 150);

  // Click tiêu đề hiệu ứng
  const logo = document.getElementById("logo-title");
  const header = document.getElementById("main-header");
  const effects = [
    function burstPetals() {
      for (let i = 0; i < 18; i++)
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
      showToast(greetings[Math.floor(Math.random() * greetings.length)]);
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
    effects[Math.floor(Math.random() * effects.length)]();
    logo.style.transform = "scale(1.1)";
    setTimeout(() => (logo.style.transform = ""), 200);
  });

  // Modal card
  const modal = document.getElementById("cardModal"),
    modalImg = document.getElementById("modalImage"),
    modalTitle = document.getElementById("modalTitle"),
    modalDesc = document.getElementById("modalDesc"),
    modalDetail = document.getElementById("modalDetail"),
    closeModal = document.querySelector("#cardModal .close-modal");
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      modalImg.src = card.dataset.img;
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      modalDetail.textContent = card.dataset.detail;
      modal.style.display = "flex";
    });
  });
  if (closeModal)
    closeModal.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Music control
  const music = document.getElementById("backgroundMusic"),
    musicToggle = document.getElementById("musicToggle"),
    musicStatus = document.getElementById("musicStatus");
  let isPlaying = false;
  if (music && musicToggle) {
    music.volume = 0.4;
    musicToggle.addEventListener("click", () => {
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
          .catch(() => alert("Vui lòng tương tác với trang để phát nhạc."));
      }
      isPlaying = !isPlaying;
    });
  }

  // Video sound
  const heroVideo = document.getElementById("heroVideo"),
    videoSoundBtn = document.getElementById("videoSoundBtn");
  let videoSoundOn = false;
  if (heroVideo && videoSoundBtn) {
    videoSoundBtn.addEventListener("click", () => {
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

  // ===== FEEDBACK MODAL =====
  let feedbacks = [];
  const storageKey = "tet_feedbacks_final";
  function loadFeedbacks() {
    const stored = localStorage.getItem(storageKey);
    if (stored) feedbacks = JSON.parse(stored);
    else {
      feedbacks = [
        {
          name: "Nguyễn Thị Hoa",
          email: "hoa@example.com",
          comment: "Trang web rất đẹp, đúng không khí Tết!",
          date: new Date().toLocaleString(),
        },
        {
          name: "Trần Văn Xuân",
          email: "xuan@example.com",
          comment: "Phần video nền và hoa đào rơi rất ấn tượng.",
          date: new Date().toLocaleString(),
        },
      ];
      saveFeedbacks();
    }
    renderFeedbacks();
  }
  function saveFeedbacks() {
    localStorage.setItem(storageKey, JSON.stringify(feedbacks));
  }
  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(
      /[&<>]/g,
      (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[m],
    );
  }
  function renderFeedbacks() {
    const container = document.getElementById("commentsContainerModal");
    if (!container) return;
    if (feedbacks.length === 0) {
      container.innerHTML =
        '<div class="empty-msg">Chưa có ý kiến. Hãy là người đầu tiên chia sẻ!</div>';
      return;
    }
    container.innerHTML = feedbacks
      .map(
        (fb) => `
      <div class="comment-item">
        <div class="comment-name">${escapeHtml(fb.name)}</div>
        ${fb.email ? `<div style="font-size:0.8rem; color:#888;">📧 ${escapeHtml(fb.email)}</div>` : ""}
        <div style="margin-top:5px;">${escapeHtml(fb.comment).replace(/\n/g, "<br>")}</div>
        <div class="comment-date">${fb.date || ""}</div>
      </div>
    `,
      )
      .join("");
  }
  const feedbackForm = document.getElementById("feedbackFormModal");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("fbNameModal").value.trim();
      const email = document.getElementById("fbEmailModal").value.trim();
      const comment = document.getElementById("fbCommentModal").value.trim();
      if (!name || !comment) {
        alert("Vui lòng nhập họ tên và nội dung ý kiến.");
        return;
      }
      feedbacks.unshift({
        name,
        email,
        comment,
        date: new Date().toLocaleString(),
      });
      saveFeedbacks();
      renderFeedbacks();
      feedbackForm.reset();
      const toast = document.createElement("div");
      toast.className = "greeting-toast";
      toast.textContent = "✅ Cảm ơn bạn đã đóng góp!";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    });
  }
  const feedbackModal = document.getElementById("feedbackModal");
  const openFeedbackBtn = document.getElementById("openFeedbackBtn");
  const closeFeedbackBtn = document.querySelector(
    "#feedbackModal .close-feedback",
  );
  if (openFeedbackBtn) {
    openFeedbackBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (feedbackModal) feedbackModal.style.display = "flex";
    });
  }
  if (closeFeedbackBtn)
    closeFeedbackBtn.addEventListener("click", () => {
      if (feedbackModal) feedbackModal.style.display = "none";
    });
  window.addEventListener("click", (e) => {
    if (e.target === feedbackModal) feedbackModal.style.display = "none";
  });
  loadFeedbacks();

  // ===== ACTIVE MENU + SOFT PULSE =====
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a[data-nav]");
  function setActiveNav() {
    let scrollPos = window.scrollY + 150;
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionBottom)
        current = section.getAttribute("id");
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-nav") === current)
        link.classList.add("active");
    });
  }
  window.addEventListener("scroll", setActiveNav);
  window.addEventListener("load", setActiveNav);
})();
