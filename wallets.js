console.log("Wallets page loaded!");

const wallets = [
  "Meta Mask",
  "Poloniex",
  "Trust Wallet",
  "Solflare",
  "WalletConnect",
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
  "Other Wallets",
];

const container = document.getElementById("walletContainer");

wallets.forEach((name) => {
  let imageName =
    name
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/'/g, "")
      .replace(/\./g, "")
      .replace(/-/g, "")
      .replace(/\//g, "") + ".webp";

  if (name.toLowerCase().includes("other")) {
    container.innerHTML += `
      <div class="wallet-card">
        <p>${name}</p>
        <div class="icon-row">
          <div class="icon-btn download-btn" onclick="installWallet('${name}')">
            <img src="assets/icons/downloads.png"><span>Install Wallet</span>
          </div>
          <div class="icon-btn rocket-btn" onclick="openWallet('${name}')">
            <img src="assets/icons/rocket.png"><span>Open Wallet</span>
          </div>
          <div class="icon-btn share-btn" onclick="shareWallet('${name}')">
            <img src="assets/icons/share.png"><span>Share</span>
          </div>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML += `
    <div class="wallet-card">
      <img src="wallet-icons/${imageName}">
      <p>${name}</p>
      <div class="icon-row">
        <div class="icon-btn download-btn" onclick="installWallet('${name}')">
          <img src="assets/icons/downloads.png"><span>Install Wallet</span>
        </div>
        <div class="icon-btn rocket-btn" onclick="openWallet('${name}')">
          <img src="assets/icons/rocket.png"><span>Open Wallet</span>
        </div>
        <div class="icon-btn share-btn" onclick="shareWallet('${name}')">
          <img src="assets/icons/share.png"><span>Share</span>
        </div>
      </div>
    </div>
  `;
});

function openWallet(walletName) {
  window.location.href = `wallet-page.html?wallet=${walletName}`;
}

function shareWallet(walletName) {
  if (navigator.share) {
    navigator
      .share({
        title: "Wallet",
        text: `Check this wallet: ${walletName}`,
        url: window.location.href,
      })
      .catch(() => {});
  } else {
    alert("Sharing not supported.");
  }
}

/* 🔥 IMPORTANT:
   Removing ALL PWA install popup triggers
*/
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); // Disable PWA prompt
});

/* ✔ Install wallet progress (safe to keep)
   NO popup will appear now
*/
function installWallet(walletName) {
  if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    alert("Install only works on mobile.");
    return;
  }

  alert("Installing... (simulated)");
}
function shareWallet(walletName) {
  // Generate correct wallet page URL
  const shareUrl =
    `${window.location.origin}/wallet-page.html?wallet=` +
    encodeURIComponent(walletName);

  // If device supports Web Share API
  if (navigator.share) {
    navigator
      .share({
        title: `${walletName} Wallet`,
        text: `Open this wallet page: ${walletName}`,
        url: shareUrl,
      })
      .catch((err) => {
        console.log("Share canceled", err);
      });
  } else {
    // Fallback: Copy link to clipboard
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert("Link copied:\n" + shareUrl);
      })
      .catch(() => {
        alert("Sharing not supported.");
      });
  }
}
