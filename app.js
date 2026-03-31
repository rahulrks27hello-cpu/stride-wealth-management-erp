const dashboardData = {
    today: {
        label: "Today",
        kpis: {
            aum: ["INR 1,284 Cr", "Up 1.8 percent"],
            flows: ["INR 6.4 Cr", "Balanced and tax-aware products led"],
            households: ["412", "12 reviews due this week"],
            fees: ["97.8%", "3 invoices need approval"],
            issues: ["12", "Mostly compliance and service"]
        },
        summaries: {
            suitability: "18 reviews",
            approvals: "6 trades",
            cash: "1.4x"
        },
        queue: {
            headline: "9 items need action today",
            copy: "Suitability, billing and onboarding lead the queue."
        },
        allocation: {
            equity: 42,
            fixed: 28,
            alts: 16,
            insurance: 9,
            cash: 5
        },
        trendPoints: [24, 30, 38, 52, 64, 68, 76, 88]
    },
    month: {
        label: "Month",
        kpis: {
            aum: ["INR 1,301 Cr", "Up 4.6 percent this month"],
            flows: ["INR 42.8 Cr", "Debt and new mandates led"],
            households: ["419", "27 reviews completed"],
            fees: ["98.2%", "Exceptions are down"],
            issues: ["8", "Escalations are down"]
        },
        summaries: {
            suitability: "42 reviews",
            approvals: "19 trades",
            cash: "1.7x"
        },
        queue: {
            headline: "Month-end operations improved",
            copy: "Onboarding and billing improved. Exceptions fell."
        },
        allocation: {
            equity: 44,
            fixed: 27,
            alts: 15,
            insurance: 8,
            cash: 6
        },
        trendPoints: [28, 34, 42, 56, 70, 82, 90, 102]
    },
    quarter: {
        label: "Quarter",
        kpis: {
            aum: ["INR 1,346 Cr", "Up 8.9 percent this quarter"],
            flows: ["INR 118 Cr", "Mandate renewals and tactical deployment led"],
            households: ["431", "Top-tier reviews are current"],
            fees: ["98.6%", "Collections improved"],
            issues: ["5", "Mostly compliance"]
        },
        summaries: {
            suitability: "96 reviews",
            approvals: "41 trades",
            cash: "1.9x"
        },
        queue: {
            headline: "Quarter close remains strong",
            copy: "AUM, billing and service stayed strong."
        },
        allocation: {
            equity: 46,
            fixed: 26,
            alts: 15,
            insurance: 7,
            cash: 6
        },
        trendPoints: [18, 26, 34, 48, 66, 84, 96, 116]
    }
};

const body = document.body;
const openSidebarButton = document.getElementById("openSidebar");
const closeSidebarButton = document.getElementById("closeSidebar");
const pageOverlay = document.getElementById("pageOverlay");
const periodButtons = Array.from(document.querySelectorAll(".period-button"));
const themeAwareLogos = Array.from(document.querySelectorAll("[data-light-src][data-dark-src]"));
const themeToggleButton = document.getElementById("themeToggle");
const themeToggleLabel = document.querySelector("[data-theme-label]");
const logoutButton = document.getElementById("logoutButton");
const searchInput = document.getElementById("moduleSearch");
const searchFeedback = document.getElementById("searchFeedback");
const noResults = document.getElementById("noResults");
const authShell = document.getElementById("authShell");
const startupSplash = document.getElementById("startupSplash");
const authCard = document.querySelector(".auth-card");
const welcomeModal = document.getElementById("welcomeModal");
const closeWelcomeButton = document.getElementById("closeWelcome");
const loginForm = document.getElementById("loginForm");
const loginSubmitButton = loginForm ? loginForm.querySelector(".auth-submit") : null;
const loginButtonDefaultLabel = loginSubmitButton ? loginSubmitButton.textContent.trim() : "Login";
const forgotPasswordModal = document.getElementById("forgotPasswordModal");
const openForgotPasswordButton = document.getElementById("openForgotPassword");
const closeForgotPasswordButton = document.getElementById("closeForgotPassword");
const cancelForgotPasswordButton = document.getElementById("cancelForgotPassword");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const forgotPasswordStatus = document.getElementById("forgotPasswordStatus");
const forgotUserIdInput = document.getElementById("forgotUserId");
const forgotEmailInput = document.getElementById("forgotEmail");
const forgotMobileInput = document.getElementById("forgotMobile");
const forgotDeskInput = document.getElementById("forgotDesk");
const userIdInput = document.getElementById("userId");
const userPasswordInput = document.getElementById("userPassword");
const captchaPrompt = document.getElementById("captchaPrompt");
const captchaInput = document.getElementById("captchaInput");
const refreshCaptchaButton = document.getElementById("refreshCaptcha");
const loginError = document.getElementById("loginError");
const authLoadingScreen = document.getElementById("authLoadingScreen");
const authLoadingStatus = document.getElementById("authLoadingStatus");
const authLoadingBar = document.getElementById("authLoadingBar");
const authLoadingPercent = document.getElementById("authLoadingPercent");
const authLoadingSteps = Array.from(document.querySelectorAll("[data-auth-loading-step]"));
const flowDetailTitle = document.getElementById("flowDetailTitle");
const flowDetailReceives = document.getElementById("flowDetailReceives");
const flowDetailSends = document.getElementById("flowDetailSends");
const flowDetailLinks = document.getElementById("flowDetailLinks");
const flowDetailPanel = document.getElementById("flowDetailPanel");
const flowDetailTriggers = Array.from(document.querySelectorAll("[data-flow-title]"));
const moduleSections = Array.from(document.querySelectorAll(".module-section"));
const sections = Array.from(document.querySelectorAll(".searchable-section[id]"));
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const internalSectionLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
const marketWatchGrid = document.getElementById("marketWatchGrid");
const marketNewsSlider = document.getElementById("marketNewsSlider");
const marketNewsList = document.getElementById("marketNewsList");
const marketNewsPrevButton = document.getElementById("marketNewsPrev");
const marketNewsNextButton = document.getElementById("marketNewsNext");
const marketNewsDots = document.getElementById("marketNewsDots");
const marketReels = [
    document.getElementById("marketReelPrimary"),
    document.getElementById("marketReelClone")
];
let marketNewsIndex = 0;
const themeStorageKey = "stride-theme";
let activeCaptchaCode = "";
let authLoadingTimers = [];
const startupSplashDuration = 1350;
const reportDownloadDelay = 5000;
const authLoadingMilestones = [
    {
        delay: 0,
        percent: 9,
        message: "Authenticating your credentials and captcha response.",
        step: 0
    },
    {
        delay: 1200,
        percent: 31,
        message: "Syncing user privileges, advisory books and access policies.",
        step: 1
    },
    {
        delay: 2500,
        percent: 58,
        message: "Loading market watchlists, mandates and active queues.",
        step: 2
    },
    {
        delay: 3900,
        percent: 86,
        message: "Running compliance checks and preparing dashboards.",
        step: 3
    },
    {
        delay: 4600,
        percent: 100,
        message: "Workspace ready. Opening Stride Wealth ERP.",
        step: 3
    }
];

