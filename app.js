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
    .map((item) => {
      const number = String(item.number).padStart(2, "0");
      return `
        <article class="schedule-row" data-category="${item.category}" aria-label="${item.time}，${item.title}，${item.participants}">
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
