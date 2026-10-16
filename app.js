const scheduleItems = [
  { number: 1, time: "08:50", category: "表演", title: "健身活力健康操", participants: "六年級" },
  { number: 2, time: "09:00", category: "表演", title: "13 勢太極拳及 32 式太極劍", participants: "石門太極拳發展協會" },
  { number: 3, time: "09:10", category: "表演", title: "無敵小可愛", participants: "幼兒園" },
  { number: 4, time: "09:20", category: "表演", title: "小雞很忙", participants: "二年級" },
  { number: 5, time: "09:30", category: "團競", title: "石來運轉", participants: "四年級" },
  { number: 6, time: "09:30", category: "徑賽", title: "八十公尺", participants: "三年級" },
  { number: 7, time: "09:40", category: "團競", title: "熱鬧滾滾", participants: "一年級" },
  { number: 8, time: "09:50", category: "徑賽", title: "五十公尺", participants: "幼兒園" },
  { number: 9, time: "09:50", category: "團競", title: "運鑽人生", participants: "六年級" },
  { number: 10, time: "10:00", category: "團競", title: "跑跑冰淇淋", participants: "二年級" },
  { number: 11, time: "10:10", category: "表演", title: "動物狂歡派對", participants: "四年級" },
  { number: 12, time: "10:20", category: "團競", title: "呼拉圈！圈！圈！", participants: "幼兒園" },
  { number: 13, time: "10:20", category: "徑賽", title: "六十公尺", participants: "一年級" },
  { number: 14, time: "10:30", category: "團競", title: "圈中你我", participants: "五年級" },
  { number: 15, time: "10:40", category: "徑賽", title: "六十公尺", participants: "二年級" },
  { number: 16, time: "10:40", category: "團競", title: "迫不急「袋」衝衝衝", participants: "三年級" },
  { number: 17, time: "10:55", category: "團競", title: "拔河比賽", participants: "60 VS 60・六年級" },
  { number: 18, time: "11:05", category: "團競", title: "拔河比賽", participants: "家長委員 VS 社區" },
  { number: 19, time: "11:15", category: "徑賽", title: "六十公尺", participants: "五、六年級【女】" },
  { number: 20, time: "11:20", category: "徑賽", title: "六十公尺", participants: "五、六年級【男】" },
  { number: 21, time: "11:25", category: "徑賽", title: "一百公尺", participants: "五、六年級【女】" },
  { number: 22, time: "11:30", category: "徑賽", title: "一百公尺", participants: "五、六年級【男】" },
  { number: 23, time: "11:35", category: "團競", title: "社區趣味競賽", participants: "社區男女" },
  { number: 24, time: "11:35", category: "徑賽", title: "社區一百公尺", participants: "社區男女" },
  { number: 25, time: "13:00", category: "徑賽", title: "社區八百公尺接力賽", participants: "社區男女" },
  { number: 26, time: "13:10", category: "徑賽", title: "班際接力賽", participants: "三年級" },
  { number: 27, time: "13:20", category: "徑賽", title: "班際接力賽", participants: "四年級" },
  { number: 28, time: "13:30", category: "徑賽", title: "班際接力賽", participants: "五年級" },
  { number: 29, time: "13:40", category: "徑賽", title: "班際接力賽", participants: "六年級" },
  { number: 30, time: "14:00", category: "典禮", title: "閉幕典禮", participants: "全校師生" },
];

const scheduleList = document.querySelector("#schedule-list");
const scheduleCount = document.querySelector("#schedule-count");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
let selectedFilter = "全部";

function renderSchedule() {
  const visibleItems = scheduleItems.filter((item) => {
    return selectedFilter === "全部" || item.category === selectedFilter;
  });

  scheduleCount.textContent = `共 ${visibleItems.length} 個賽程項目`;

  if (visibleItems.length === 0) {
    scheduleList.innerHTML = '<p class="schedule-empty">目前沒有這個類別的賽程。</p>';
    return;
  }

  scheduleList.innerHTML = visibleItems
    .map((item, index) => {
      const number = String(item.number).padStart(2, "0");
      return `
        <article class="schedule-row" style="--row-delay: ${Math.min(index, 6) * 25}ms" data-category="${item.category}" aria-label="${item.time}，${item.title}，${item.participants}">
          <time class="schedule-row__time" datetime="${item.time}">${item.time}</time>
          <div class="schedule-row__copy">
            <span class="schedule-row__number">ITEM ${number}</span>
            <h3>${item.title}</h3>
            <span class="schedule-row__participants">${item.participants}</span>
          </div>
          <span class="schedule-row__tag">${item.category === "團競" ? "團競" : item.category}</span>
        </article>
      `;
    })
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });
    renderSchedule();
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const menuLabel = menuToggle.querySelector(".sr-only");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
  menuLabel.textContent = "開啟導覽選單";
}

menuToggle.addEventListener("click", () => {
  const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  siteNav.classList.toggle("is-open", willOpen);
  menuLabel.textContent = willOpen ? "關閉導覽選單" : "開啟導覽選單";
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) closeMenu();
});

renderSchedule();

