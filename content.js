(() => {
  const form = document.querySelector('form');
  const passwordInput = document.querySelector('#password[name="password"]');

  if (!form || !passwordInput) {
    return;
  }

  chrome.storage.local.get(['autologinPassword', 'autologinEnabled'], ({ autologinPassword, autologinEnabled }) => {
    if (!autologinEnabled || !autologinPassword) {
      return;
    }

    if (passwordInput.value.trim().length === 0) {
      passwordInput.value = autologinPassword;
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const usernameInput = document.querySelector('#username, input[name="username"]');
    if (!usernameInput || usernameInput.value.trim().length > 0) {
      form.requestSubmit ? form.requestSubmit() : form.submit();
    }
  });
})();