const marketFeed = [
    { symbol: "SENSEX", meta: "BSE 30", unit: "pts", baseValue: 73583.22, value: 73583.22 },
    { symbol: "NIFTY 50", meta: "NSE benchmark", unit: "pts", baseValue: 22819.6, value: 22819.6 },
    { symbol: "RELIANCE", meta: "Energy", unit: "INR", baseValue: 2864.35, value: 2864.35 },
    { symbol: "HDFCBANK", meta: "Private bank", unit: "INR", baseValue: 1681.9, value: 1681.9 },
    { symbol: "TCS", meta: "IT services", unit: "INR", baseValue: 4138.6, value: 4138.6 },
    { symbol: "INFY", meta: "Technology", unit: "INR", baseValue: 1564.8, value: 1564.8 },
    { symbol: "ICICIBANK", meta: "Banking", unit: "INR", baseValue: 1094.3, value: 1094.3 },
    { symbol: "SBIN", meta: "PSU bank", unit: "INR", baseValue: 782.45, value: 782.45 }
];

const marketWatchData = [
    {
        kind: "Benchmark",
        name: "Sensex",
        meta: "BSE 30 | Last close",
        value: 73583.22,
        change: -2.25,
        source: "The Times of India",
        date: "27 Mar 2026",
        note: "Oil and geopolitical risk hit sentiment.",
        points: [96, 93, 91, 87, 81, 74, 67, 61],
        search: "sensex bse 30 benchmark market close oil geopolitics"
    },
    {
        kind: "Benchmark",
        name: "Nifty 50",
        meta: "NSE benchmark | Last close",
        value: 22819.6,
        change: -2.09,
        source: "The Times of India",
        date: "27 Mar 2026",
        note: "Broad market selling pushed the index lower.",
        points: [94, 92, 89, 85, 79, 72, 66, 60],
        search: "nifty 50 nse benchmark market close sell off"
    },
    {
        kind: "Sector index",
        name: "Nifty Bank",
        meta: "Banking sector pulse",
        value: 54413.4,
        change: 1.22,
        source: "Moneycontrol indices",
        date: "16 Mar 2026",
        note: "Banks led the latest sector snapshot.",
        points: [48, 52, 56, 61, 66, 72, 78, 84],
        search: "nifty bank banking sector financials sector pulse"
    },
    {
        kind: "Sector index",
        name: "Nifty Auto",
        meta: "Auto sector pulse",
        value: 24599.1,
        change: 1.67,
        source: "Moneycontrol indices",
        date: "16 Mar 2026",
        note: "Autos led the latest sector snapshot.",
        points: [46, 49, 53, 58, 64, 71, 78, 86],
        search: "nifty auto automobile sector sector pulse"
    },
    {
        kind: "Sector index",
        name: "Nifty IT",
        meta: "Technology sector pulse",
        value: 29042.55,
        change: -0.1,
        source: "Moneycontrol indices",
        date: "16 Mar 2026",
        note: "IT stayed near flat.",
        points: [68, 69, 70, 69, 68, 67, 66, 66],
        search: "nifty it technology sector sector pulse"
    },
    {
        kind: "Sector index",
        name: "Nifty Pharma",
        meta: "Pharma sector pulse",
        value: 22547.2,
        change: -1.25,
        source: "Moneycontrol indices",
        date: "16 Mar 2026",
        note: "Pharma stayed defensive but closed lower.",
        points: [82, 80, 78, 76, 73, 70, 67, 64],
        search: "nifty pharma healthcare sector sector pulse"
    }
];

