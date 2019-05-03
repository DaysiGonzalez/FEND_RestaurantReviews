// Register service worker only if supported
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    console.log("Service Worker has been registered!");
  }).catch((e) => {
    console.log("Something failed", e);
  });
}
