try {
    // Reset CAPTCHA verification status on page load
    chrome.storage.local.set({ captchaVerified: false });

    // Check if CAPTCHA is already verified
    chrome.storage.local.get("captchaVerified", (data) => {
        if (chrome.runtime.lastError) {
            console.error("Error accessing storage:", chrome.runtime.lastError);
            return; // Prevent further execution
        }
        if (data.captchaVerified) return; // If verified, do nothing

        // Create an overlay that blocks the website
        let overlay = document.createElement("div");
        overlay.id = "captcha-overlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0, 0, 0, 0.8)";
        overlay.style.zIndex = "9999";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.color = "#fff";
        overlay.style.fontSize = "20px";
        overlay.innerHTML = `<div style="text-align:center;">
            <p>You need to verify with CAPTCHA to continue.</p>
            <button id="openCaptcha" style="padding: 10px 20px; font-size: 18px;">OK</button>
        </div>`;

        // Append overlay to the webpage
        document.body.appendChild(overlay);

        // When user clicks "OK", open the CAPTCHA game
        document.getElementById("openCaptcha").addEventListener("click", () => {
            window.open(chrome.runtime.getURL("game/game.html"), "_blank", "width=500,height=600");
        });

        // Listen for verification status
        chrome.storage.onChanged.addListener((changes) => {
            if (changes.captchaVerified && changes.captchaVerified.newValue) {
                document.body.removeChild(overlay); // Remove the blocker
            }
        });
    });
} catch (error) {
    console.error("Error in CAPTCHA script:", error);
}
