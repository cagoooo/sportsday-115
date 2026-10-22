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
      ".video-card, .preview-note, .full-stats li, .full-player, .full-actions, .album-note"
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

// 預告動畫（預演區、完整紀錄區）：HyperFrames 循環動畫與 YouTube 點擊後才嵌入
// 預告動畫先整支下載（約 2 MB）再播放，避免網路慢時邊播邊等而卡頓；循環時也不再重抓。
const reelControllers = [];
function pauseAllReels() {
  reelControllers.forEach((reel) => reel.pauseByUser());
}

document.querySelectorAll(".preview-reel").forEach((figure) => {
  const video = figure.querySelector(".preview-reel__video");
  const toggle = figure.querySelector(".preview-reel__toggle");
  if (!video) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const saveData = navigator.connection?.saveData === true;
  let userPaused = reduceMotion.matches || saveData;
  let isVisible = false;
  let loading = null;
  let loaded = false;
  let firstPlay = true;

  function sourceUrl() {
    return window.matchMedia("(max-width: 700px)").matches ? video.dataset.srcNarrow : video.dataset.srcWide;
  }

  function loadReel() {
    if (loading) return loading;
    const url = sourceUrl();
    loading = fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.blob();
      })
      .then((blob) => {
        video.src = URL.createObjectURL(blob);
      })
      .catch(() => {
        video.src = url; // 下載失敗時退回一般串流播放
      })
      .finally(() => {
        loaded = true;
        renderToggle();
      });
    renderToggle();
    return loading;
  }

  function renderToggle() {
    if (!toggle) return;
    const busy = Boolean(loading) && !loaded && !userPaused;
    const playing = !video.paused;
    toggle.setAttribute("aria-busy", String(busy));
    toggle.setAttribute("aria-pressed", String(!playing));
    toggle.querySelector(".preview-reel__toggle-text").textContent = busy ? "載入中…" : playing ? "暫停動畫" : "播放動畫";
    toggle.querySelector(".preview-reel__toggle-icon").textContent = busy ? "…" : playing ? "❚❚" : "▶";
  }

  function playReel() {
    loadReel().then(() => {
      if (userPaused || !isVisible) return;
      if (firstPlay) {
        firstPlay = false;
        const posterTime = Number(video.dataset.posterTime || 0);
        if (posterTime) video.currentTime = posterTime; // 從預覽圖那一格接著播，不會跳一下
      }
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") attempt.catch(renderToggle);
    });
  }

  reelControllers.push({
    pauseByUser() {
      userPaused = true;
      if (!video.paused) video.pause();
      renderToggle();
    },
  });

  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener("click", () => {
      if (video.paused) {
        userPaused = false;
        isVisible = true;
        playReel();
      } else {
        userPaused = true;
        video.pause();
      }
      renderToggle();
    });
  }
  video.addEventListener("play", renderToggle);
  video.addEventListener("pause", renderToggle);

  if ("IntersectionObserver" in window) {
    // 區塊在兩個畫面高度以內就先在背景下載，捲到時多半已經可以直接播。
    const nearObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      nearObserver.disconnect();
      if (saveData) return;
      // 等網頁其他內容載完再在背景下載，不跟首頁圖片搶網路。
      if (document.readyState === "complete") loadReel();
      else window.addEventListener("load", loadReel, { once: true });
    }, { rootMargin: "200% 0px 200% 0px" });
    nearObserver.observe(video.closest("section") || video);

    new IntersectionObserver((entries) => {
      isVisible = entries.some((entry) => entry.isIntersecting);
      if (isVisible && !userPaused) playReel();
      else if (!isVisible && !video.paused) video.pause();
    }, { threshold: 0.3 }).observe(video);
  } else if (!userPaused) {
    isVisible = true;
    playReel();
  }

  reduceMotion.addEventListener?.("change", (event) => {
    if (!event.matches) return;
    userPaused = true;
    video.pause();
  });
  renderToggle();
});

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
    pauseAllReels();
  });
});