const marketNewsData = [
    {
        title: "Benchmarks fell sharply on March 27 as oil and geopolitical risk hit sentiment",
        summary: "Sensex closed at 73,583.22 and Nifty 50 at 22,819.60 after a broad sell-off.",
        source: "The Times of India",
        date: "27 Mar 2026",
        url: "https://timesofindia.indiatimes.com/business/india-business/stock-market-today-nifty50-bse-sensex-march-27-2026-dalal-street-indian-equities-global-markets-us-iran-war-donald-trump-oil-prices/articleshow/129838012.cms",
        search: "market crash oil geopolitical risk nifty sensex sell off"
    },
    {
        title: "Nifty March 2026 rejig puts passive flows back in focus",
        summary: "Bharti Airtel may gain weight; Reliance Industries and HDFC Bank may see passive outflows.",
        source: "The Economic Times",
        date: "28 Mar 2026",
        url: "https://m.economictimes.com/markets/stocks/news/nifty-march-2026-rejig-bharti-airtel-sees-weight-increase-reliance-hdfc-bank-to-witness-outflows/articleshow/129842250.cms",
        search: "nifty rejig passive flows bharti airtel reliance hdfc bank"
    },
    {
        title: "Brokerages still see India resilient even as volatility stays elevated",
        summary: "PL Wealth says crude and global cues may keep markets range-bound, but India remains resilient.",
        source: "Moneycontrol",
        date: "17 Mar 2026",
        url: "https://www.moneycontrol.com/news/business/markets/despite-volatility-this-brokerage-says-india-s-growth-story-remains-resilient-check-short-term-market-outlook-13863010.html",
        search: "india growth story resilient volatility range bound crude outlook"
    },
    {
        title: "Benchmarks extended gains on March 18 before the next wave of volatility",
        summary: "Moneycontrol noted a stronger close even as the rupee hit a fresh low.",
        source: "Moneycontrol",
        date: "18 Mar 2026",
        url: "https://www.moneycontrol.com/news/business/markets/taking-stock-sensex-nifty-extend-gains-on-3rd-day-rupee-sinks-to-fresh-low-13864125.html",
        search: "sensex nifty gains rupee fresh low market tone volatility"
    }
];

function getPreferredTheme() {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    return "light";
}

function applyTheme(theme) {
    const isDark = theme === "dark";
    body.dataset.theme = theme;

    themeAwareLogos.forEach((logo) => {
        const nextLogo = isDark ? logo.dataset.darkSrc : logo.dataset.lightSrc;
        if (nextLogo) {
            logo.src = nextLogo;
        }
    });

    if (!themeToggleButton) {
        return;
    }

    themeToggleButton.setAttribute("aria-pressed", String(isDark));
    themeToggleButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");

    if (themeToggleLabel) {
        themeToggleLabel.textContent = isDark ? "Dark mode" : "Light mode";
    }
}

applyTheme(getPreferredTheme());

if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
        const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
        window.localStorage.setItem(themeStorageKey, nextTheme);
        applyTheme(nextTheme);
    });
}

function createCaptchaCode() {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 5 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
}

function renderCaptcha() {
    activeCaptchaCode = createCaptchaCode();
    if (captchaPrompt) {
        captchaPrompt.textContent = activeCaptchaCode;
    }
}

function closeWelcomeModal() {
    if (!welcomeModal) {
        return;
    }

    welcomeModal.classList.remove("is-visible");
    welcomeModal.hidden = true;

    if (!body.classList.contains("is-authenticated") && userIdInput) {
        userIdInput.focus();
    }
}

function openForgotPasswordModal() {
    if (!forgotPasswordModal) {
        return;
    }

    forgotPasswordModal.hidden = false;

    if (forgotPasswordStatus) {
        forgotPasswordStatus.textContent = "";
        forgotPasswordStatus.classList.remove("is-success");
    }

    if (forgotUserIdInput) {
        forgotUserIdInput.focus();
    }
}

function closeForgotPasswordModal() {
    if (!forgotPasswordModal) {
        return;
    }

    forgotPasswordModal.hidden = true;

    if (forgotPasswordStatus) {
        forgotPasswordStatus.textContent = "";
        forgotPasswordStatus.classList.remove("is-success");
    }

    if (!body.classList.contains("is-authenticated") && openForgotPasswordButton) {
        openForgotPasswordButton.focus();
    }
}

function setForgotPasswordPendingState(isPending) {
    if (!forgotPasswordForm) {
        return;
    }

    forgotPasswordForm.querySelectorAll("input, button").forEach((control) => {
        control.disabled = isPending;
    });
}

function updateForgotPasswordStatus(message, isSuccess = false) {
    if (!forgotPasswordStatus) {
        return;
    }

    forgotPasswordStatus.textContent = message;
    forgotPasswordStatus.classList.toggle("is-success", isSuccess);
}

function handleForgotPassword(event) {
    event.preventDefault();

    const userId = forgotUserIdInput?.value.trim() || "";
    const email = forgotEmailInput?.value.trim() || "";
    const mobile = forgotMobileInput?.value.trim() || "";
    const desk = forgotDeskInput?.value.trim() || "";

    if (!userId || !email || !mobile || !desk) {
        updateForgotPasswordStatus("Enter user ID, registered email, mobile and branch/desk.");
        return;
    }

    if (!email.includes("@")) {
        updateForgotPasswordStatus("Enter a valid registered email address.");
        return;
    }

    setForgotPasswordPendingState(true);
    updateForgotPasswordStatus("Validating registered details and raising reset request...");

    window.setTimeout(() => {
        setForgotPasswordPendingState(false);
        updateForgotPasswordStatus("Reset request raised. A reset link or temporary access note will be sent after security validation.", true);
    }, 2200);
}

