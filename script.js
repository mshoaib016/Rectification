const coins = [
  {
    name: "XRP",
    symbol: "XRP",
    price: "$2.91",
    change: "+0.52%",
    up: true,
    icon: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    price: "$115.04",
    change: "+0.23%",
    up: true,
    icon: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$113,473",
    change: "-0.05%",
    up: false,
    icon: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "$4,296.67",
    change: "+2.02%",
    up: true,
    icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  },
  {
    name: "EOS",
    symbol: "EOS",
    price: "$0.68",
    change: "+1.48%",
    up: true,
    icon: "https://coin-images.coingecko.com/coins/images/738/large/CG_EOS_Icon.png?1731705232",
  },
];

function loadTicker() {
  const ticker = document.getElementById("ticker");

  let html = "";
  coins.forEach((c) => {
    html += `
            <div class="coin">
                <img src="${c.icon}">
                ${c.name} (${c.symbol})
                <span class="${c.up ? "green" : "red"}">${c.price} (${
      c.change
    })</span>
                <span class="${c.up ? "green" : "red"}">${
      c.up ? "▲" : "▼"
    }</span>
            </div>
        `;
  });

  // Duplicate for infinite smooth scroll
  ticker.innerHTML = html + html;
}

loadTicker();