// 運動會完整紀錄：章節清單（篩選、搜尋）、點章節跳轉、播放時自動標出目前章節
// 時間＝影片中的秒數；類別：cer 典禮・per 表演・team 團競拔河・trk 田徑・rly 接力
const FULL_CHAPTERS = [
  [0, "低年級舉手海浪舞", "", "per"],
  [65, "運動員進場", "", "cer"],
  [769, "典禮開始・主席就位", "", "cer"],
  [819, "唱國歌", "", "cer"],
  [871, "向國旗行禮", "", "cer"],
  [954, "介紹來賓", "", "cer"],
  [1155, "主席致詞", "", "cer"],
  [1316, "頒發感謝狀", "", "cer"],
  [1437, "來賓致詞", "", "cer"],
  [1803, "家長會長致詞", "", "cer"],
  [1900, "禮成・運動員退場", "", "cer"],
  [2004, "健身活力健康操", "六年級", "per"],
  [2534, "來賓致詞", "", "cer"],
  [2624, "13勢太極拳及13式太極劍", "石門太極拳發展協會", "per"],
  [3004, "無敵小可愛", "幼兒園", "per"],
  [3334, "小雞很忙", "二年級", "per"],
  [3954, "石來運轉", "四年級", "team"],
  [4454, "八十公尺", "三年級", "trk"],
  [4944, "熱鬧滾滾", "一年級", "team"],
  [5489, "五十公尺", "幼兒園", "trk"],
  [5650, "運鑽人生", "六年級", "team"],
  [6325, "跑跑冰淇淋", "二年級", "team"],
  [6890, "動物狂歡派對", "四年級", "per"],
  [7525, "空氣棒！棒！棒！", "幼兒園", "team"],
  [8140, "六十公尺", "一年級", "trk"],
  [8459, "圈中你我", "五年級", "team"],
  [8879, "六十公尺", "二年級", "trk"],
  [9147, "迫不急「袋」衝衝衝", "三年級", "team"],
  [9792, "拔河比賽", "605 VS 604", "team"],
  [10262, "拔河比賽", "家長委員 VS 社區", "team"],
  [10797, "六十公尺", "五年級【女】", "trk"],
  [11097, "六十公尺", "五年級【男】", "trk"],
  [11160, "六十公尺", "六年級【女】", "trk"],
  [11202, "六十公尺", "六年級【男】", "trk"],
  [11282, "一百公尺", "五年級【女】", "trk"],
  [11407, "一百公尺", "五年級【男】", "trk"],
  [11472, "一百公尺", "六年級【女】", "trk"],
  [11530, "一百公尺", "六年級【男】", "trk"],
  [11597, "社區趣味競賽", "社區男女", "team"],
  [12117, "社區 100 公尺", "社區男女", "trk"],
  [12371, "中午休息", "", "cer"],
  [12494, "社區 800 公尺接力賽", "社區男女", "rly"],
  [13124, "班際接力賽", "三年級", "rly"],
  [13745, "班際接力賽", "四年級", "rly"],
  [14210, "班際接力賽", "五年級", "rly"],
  [14695, "班際接力賽", "六年級", "rly"],
  [15330, "閉幕典禮", "", "cer"],
  [15647, "頒獎", "", "cer"],
  [16915, "主席致詞", "", "cer"],
  [17064, "家長會長致詞", "", "cer"],
  [17096, "唱校歌", "", "cer"],
  [17243, "降旗", "", "cer"],
  [17345, "禮成・運動員退場", "", "cer"],
  [17410, "散場花絮", "", "cer"],
];

