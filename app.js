const dashboardData = {
    today: {
        label: "Today",
        kpis: {
            aum: ["INR 1,284 Cr", "Up 1.8 percent"],
            flows: ["INR 6.4 Cr", "Balanced and tax-aware products led flows"],
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
            copy: "Suitability, billing and onboarding items are driving the queue."
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
            flows: ["INR 42.8 Cr", "Debt and fresh mandates led flows"],
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
            flows: ["INR 118 Cr", "Mandate renewals and tactical deployment led growth"],
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
const heroLogo = document.getElementById("heroLogo");
const themeToggleButton = document.getElementById("themeToggle");
const themeToggleLabel = document.querySelector("[data-theme-label]");
const searchInput = document.getElementById("moduleSearch");
const searchFeedback = document.getElementById("searchFeedback");
const noResults = document.getElementById("noResults");
const sections = Array.from(document.querySelectorAll(".searchable-section[id]"));
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
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

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
    const isDark = theme === "dark";
    body.dataset.theme = theme;

    if (heroLogo) {
        const nextLogo = isDark ? heroLogo.dataset.darkSrc : heroLogo.dataset.lightSrc;
        if (nextLogo) {
            heroLogo.src = nextLogo;
        }
    }

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

function setSidebarState(isOpen) {
    body.classList.toggle("sidebar-open", isOpen);
    pageOverlay.hidden = !isOpen;
    openSidebarButton.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
        closeSidebarButton.focus();
    } else {
        openSidebarButton.focus();
    }
}

openSidebarButton.addEventListener("click", () => setSidebarState(true));
closeSidebarButton.addEventListener("click", () => setSidebarState(false));
pageOverlay.addEventListener("click", () => setSidebarState(false));

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("sidebar-open")) {
        setSidebarState(false);
    }
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 1140) {
            setSidebarState(false);
        }
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
        const target = document.getElementById(button.dataset.scrollTarget);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
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
        searchFeedback.textContent = "Search markets, clients, orders, billing or reports.";
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
