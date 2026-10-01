/* Flow Media Downloader — Guide Page Controller
   Developer: Muhammad Asad
*/

document.addEventListener("DOMContentLoaded", async () => {
  const select = document.getElementById("guideLangSelect");

  if (window.FDI18N && select) {
    try {
      await FDI18N.init();

      // If URL has ?lang= parameter, use it
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get("lang");
      if (urlLang) {
        await FDI18N.setLanguage(urlLang);
      }

      FDI18N.populateSelect(select);

      select.addEventListener("change", async () => {
        await FDI18N.setLanguage(select.value);
      });

      window.addEventListener("fd_language_changed", (e) => {
        if (e.detail && e.detail.lang && select.value !== e.detail.lang) {
          select.value = e.detail.lang;
        }
        FDI18N.apply();
      });

      // Force initial apply to populate all data-i18n / data-i18n-html nodes
      FDI18N.apply();
    } catch (err) {
      console.warn("[FlowDownloader Guide] i18n init error:", err);
    }
  }

  // Smooth scroll for Table of Contents links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});