function showWelcomeModal() {
    if (startupSplash) {
        startupSplash.classList.add("is-exiting");
    }

    if (welcomeModal) {
        welcomeModal.hidden = false;
        window.requestAnimationFrame(() => {
            welcomeModal.classList.add("is-visible");
        });
    }

    if (startupSplash) {
        window.setTimeout(() => {
            startupSplash.hidden = true;
            startupSplash.classList.remove("is-exiting");
        }, 320);
    }

    if (!body.classList.contains("is-authenticated") && closeWelcomeButton) {
        window.setTimeout(() => closeWelcomeButton.focus(), 220);
    }
}

function clearAuthLoadingTimers() {
    authLoadingTimers.forEach((timerId) => window.clearTimeout(timerId));
    authLoadingTimers = [];
}

function resetAuthExperience() {
    clearAuthLoadingTimers();

    body.classList.remove("is-authenticated", "sidebar-open");
    pageOverlay.hidden = true;
    openSidebarButton.setAttribute("aria-expanded", "false");

    if (authShell) {
        authShell.removeAttribute("aria-busy");
    }

    if (authLoadingScreen) {
        authLoadingScreen.hidden = true;
    }

    if (welcomeModal) {
        welcomeModal.classList.remove("is-visible");
        welcomeModal.hidden = true;
    }

    if (forgotPasswordModal) {
        forgotPasswordModal.hidden = true;
    }

    if (authCard) {
        authCard.hidden = false;
    }

    if (startupSplash) {
        startupSplash.hidden = true;
        startupSplash.classList.remove("is-exiting");
    }

    if (loginForm) {
        loginForm.reset();
    }

    if (forgotPasswordForm) {
        forgotPasswordForm.reset();
    }

    if (loginError) {
        loginError.textContent = "";
    }

    if (forgotPasswordStatus) {
        forgotPasswordStatus.textContent = "";
        forgotPasswordStatus.classList.remove("is-success");
    }

    if (loginSubmitButton) {
        loginSubmitButton.disabled = false;
        loginSubmitButton.textContent = loginButtonDefaultLabel;
    }

    if (refreshCaptchaButton) {
        refreshCaptchaButton.disabled = false;
    }

    setForgotPasswordPendingState(false);
    renderCaptcha();

    if (searchInput) {
        searchInput.value = "";
        applySearchFilter();
    }

    if (userIdInput) {
        userIdInput.focus();
    }
}

function handleLogout() {
    resetAuthExperience();
}

function setAuthLoadingStepState(activeStep, percent) {
    authLoadingSteps.forEach((step, index) => {
        const isComplete = index < activeStep || (percent >= 100 && index === activeStep);
        const isActive = index === activeStep && percent < 100;
        step.classList.toggle("is-complete", isComplete);
        step.classList.toggle("is-active", isActive);
    });
}

function updateAuthLoadingState(percent, message, activeStep) {
    if (authLoadingBar) {
        authLoadingBar.style.width = `${percent}%`;
    }

    if (authLoadingPercent) {
        authLoadingPercent.textContent = `${percent}%`;
    }

    if (authLoadingStatus) {
        authLoadingStatus.textContent = message;
    }

    if (typeof activeStep === "number") {
        setAuthLoadingStepState(activeStep, percent);
    }
}

function startAuthLoading() {
    clearAuthLoadingTimers();

    if (authShell) {
        authShell.setAttribute("aria-busy", "true");
    }

    if (welcomeModal) {
        welcomeModal.hidden = true;
    }

    if (authCard) {
        authCard.hidden = true;
    }

    if (authLoadingScreen) {
        authLoadingScreen.hidden = false;
        authLoadingScreen.focus();
    }

    if (loginError) {
        loginError.textContent = "";
    }

    if (loginSubmitButton) {
        loginSubmitButton.disabled = true;
        loginSubmitButton.textContent = "Signing in...";
    }

    if (refreshCaptchaButton) {
        refreshCaptchaButton.disabled = true;
    }

    updateAuthLoadingState(0, "Initializing secure ERP session.", 0);

    authLoadingMilestones.forEach(({ delay, percent, message, step }) => {
        const timerId = window.setTimeout(() => {
            updateAuthLoadingState(percent, message, step);
        }, delay);

        authLoadingTimers.push(timerId);
    });

    authLoadingTimers.push(window.setTimeout(unlockWorkspace, 5000));
}

function unlockWorkspace() {
    clearAuthLoadingTimers();
    body.classList.add("is-authenticated");

    if (authShell) {
        authShell.removeAttribute("aria-busy");
    }

    if (welcomeModal) {
        welcomeModal.hidden = true;
    }

    if (authLoadingScreen) {
        authLoadingScreen.hidden = true;
    }

    if (authCard) {
        authCard.hidden = false;
    }

    if (loginError) {
        loginError.textContent = "";
    }

    if (captchaInput) {
        captchaInput.value = "";
    }

    if (loginSubmitButton) {
        loginSubmitButton.disabled = false;
        loginSubmitButton.textContent = loginButtonDefaultLabel;
    }

    if (refreshCaptchaButton) {
        refreshCaptchaButton.disabled = false;
    }
}

