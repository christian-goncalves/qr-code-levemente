(async function initializeContactCard() {
  const defaults = window.CARD_CONFIG || {};
  let localConfig = {};
  const isLocalEnvironment =
    window.location.protocol === "file:" ||
    ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);

  function loadClassicConfig(path) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = path;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.append(script);
    });
  }

  if (isLocalEnvironment) {
    await loadClassicConfig("./config.local.js");
    if (!window.CARD_LOCAL_CONFIG) {
      await loadClassicConfig("./config.local.example.js");
    }
    localConfig = window.CARD_LOCAL_CONFIG || {};
  }

  const config = { ...defaults, ...localConfig };
  const contactLink = document.querySelector("#whatsapp-link");
  const status = document.querySelector("#redirect-status");
  const number = String(config.whatsappNumber || "").replace(/\D/g, "");
  const validNumber = /^55\d{10,11}$/.test(number) && !/^([0-9])\1+$/.test(number);

  if (!validNumber) {
    status.textContent = "O contato de WhatsApp ainda não foi configurado para publicação.";
    return;
  }

  const message = String(config.message || "").trim();
  const target = new URL(`https://wa.me/${number}`);
  if (message) target.searchParams.set("text", message);

  contactLink.href = target.toString();
  contactLink.classList.remove("is-unavailable");
  contactLink.removeAttribute("aria-disabled");
  contactLink.removeAttribute("tabindex");

  if (new URLSearchParams(window.location.search).has("preview")) {
    status.textContent = "Pré-visualização do cartão. Use o botão abaixo para abrir o WhatsApp.";
    return;
  }

  status.textContent = "Abrindo o WhatsApp. Se isso não acontecer, use o botão abaixo.";
  window.location.replace(target.toString());
})();
