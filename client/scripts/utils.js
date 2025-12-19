const PUBLIC_KEY =
  "BGsYvVVMDJioU5-XnRtM-qfC6hRQQlL1npI4c6Dv05MVzFY9cOGDJgf3TepaeaWQaGpR9DHk7LuQlhXpJqlH5TE";

export function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function askNotificationPermission() {
  let permission = { granted: false, error: "" };
  if (!("Notification" in window)) {
    permission.error = "Your Browser Doesn't Support Notifications";
  }

  if (Notification.permission === "granted") {
    permission.granted = true;
    return permission;
  }

  const request = await Notification.requestPermission();

  if (request !== "granted") {
    permission.error = "You Blocked Notifications!";
  } else {
    permission.granted = true;
  }

  return permission;
}

export async function setUpServiceWorker() {
  if (!("serviceWorker" in navigator))
    return "Your Browser Doesn't Support Service Worker!";

  if (navigator.serviceWorker.controller)
    return "You Will Be Recieving Notifications Each 10 Seconds!";

  try {
    await navigator.serviceWorker.register("./service-worker.js", {
      scope: "/",
    });

    const sw = await navigator.serviceWorker.ready;

    const isClientSubscribedBefore = await sw.pushManager.getSubscription();

    if (!isClientSubscribedBefore) {
      const subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
      });

      await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: { "content-type": "application/json" },
      });
      return "You Will Be Recieving Notifications Each 10 Seconds!";
    }
  } catch (error) {
    return "Something Went Wrong!";
  }
}