function handleLogin(event) {
    event.preventDefault();

    const userId = userIdInput ? userIdInput.value.trim() : "";
    const password = userPasswordInput ? userPasswordInput.value : "";
    const typedCaptcha = captchaInput ? captchaInput.value.trim().toUpperCase() : "";
    const credentialsAreValid = userId === "stride_admin" && password === "admin ki jai ho";
    const captchaIsValid = typedCaptcha === activeCaptchaCode;

    if (!credentialsAreValid || !captchaIsValid) {
        if (loginError) {
            loginError.textContent = "Check the user ID, password and captcha.";
        }

        renderCaptcha();

        if (captchaInput) {
            captchaInput.value = "";
            captchaInput.focus();
        }

        return;
    }

    startAuthLoading();
}

function slugify(value) {
    return value
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function formatInputDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function formatReportDate(value) {
    if (!value) {
        return "Not selected";
    }

    const parsedDate = new Date(`${value}T00:00:00`);
    return parsedDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function injectModuleReportBars() {
    const today = new Date();
    const fromDate = formatInputDate(new Date(today.getFullYear(), today.getMonth(), 1));
    const toDate = formatInputDate(today);

    moduleSections.forEach((section, index) => {
        const anchor = section.querySelector(".module-connection-strip") || section.querySelector(".section-header");
        if (!anchor || section.querySelector(".module-report-bar")) {
            return;
        }

        const sectionId = section.id || `module-${index + 1}`;
        anchor.insertAdjacentHTML(
            "afterend",
            `
                <div class="module-report-bar" data-report-module="${sectionId}">
                    <div class="module-report-copy">
                        <p class="sidebar-label">Download report</p>
                        <h3>Module report</h3>
                        <p>Select a date range and download this module summary.</p>
                    </div>
                    <div class="module-report-controls">
                        <label class="report-date-field" for="${sectionId}-from-date">
                            <span>From</span>
                            <input id="${sectionId}-from-date" type="date" value="${fromDate}" data-report-from>
                        </label>
                        <label class="report-date-field" for="${sectionId}-to-date">
                            <span>To</span>
                            <input id="${sectionId}-to-date" type="date" value="${toDate}" data-report-to>
                        </label>
                        <button class="primary-button report-download-button" type="button" data-download-report>Download report</button>
                        <p class="report-status" data-report-status>Ready</p>
                    </div>
                </div>
            `
        );
    });
}

function buildModuleReport(section, fromDate, toDate) {
    const title = section.querySelector(".section-header h2")?.textContent.trim() || "Module";
    const headerBlock = section.querySelector(".section-header > div");
    const summary = headerBlock?.querySelector("p:last-of-type")?.textContent.trim() || "";
    const moduleTags = Array.from(section.querySelectorAll(".section-chip-group .chip")).map((chip) => chip.textContent.trim());
    const connections = Array.from(section.querySelectorAll(".module-connection-strip .connection-pill")).map((pill) => {
        const label = pill.querySelector(".sidebar-label")?.textContent.trim() || "Detail";
        const value = pill.querySelector("strong")?.textContent.trim() || "";
        return `${label}: ${value}`;
    });
    const submodules = Array.from(section.querySelectorAll(".submodule-card")).map((card) => {
        const heading = card.querySelector("h3")?.textContent.trim() || "Submodule";
        const detail = card.querySelector("p:last-of-type")?.textContent.trim() || "";
        return `${heading} - ${detail}`;
    });
    const workAreas = Array.from(section.querySelectorAll(".panel-heading h3")).map((item) => item.textContent.trim());
    const lines = [
        "Stride Wealth Management ERP",
        `${title} Report`,
        "",
        `Period: ${formatReportDate(fromDate)} to ${formatReportDate(toDate)}`
    ];

    if (summary) {
        lines.push(`Overview: ${summary}`);
    }

    if (moduleTags.length) {
        lines.push(`Module focus: ${moduleTags.join(" | ")}`);
    }

    if (connections.length) {
        lines.push("", "Cross-module connection", ...connections.map((item) => `- ${item}`));
    }

    if (submodules.length) {
        lines.push("", "Submodules", ...submodules.map((item) => `- ${item}`));
    }

    if (workAreas.length) {
        lines.push("", "Work areas", ...workAreas.map((item) => `- ${item}`));
    }

    return lines.join("\n");
}

function updateReportStatus(statusElement, message, state) {
    if (!statusElement) {
        return;
    }

    statusElement.textContent = message;
    statusElement.classList.remove("is-error", "is-success");

    if (state) {
        statusElement.classList.add(state);
    }
}

function setReportBarPendingState(reportBar, isPending) {
    if (!reportBar) {
        return;
    }

    reportBar.querySelectorAll("input, button").forEach((control) => {
        control.disabled = isPending;
    });

    const downloadButton = reportBar.querySelector("[data-download-report]");
    if (downloadButton) {
        downloadButton.textContent = isPending ? "Preparing..." : "Download report";
    }
}

function downloadModuleReport(button) {
    const section = button.closest(".module-section");
    const reportBar = button.closest(".module-report-bar");
    const fromInput = reportBar?.querySelector("[data-report-from]");
    const toInput = reportBar?.querySelector("[data-report-to]");
    const statusElement = reportBar?.querySelector("[data-report-status]");
    const fromDate = fromInput?.value || "";
    const toDate = toInput?.value || "";

    if (!section || !reportBar || !fromDate || !toDate) {
        updateReportStatus(statusElement, "Set both dates.", "is-error");
        return;
    }

    if (fromDate > toDate) {
        updateReportStatus(statusElement, "Check the date range.", "is-error");
        return;
    }

    setReportBarPendingState(reportBar, true);
    updateReportStatus(statusElement, "Fetching required data...");

    window.setTimeout(() => {
        const reportText = buildModuleReport(section, fromDate, toDate);
        const moduleName = section.querySelector(".section-header h2")?.textContent.trim() || "module";
        const fileName = `stride-${slugify(moduleName)}-report-${fromDate}-to-${toDate}.txt`;
        const reportBlob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
        const downloadUrl = window.URL.createObjectURL(reportBlob);
        const downloadLink = document.createElement("a");

        downloadLink.href = downloadUrl;
        downloadLink.download = fileName;
        document.body.append(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        window.URL.revokeObjectURL(downloadUrl);

        setReportBarPendingState(reportBar, false);
        updateReportStatus(statusElement, "Downloaded", "is-success");
        window.setTimeout(() => updateReportStatus(statusElement, "Ready"), 2600);
    }, reportDownloadDelay);
}

renderCaptcha();
injectModuleReportBars();
window.setTimeout(showWelcomeModal, startupSplashDuration);

if (closeWelcomeButton) {
    closeWelcomeButton.addEventListener("click", closeWelcomeModal);
}

if (refreshCaptchaButton) {
    refreshCaptchaButton.addEventListener("click", () => {
        renderCaptcha();
        if (captchaInput) {
            captchaInput.focus();
        }
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
}

if (openForgotPasswordButton) {
    openForgotPasswordButton.addEventListener("click", openForgotPasswordModal);
}

if (closeForgotPasswordButton) {
    closeForgotPasswordButton.addEventListener("click", closeForgotPasswordModal);
}

if (cancelForgotPasswordButton) {
    cancelForgotPasswordButton.addEventListener("click", closeForgotPasswordModal);
}

if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", handleForgotPassword);
}

if (forgotPasswordModal) {
    forgotPasswordModal.addEventListener("click", (event) => {
        if (event.target === forgotPasswordModal) {
            closeForgotPasswordModal();
        }
    });
}

if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
}

if (authShell && closeWelcomeButton && welcomeModal && !welcomeModal.hidden) {
    closeWelcomeButton.focus();
}

function setSidebarState(isOpen, options = {}) {
    const { restoreFocus = true } = options;
    body.classList.toggle("sidebar-open", isOpen);
    pageOverlay.hidden = !isOpen;
    openSidebarButton.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
        closeSidebarButton.focus();
    } else if (restoreFocus) {
        openSidebarButton.focus();
    }
}

function scrollToSection(sectionId, updateHash = false) {
    if (!sectionId) {
        return;
    }

    const target = document.getElementById(sectionId);
    if (!target) {
        return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
    });

    if (updateHash) {
        const nextHash = `#${sectionId}`;
        if (window.location.hash !== nextHash) {
            window.history.pushState(null, "", nextHash);
        }
    }
}

openSidebarButton.addEventListener("click", () => setSidebarState(true));
closeSidebarButton.addEventListener("click", () => setSidebarState(false));
pageOverlay.addEventListener("click", () => setSidebarState(false));

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
        return;
    }

    if (forgotPasswordModal && !forgotPasswordModal.hidden) {
        closeForgotPasswordModal();
        return;
    }

    if (welcomeModal && !welcomeModal.hidden) {
        closeWelcomeModal();
        return;
    }

    if (body.classList.contains("sidebar-open")) {
        setSidebarState(false);
    }
});

