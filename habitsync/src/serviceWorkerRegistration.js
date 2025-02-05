// Registers a service worker to make the app installable and work offline
export function register() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
          .then(reg => console.log("Service Worker Registered:", reg))
          .catch(err => console.error("Service Worker Registration Failed:", err));
      });
    }
  }
  
  export function unregister() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(reg => reg.unregister());
    }
  }
  