(() => {
  const VIDEO_ID = "JsuYRXfxR9o";
  const section = document.querySelector("#full-video");
  if (!section) return;
  const list = section.querySelector("#full-chapter-list");
  const screen = section.querySelector(".full-player__screen");
  const startButton = section.querySelector(".full-player__start");
  const search = section.querySelector("#full-search");
  const countLabel = section.querySelector("#full-count");
  const empty = section.querySelector("#full-empty");
  const filterButtons = [...section.querySelectorAll("[data-filter]")];
  const CAT_NAME = { cer: "典禮", per: "表演", team: "團競", trk: "田徑", rly: "接力" };
  let iframe = null;
  let activeIndex = -1;
  let filter = "all";

  const clock = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return h ? `${h}:${m}:${s}` : `${Math.floor(sec / 60)}:${s}`;
  };

  list.innerHTML = FULL_CHAPTERS.map(([t, title, sub, cat], i) => `
    <li class="full-chapter" data-cat="${cat}" data-index="${i}" data-text="${title}${sub}${CAT_NAME[cat]}">
      <button type="button" data-time="${t}">
        <time datetime="PT${t}S">${clock(t)}</time>
        <span class="full-chapter__title">${title}${sub ? `<small>${sub}</small>` : ""}</span>
        <span class="full-chapter__cat full-chapter__cat--${cat}">${CAT_NAME[cat]}</span>
      </button>
    </li>`).join("");
  const items = [...list.querySelectorAll(".full-chapter")];

  function applyFilter() {
    const keyword = (search.value || "").trim().replace(/\s+/g, "");
    let shown = 0;
    items.forEach((item) => {
      const ok = (filter === "all" || item.dataset.cat === filter) && (!keyword || item.dataset.text.includes(keyword));
      item.hidden = !ok;
      if (ok) shown += 1;
    });
    countLabel.textContent = `${shown} 個`;
    empty.hidden = shown > 0;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filter = button.dataset.filter;
      filterButtons.forEach((b) => {
        const on = b === button;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      applyFilter();
    });
  });
  search.addEventListener("input", applyFilter);

  function markActive(index, scroll) {
    if (index === activeIndex) return;
    items[activeIndex]?.classList.remove("is-current");
    items[activeIndex]?.querySelector("button")?.removeAttribute("aria-current");
    activeIndex = index;
    const item = items[index];
    if (!item) return;
    item.classList.add("is-current");
    item.querySelector("button").setAttribute("aria-current", "true");
    if (scroll && !item.hidden) {
      const top = item.offsetTop - list.clientHeight / 2 + item.clientHeight / 2;
      list.scrollTo({ top, behavior: "smooth" });
    }
  }

  function chapterAt(sec) {
    let index = 0;
    FULL_CHAPTERS.forEach(([t], i) => { if (sec >= t) index = i; });
    return index;
  }

  function command(func, args = []) {
    iframe?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");
  }

  // 播放器回報目前秒數（YouTube 嵌入播放器的 postMessage），用來標出現在播到哪一章
  window.addEventListener("message", (event) => {
    if (!iframe || event.source !== iframe.contentWindow) return;
    let data;
    try { data = typeof event.data === "string" ? JSON.parse(event.data) : event.data; } catch { return; }
    const time = data?.info?.currentTime;
    if (typeof time === "number") markActive(chapterAt(time), true);
  });

  function openPlayer(start) {
    pauseAllReels();
    if (iframe) {
      command("seekTo", [start, true]);
      command("playVideo");
      return;
    }
    iframe = document.createElement("iframe");
    const origin = encodeURIComponent(window.location.origin);
    iframe.src = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&playsinline=1&enablejsapi=1&origin=${origin}&start=${start}`;
    iframe.title = "桃園市石門國小 115 學年度運動會完整紀錄（YouTube 影片）";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.addEventListener("load", () => {
      // 請播放器開始回報播放進度
      iframe.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*");
    });
    startButton.replaceWith(iframe);
  }

  startButton.addEventListener("click", () => {
    openPlayer(0);
    markActive(0, false);
    iframe.focus();
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-time]");
    if (!button) return;
    const start = Number(button.dataset.time);
    openPlayer(start);
    markActive(chapterAt(start), false);
    // 手機上播放器在清單上方，跳回去讓家長看得到畫面
    if (window.matchMedia("(max-width: 1100px)").matches) {
      screen.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // 複製影片連結
  const share = section.querySelector(".full-share");
  const status = section.querySelector(".full-share__status");
  share?.addEventListener("click", async () => {
    const url = share.dataset.url;
    try {
      await navigator.clipboard.writeText(url);
      status.textContent = "已複製連結！貼到 LINE 就能分享。";
    } catch {
      status.textContent = `請長按複製：${url}`;
    }
    setTimeout(() => { status.textContent = ""; }, 4000);
  });

  // 數字從 0 數上來（捲到時才播；偏好減少動態就直接顯示）
  const numbers = [...section.querySelectorAll(".full-stats b")];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    const toSeconds = (v) => v.split(":").reduce((a, b) => a * 60 + Number(b), 0);
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      numbers.forEach((el, k) => {
        const target = el.dataset.count;
        const isClock = target.includes(":");
        const end = isClock ? toSeconds(target) : Number(target);
        const t0 = performance.now() + k * 120;
        const duration = 1300;
        const step = (now) => {
          const p = Math.min(1, Math.max(0, (now - t0) / duration));
          const v = Math.round(end * (1 - Math.pow(1 - p, 3)));
          el.textContent = isClock ? clock(v) : String(v);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        };
        el.textContent = isClock ? "0:00" : "0";
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    observer.observe(section.querySelector(".full-stats"));
  }
})();

// 運動會相簿：捲到時六本相簿依序「發牌」進場，照片堆展開成扇形（偏好減少動態就直接顯示）
(() => {
  const cards = [...document.querySelectorAll(".album-card")];
  if (!cards.length) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window) || typeof Element.prototype.animate !== "function") {
    cards.forEach((card) => card.classList.add("is-dealt"));
    return;
  }
  cards.forEach((card) => card.classList.add("is-waiting"));
  const observer = new IntersectionObserver((entries) => {
    entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
      observer.unobserve(entry.target);
      const k = cards.indexOf(entry.target) % 3;
      const card = entry.target;
      const tilt = parseFloat(getComputedStyle(card).getPropertyValue("--tilt")) || 0;
      card.classList.remove("is-waiting");
      card.animate([
        { opacity: 0, transform: `translateY(60px) rotate(${tilt * 4}deg) scale(0.85)` },
        { opacity: 1, transform: `translateY(-6px) rotate(${tilt}deg) scale(1.02)`, offset: 0.7 },
        { opacity: 1, transform: `translateY(0) rotate(${tilt}deg) scale(1)` },
      ], { duration: 720, delay: k * 120, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" });
      setTimeout(() => card.classList.add("is-dealt"), 420 + k * 120);   // 照片堆展開成扇形
    });
  }, { threshold: 0.25 });
  cards.forEach((card) => observer.observe(card));
})();
