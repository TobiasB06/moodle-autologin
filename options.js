const passwordInput = document.getElementById('password');
const enabledInput = document.getElementById('enabled');
const status = document.getElementById('status');
const saveButton = document.getElementById('save');

chrome.storage.local.get(['autologinPassword', 'autologinEnabled'], ({ autologinPassword, autologinEnabled }) => {
  passwordInput.value = autologinPassword || '';
  enabledInput.checked = Boolean(autologinEnabled);
});

saveButton.addEventListener('click', () => {
  chrome.storage.local.set(
    {
      autologinPassword: passwordInput.value,
      autologinEnabled: enabledInput.checked,
    },
    () => {
      status.textContent = 'Configuración guardada.';
      setTimeout(() => {
        status.textContent = '';
      }, 2000);
    }
  );
});
