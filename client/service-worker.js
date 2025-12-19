self.addEventListener("push", (res) => {
  const { title, body } = res.data.json();
  self.registration.showNotification(title, {
    body,
  });
});
