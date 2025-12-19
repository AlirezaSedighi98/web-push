import { askNotificationPermission, setUpServiceWorker } from "./utils.js";

const getStartedBtn = document.getElementById("get-started-button");
const signDiv = document.getElementById("started-sign");

getStartedBtn.classList.add("display-none");
signDiv.classList.add("display-none");

if (
  navigator.serviceWorker.controller &&
  Notification.permission === "granted"
) {
  signDiv.classList.toggle("display-none");
  signDiv.textContent = "You Will Be Recieving Notifications Each 10 Seconds!";
} else if (Notification.permission === "denied") {
  signDiv.classList.toggle("display-none");
  signDiv.textContent = "Don't Have Permission To Show Notification";
} else {
  getStartedBtn.classList.toggle("display-none");
}

getStartedBtn?.addEventListener("click", async () => {
  const notificationPermission = await askNotificationPermission();
  if (notificationPermission.error) {
    signDiv.classList.toggle("display-none");
    signDiv.textContent = notificationPermission.error;
  } else {
    const response = await setUpServiceWorker();
    signDiv.classList.toggle("display-none");
    getStartedBtn.classList.toggle("display-none");
    signDiv.textContent = response;
  }
});
