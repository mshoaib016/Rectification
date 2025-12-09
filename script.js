// Wallet Button
const btn = document.getElementById("connectWalletBtn");
btn.addEventListener("click", () => {
  btn.classList.add("active");
  window.location.href = "wallets.html";
});

// Load GSAP
const gsapScript = document.createElement("script");
gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
document.head.appendChild(gsapScript);

// Load Ticker Data
async function loadTicker() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,eos,xrp,litecoin";

  try {
    const res = await fetch(url);
    const data = await res.json();
    const ticker = document.getElementById("ticker");

    ticker.innerHTML = "";

    // Each coin HTML
    const createCoinHTML = (coin) => {
      let arrow, className;

      // Custom rule: Bitcoin always red
      if (coin.id === "bitcoin") {
        arrow = "▼";
        className = "price-down";
      } else {
        arrow = "▲";
        className = "price-up";
      }

      return `
        <a class="coin" href="https://www.coingecko.com/en/coins/${coin.id}" target="_blank">
          <img src="${coin.image}" alt="${coin.name}">
          <span class="name">${coin.name}</span>
          <span class="${className}">$${coin.current_price.toLocaleString()}</span>
          <span class="${className}">${coin.price_change_percentage_24h.toFixed(2)}% ${arrow}</span>
        </a>
      `;
    };

    let html = "";
    data.forEach(coin => (html += createCoinHTML(coin)));

    // Powered By
    html += `
      <a class="powered" href="https://www.coingecko.com" target="_blank">
        <span style="color:black;">Powered by</span>
        <span style="color:#1dbf00;">CoinGecko</span>
      </a>
    `;

    // Duplicate for infinite scroll
    ticker.innerHTML = html + html;

  } catch (error) {
    console.log("Error loading API:", error);
  }
}

loadTicker();
setInterval(loadTicker, 15000);

// GSAP Infinite Scroll
gsapScript.onload = () => {
  setTimeout(startTickerGSAP, 500);
};

function startTickerGSAP() {
  const ticker = document.getElementById("ticker");

  function animate() {
    const totalWidth = ticker.scrollWidth;

    gsap.fromTo(
      ticker,
      { x: 0 },
      {
        x: -totalWidth / 2,
        duration: 20,
        ease: "linear",
        repeat: -1,
        onRepeat: () => gsap.set(ticker, { x: 0 })
      }
    );
  }

  animate();
}