document.addEventListener("click", (event) => {
    const reportButton = event.target.closest("[data-download-report]");
    if (!reportButton) {
        return;
    }

    downloadModuleReport(reportButton);
});

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const sectionId = link.getAttribute("href")?.slice(1);
        scrollToSection(sectionId, true);

        if (window.innerWidth <= 1140) {
            setSidebarState(false, { restoreFocus: false });
        }
    });
});

internalSectionLinks
    .filter((link) => !link.classList.contains("nav-link"))
    .forEach((link) => {
        link.addEventListener("click", (event) => {
            const sectionId = link.getAttribute("href")?.slice(1);
            if (!sectionId) {
                return;
            }

            event.preventDefault();
            scrollToSection(sectionId, true);
        });
    });

window.addEventListener("resize", () => {
    if (window.innerWidth > 1140) {
        body.classList.remove("sidebar-open");
        pageOverlay.hidden = true;
        openSidebarButton.setAttribute("aria-expanded", "false");
    }
});

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
        scrollToSection(button.dataset.scrollTarget);
    });
});

function updateFlowDetail(trigger) {
    if (!trigger || !flowDetailTitle || !flowDetailReceives || !flowDetailSends || !flowDetailLinks) {
        return;
    }

    if (flowDetailPanel) {
        flowDetailPanel.hidden = false;
    }

    flowDetailTitle.textContent = trigger.dataset.flowTitle || "";
    flowDetailReceives.textContent = trigger.dataset.flowReceives || "";
    flowDetailSends.textContent = trigger.dataset.flowSends || "";
    flowDetailLinks.textContent = trigger.dataset.flowLinks || "";
}

flowDetailTriggers.forEach((trigger) => {
    const showDetail = () => updateFlowDetail(trigger);
    trigger.addEventListener("mouseenter", showDetail);
    trigger.addEventListener("focus", showDetail);
});

function buildPolyline(points) {
    const startX = 24;
    const step = 38;
    return points.map((value, index) => `${startX + step * index},${156 - value}`).join(" ");
}

