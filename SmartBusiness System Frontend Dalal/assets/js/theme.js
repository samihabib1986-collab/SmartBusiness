window.addEventListener("DOMContentLoaded", () => {

    const themeBtn = document.querySelectorAll(".icon-btn")[1]; 
    const icon = themeBtn?.querySelector("i");

    // تحميل الوضع المحفوظ
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");

        if (icon) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
    }

    // تشغيل التبديل
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {

            const isDark = document.body.classList.toggle("dark");

            if (icon) {
                icon.classList.toggle("fa-moon", !isDark);
                icon.classList.toggle("fa-sun", isDark);
            }

            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

});