// 將 Hyperframes 的分段進場、描線與短交錯節奏套用於互動網頁。
// 使用瀏覽器原生動畫；內容預設可見，動畫失效也能照常閱讀。
(() => {
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motionPreference.matches || typeof Element.prototype.animate !== "function") return;

  const activeAnimations = new Map();
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  let revealObserver;

  function animate(element, frames, options = {}) {
    if (!element || motionPreference.matches) return;
    const animation = element.animate(frames, {
      duration: 680,
      easing: ease,
      fill: "backwards",
      iterations: 1,
      ...options,
    });
    activeAnimations.set(animation, element);
    const release = () => activeAnimations.delete(animation);
    animation.addEventListener("finish", release, { once: true });
    animation.addEventListener("cancel", release, { once: true });
  }

  function rise(element, delay = 0) {
    if (!element) return;
    const style = getComputedStyle(element);
    const restingTransform = style.transform === "none" ? "" : style.transform;
    animate(element, [
      { opacity: 0, transform: `translateY(18px) ${restingTransform}` },
      { opacity: style.opacity, transform: `translateY(0) ${restingTransform}` },
    ], { delay });
  }

  // 從錨點或捲動位置回到網站時，首頁動畫只在可見範圍播放。
  const hero = document.querySelector(".hero");
  if (hero && hero.getBoundingClientRect().bottom > 0 && !window.location.hash) {
    document.querySelectorAll(
      ".hero__copy > .eyebrow, .hero__edition, .hero h1, .hero__intro, .hero__actions, .hero__facts"
    ).forEach((element, index) => rise(element, index * 70));

    const slogan = document.querySelector(".hero__slogan");
    animate(slogan, [
      { opacity: 0, transform: "translateY(16px) rotate(-3deg) scale(0.96)" },
      { opacity: 1, transform: "translateY(-2px) rotate(-0.5deg) scale(1.015)", offset: 0.72 },
      { opacity: 1, transform: "translateY(0) rotate(-1deg) scale(1)" },
    ], { duration: 820, delay: 300 });

    animate(document.querySelector(".hero__visual"), [
      { opacity: 0, transform: "translateY(22px) scale(0.97)" },
      { opacity: 1, transform: "translateY(0) scale(1)" },
    ], { duration: 1100, delay: 140 });

    document.querySelectorAll(".track-art__lane").forEach((lane, index) => {
      const length = lane.getTotalLength();
      animate(lane, [
        { strokeDasharray: `${length}`, strokeDashoffset: `${length}` },
        { strokeDasharray: `${length}`, strokeDashoffset: "0" },
      ], { duration: 1250, delay: 280 + index * 90 });
    });
    rise(document.querySelector(".hero__sticker"), 520);
  }

  if ("IntersectionObserver" in window) {
    const targets = document.querySelectorAll(
      ".day-point, .section-heading, .highlight, .ceremony-card, .schedule-end, " +
      ".parking-heading, .parking-alerts, .parking-option, .parking-rules, " +
      ".flyer-section__heading, .flyer-share-note, .flyer-card, .visitor-intro, .visitor-note, .final-invite h2, " +
      ".preview-reel, .video-card, .preview-note"
    );
    revealObserver = new IntersectionObserver((entries) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry, index) => {
        revealObserver.unobserve(entry.target);
        rise(entry.target, Math.min(index, 3) * 65);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -18px 0px" });
    targets.forEach((target) => revealObserver.observe(target));
  }

  // 鍵盤使用者聚焦時，立即顯示該區塊；偏好變更立即停止動效。
  document.addEventListener("focusin", (event) => {
    for (const [animation, element] of activeAnimations) {
      if (element.contains(event.target)) animation.cancel();
    }
  });
  motionPreference.addEventListener("change", (event) => {
    if (!event.matches) return;
    revealObserver?.disconnect();
    for (const animation of activeAnimations.keys()) animation.cancel();
  });
})();

// 預演影片：HyperFrames 預告動畫（進入畫面才載入、播放）與 YouTube 點擊後才嵌入
(() => {
  const video = document.querySelector(".preview-reel__video");
  const toggle = document.querySelector(".preview-reel__toggle");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const saveData = navigator.connection?.saveData === true;
  let userPaused = reduceMotion.matches || saveData;

  function ensureSource() {
    if (!video || video.getAttribute("src")) return;
    const narrow = window.matchMedia("(max-width: 700px)").matches;
    video.src = narrow ? video.dataset.srcNarrow : video.dataset.srcWide;
  }

  function renderToggle() {
    if (!toggle || !video) return;
    const playing = !video.paused;
    toggle.setAttribute("aria-pressed", String(!playing));
    toggle.querySelector(".preview-reel__toggle-text").textContent = playing ? "暫停動畫" : "播放動畫";
    toggle.querySelector(".preview-reel__toggle-icon").textContent = playing ? "❚❚" : "▶";
  }

  function playReel() {
    ensureSource();
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") attempt.catch(renderToggle);
  }

  if (video) {
    if (toggle) {
      toggle.hidden = false;
      toggle.addEventListener("click", () => {
        if (video.paused) {
          userPaused = false;
          playReel();
        } else {
          userPaused = true;
          video.pause();
        }
      });
    }
    video.addEventListener("play", renderToggle);
    video.addEventListener("pause", renderToggle);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible && !userPaused) playReel();
        else if (!visible && !video.paused) video.pause();
      }, { threshold: 0.3 }).observe(video);
    } else if (!userPaused) {
      playReel();
    }

    reduceMotion.addEventListener?.("change", (event) => {
      if (!event.matches) return;
      userPaused = true;
      video.pause();
    });
    renderToggle();
  }

  // 點封面才換成 YouTube 播放器，頁面一開始不載入三個嵌入框。
  document.querySelectorAll(".video-card__play").forEach((button) => {
    button.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${button.dataset.youtube}?autoplay=1&rel=0&playsinline=1`;
      iframe.title = `${button.dataset.title}（YouTube 影片）`;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      button.replaceWith(iframe);
      iframe.focus();
      if (video && !video.paused) {
        userPaused = true;
        video.pause();
      }
    });
  });
})();