function buildSparkline(points) {
    const width = 240;
    const height = 72;
    const padding = 8;
    const maximum = Math.max(...points);
    const minimum = Math.min(...points);
    const range = maximum - minimum || 1;
    const step = (width - padding * 2) / Math.max(points.length - 1, 1);
    const line = points
        .map((value, index) => {
            const x = padding + step * index;
            const y = height - padding - ((value - minimum) / range) * (height - padding * 2);
            return `${x.toFixed(2)},${y.toFixed(2)}`;
        })
        .join(" ");

    return {
        line,
        fill: `${padding},${height - padding} ${line} ${width - padding},${height - padding}`
    };
}

function formatMarketValue(item) {
    const formattedValue = item.value.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return item.unit === "INR" ? `INR ${formattedValue}` : `${formattedValue} pts`;
}

function formatIndexValue(value) {
    return `${value.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })} pts`;
}

function renderMarketFeed() {
    const markup = marketFeed
        .map((item) => {
            const difference = item.value - item.baseValue;
            const percentage = (difference / item.baseValue) * 100;
            const direction = difference >= 0 ? "up" : "down";
            const sign = difference >= 0 ? "+" : "";

            return `
                <article class="market-item" aria-label="${item.symbol} ${formatMarketValue(item)} ${sign}${percentage.toFixed(2)} percent">
                    <strong class="market-symbol">${item.symbol}</strong>
                    <span class="market-meta">${item.meta}</span>
                    <span class="market-price">${formatMarketValue(item)}</span>
                    <span class="market-change ${direction}">${sign}${percentage.toFixed(2)}%</span>
                </article>
            `;
        })
        .join("");

    marketReels.forEach((reel) => {
        if (reel) {
            reel.innerHTML = markup;
        }
    });
}

function tickMarketFeed() {
    marketFeed.forEach((item) => {
        const microMove = (Math.random() - 0.48) * 0.006;
        item.value = Math.max(item.value * (1 + microMove), item.unit === "INR" ? 50 : 1000);
    });

    renderMarketFeed();
}

function renderMarketWatch() {
    if (!marketWatchGrid) {
        return;
    }

    marketWatchGrid.innerHTML = marketWatchData
        .map((item) => {
            const direction = item.change >= 0 ? "up" : "down";
            const sign = item.change >= 0 ? "+" : "";
            const chart = buildSparkline(item.points);
            const toneClass = item.change >= 0 ? "is-positive" : "is-negative";

            return `
                <article class="market-watch-card searchable-card ${toneClass}" data-search="${item.search}">
                    <div class="market-card-head">
                        <div>
                            <p class="sidebar-label">${item.kind}</p>
                            <h3>${item.name}</h3>
                            <p class="market-card-label">${item.meta}</p>
                        </div>
                        <span class="market-change ${direction}">${sign}${item.change.toFixed(2)}%</span>
                    </div>
                    <p class="market-card-value">${formatIndexValue(item.value)}</p>
                    <svg class="market-card-chart" viewBox="0 0 240 72" role="img" aria-label="${item.name} trend chart">
                        <line class="sparkline-grid" x1="8" y1="12" x2="232" y2="12"></line>
                        <line class="sparkline-grid" x1="8" y1="60" x2="232" y2="60"></line>
                        <polygon class="sparkline-fill" points="${chart.fill}"></polygon>
                        <polyline class="sparkline-line" points="${chart.line}"></polyline>
                    </svg>
                    <p class="market-card-source">${item.source} | ${item.date}<br>${item.note}</p>
                </article>
            `;
        })
        .join("");
}

function renderMarketNews() {
    if (!marketNewsList) {
        return;
    }

    marketNewsList.innerHTML = marketNewsData
        .map(
            (item) => `
                <article class="market-news-card searchable-card" data-search="${item.search}">
                    <div class="news-meta">
                        <span>${item.source}</span>
                        <span>${item.date}</span>
                    </div>
                    <h4>${item.title}</h4>
                    <p>${item.summary}</p>
                    <a class="news-link" href="${item.url}" target="_blank" rel="noreferrer noopener">Open article</a>
                </article>
            `
        )
        .join("");

    syncMarketNewsSlider();
}

function getVisibleMarketNewsCards() {
    if (!marketNewsList) {
        return [];
    }

    return Array.from(marketNewsList.querySelectorAll(".market-news-card")).filter(
        (card) => !card.classList.contains("is-hidden")
    );
}

function renderMarketNewsDots(slideCount) {
    if (!marketNewsDots) {
        return;
    }

    marketNewsDots.innerHTML = Array.from({ length: slideCount }, (_, index) => `
        <button
            class="news-dot ${index === marketNewsIndex ? "is-active" : ""}"
            type="button"
            data-news-dot="${index}"
            aria-label="Show market news item ${index + 1}"
            aria-pressed="${index === marketNewsIndex ? "true" : "false"}">
        </button>
    `).join("");

    marketNewsDots.querySelectorAll("[data-news-dot]").forEach((button) => {
        button.addEventListener("click", () => {
            setMarketNewsIndex(Number(button.dataset.newsDot));
        });
    });
}

