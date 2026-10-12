(() => {
  if (!("serviceWorker" in navigator)) return;

  const PAGE_VERSION = "__BUILD_VERSION__";
  const RELOAD_GUARD_KEY = "sportsday-sw-reload-pending";
  const DISMISSED_VERSION_KEY = "sportsday-dismissed-version";
  const notice = document.querySelector("#site-update-notice");
  const applyButton = document.querySelector("#apply-site-update");
  const dismissButton = document.querySelector("#dismiss-site-update");
  let registration = null;
  let latestVersion = "";
  let isApplyingUpdate = false;
  let reloadTimer = 0;

  function storageGet(key) {
    try { return sessionStorage.getItem(key); } catch { return null; }
  }

  function storageSet(key, value) {
    try { sessionStorage.setItem(key, value); } catch { /* 隱私模式不阻止更新。 */ }
  }

  if (storageGet(RELOAD_GUARD_KEY) === "1") {
    try { sessionStorage.removeItem(RELOAD_GUARD_KEY); } catch { /* no-op */ }
  }

  function showNotice(version) {
    if (!notice) return;
    latestVersion = version || latestVersion || "new-version";
    if (storageGet(DISMISSED_VERSION_KEY) === latestVersion) return;
    notice.hidden = false;
  }

  function hideNotice() {
    if (notice) notice.hidden = true;
  }

  function reloadOnce() {
    if (storageGet(RELOAD_GUARD_KEY) === "1") return;
    storageSet(RELOAD_GUARD_KEY, "1");
    window.location.reload();
  }

  function waitForInstall(worker) {
    if (!worker || worker.state === "installed" || worker.state === "redundant") return Promise.resolve();
    return new Promise((resolve) => {
      const finish = () => {
        if (worker.state === "installed" || worker.state === "redundant") {
          worker.removeEventListener("statechange", finish);
          resolve();
        }
      };
      worker.addEventListener("statechange", finish);
      finish();
      window.setTimeout(resolve, 20000);
    });
  }

  async function applyUpdate() {
    if (isApplyingUpdate) return;
    isApplyingUpdate = true;
    if (applyButton) {
      applyButton.disabled = true;
      applyButton.textContent = "正在載入…";
    }

    try {
      if (registration && !registration.waiting) {
        await registration.update().catch(() => {});
        if (!registration.waiting && registration.installing) {
          await waitForInstall(registration.installing);
        }
      }

      const waitingWorker = registration?.waiting;
      if (waitingWorker) {
        waitingWorker.postMessage({ type: "SKIP_WAITING" });
        reloadTimer = window.setTimeout(reloadOnce, 3000);
      } else {
        reloadOnce();
      }
    } catch {
      reloadOnce();
    }
  }

  async function checkServerVersion() {
    try {
      const response = await fetch(`./version.json?check=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      if (data.version && data.version !== PAGE_VERSION) {
        showNotice(data.version);
        if (registration) registration.update().catch(() => {});
      }
    } catch {
      // 斷線時不打擾使用者；恢復連線後會再次檢查。
    }
  }

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!isApplyingUpdate) return;
    window.clearTimeout(reloadTimer);
    reloadOnce();
  });

  applyButton?.addEventListener("click", applyUpdate);
  dismissButton?.addEventListener("click", () => {
    if (latestVersion) storageSet(DISMISSED_VERSION_KEY, latestVersion);
    hideNotice();
  });

  navigator.serviceWorker.register("./sw.js", { scope: "./", updateViaCache: "none" })
    .then((result) => {
      registration = result;
      if (registration.waiting && navigator.serviceWorker.controller) showNotice(latestVersion);

      registration.addEventListener("updatefound", () => {
        const installing = registration.installing;
        if (!installing) return;
        installing.addEventListener("statechange", () => {
          if (installing.state === "installed" && navigator.serviceWorker.controller) {
            showNotice(latestVersion);
          }
        });
      });

      registration.update().catch(() => {});
      checkServerVersion();
      window.setInterval(() => registration?.update().catch(() => {}), 5 * 60 * 1000);
    })
    .catch(() => {});

  ["focus", "online", "pageshow"].forEach((eventName) => {
    window.addEventListener(eventName, checkServerVersion);
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") checkServerVersion();
  });
  window.setInterval(checkServerVersion, 5 * 60 * 1000);
})();
