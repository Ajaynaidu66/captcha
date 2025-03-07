let ball = document.getElementById("ball");
let verifyBtn = document.getElementById("verifyBtn");

let moving = true;

// Function to move the ball randomly
function moveBall() {
  if (!moving) return;
  
  let x = Math.random() * 270;
  let y = Math.random() * 270;
  ball.style.top = y + "px";
  ball.style.left = x + "px";
}

// Move the ball every second
let interval = setInterval(moveBall, 1000);

// User clicks the ball
ball.addEventListener("click", () => {
  moving = false;
  clearInterval(interval);
  ball.style.backgroundColor = "green";
  verifyBtn.disabled = false;
});

// Verify button click
verifyBtn.addEventListener("click", () => {
  chrome.storage.local.set({ captchaVerified: true }, () => {
    window.close(); // Close the game window
  });
});