function syncMarketNewsSlider() {
    if (!marketNewsList || !marketNewsPrevButton || !marketNewsNextButton) {
        return;
    }

    const allSlides = Array.from(marketNewsList.querySelectorAll(".market-news-card"));
    const visibleSlides = getVisibleMarketNewsCards();

    allSlides.forEach((slide) => {
        slide.classList.remove("is-active");
        slide.setAttribute("aria-hidden", "true");
    });

    if (!visibleSlides.length) {
        if (marketNewsDots) {
            marketNewsDots.innerHTML = "";
        }
        marketNewsPrevButton.disabled = true;
        marketNewsNextButton.disabled = true;
        return;
    }

    if (marketNewsIndex >= visibleSlides.length) {
        marketNewsIndex = 0;
    }

    visibleSlides.forEach((slide, index) => {
        const isActive = index === marketNewsIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
    });

    renderMarketNewsDots(visibleSlides.length);

    const disableControls = visibleSlides.length <= 1;
    marketNewsPrevButton.disabled = disableControls;
    marketNewsNextButton.disabled = disableControls;

    if (marketNewsSlider) {
        marketNewsSlider.setAttribute(
            "aria-label",
            disableControls
                ? "Current market news"
                : `Current market news slider, item ${marketNewsIndex + 1} of ${visibleSlides.length}`
        );
    }
}

function setMarketNewsIndex(nextIndex) {
    const visibleSlides = getVisibleMarketNewsCards();
    if (!visibleSlides.length) {
        marketNewsIndex = 0;
        syncMarketNewsSlider();
        return;
    }

    marketNewsIndex = (nextIndex + visibleSlides.length) % visibleSlides.length;
    syncMarketNewsSlider();
}

if (marketNewsPrevButton) {
    marketNewsPrevButton.addEventListener("click", () => setMarketNewsIndex(marketNewsIndex - 1));
}

if (marketNewsNextButton) {
    marketNewsNextButton.addEventListener("click", () => setMarketNewsIndex(marketNewsIndex + 1));
}

function renderDashboard(periodKey) {
    const snapshot = dashboardData[periodKey];
    if (!snapshot) {
        return;
    }

    periodButtons.forEach((button) => {
        button.classList.toggle("is-selected", button.dataset.period === periodKey);
    });

    Object.entries(snapshot.kpis).forEach(([key, value]) => {
        const [headline, trend] = value;
        const numberElement = document.querySelector(`[data-kpi="${key}"]`);
        const trendElement = document.querySelector(`[data-kpi-trend="${key}"]`);
        if (numberElement) {
            numberElement.textContent = headline;
        }
        if (trendElement) {
            trendElement.textContent = trend;
        }
    });

    Object.entries(snapshot.summaries).forEach(([key, value]) => {
        const summaryElement = document.querySelector(`[data-summary="${key}"]`);
        if (summaryElement) {
            summaryElement.textContent = value;
        }
    });

    Object.entries(snapshot.allocation).forEach(([key, value]) => {
        const barElement = document.querySelector(`[data-allocation="${key}"]`);
        const labelElement = document.querySelector(`[data-allocation-label="${key}"]`);
        if (barElement) {
            barElement.style.width = `${value}%`;
        }
        if (labelElement) {
            labelElement.textContent = `${value}%`;
        }
    });

    document.getElementById("trendLine").setAttribute("points", buildPolyline(snapshot.trendPoints));
    document.querySelector("[data-range-label]").textContent = snapshot.label;
    document.querySelector("[data-queue-headline]").textContent = snapshot.queue.headline;
    document.querySelector("[data-queue-copy]").textContent = snapshot.queue.copy;
}

periodButtons.forEach((button) => {
    button.addEventListener("click", () => renderDashboard(button.dataset.period));
});

renderDashboard("month");
renderMarketWatch();
renderMarketNews();
renderMarketFeed();
window.setInterval(tickMarketFeed, 2400);

function applySearchFilter() {
    const term = searchInput.value.trim().toLowerCase();
    let visibleSections = 0;

    document.querySelectorAll(".searchable-card").forEach((card) => {
        card.classList.remove("is-hidden");
    });

    document.querySelectorAll(".searchable-section").forEach((section) => {
        const sectionText = (section.dataset.search || section.textContent).toLowerCase();
        const cards = Array.from(section.querySelectorAll(".searchable-card"));
        const sectionDirectMatch = !term || sectionText.includes(term);
        let cardMatchCount = 0;

        cards.forEach((card) => {
            const cardText = (card.dataset.search || card.textContent).toLowerCase();
            const cardMatches = !term || sectionDirectMatch || cardText.includes(term);
            card.classList.toggle("is-hidden", !cardMatches);
            if (cardMatches) {
                cardMatchCount += 1;
            }
        });

        const sectionMatches = !term || sectionDirectMatch || cardMatchCount > 0;
        section.classList.toggle("is-hidden", !sectionMatches);

        if (sectionMatches) {
            visibleSections += 1;
        }
    });

    if (!term) {
        searchFeedback.textContent = "Search modules, clients, orders or reports.";
    } else {
        searchFeedback.textContent = `Showing ${visibleSections} areas for "${term}".`;
    }

    syncMarketNewsSlider();
    noResults.hidden = visibleSections !== 0;
}

searchInput.addEventListener("input", applySearchFilter);

const sectionObserver = new IntersectionObserver(
    (entries) => {
        const visibleEntry = entries
            .filter((entry) => entry.isIntersecting)
            .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (!visibleEntry) {
            return;
        }

        navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${visibleEntry.target.id}`;
            link.classList.toggle("is-active", isActive);
        });
    },
    {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.3, 0.6]
    }
);

sections.forEach((section) => sectionObserver.observe(section));
