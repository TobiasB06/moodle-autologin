(() => {
  const form = document.querySelector('form');
  const passwordInput = document.querySelector('#password[name="password"]');

  if (!form || !passwordInput) {
    return;
  }

  const usernameInput = document.querySelector('#username, input[name="username"]');

  const submitFormIfPossible = () => {
    if (!usernameInput || usernameInput.value.trim().length > 0) {
      form.requestSubmit ? form.requestSubmit() : form.submit();
    }
  };

  const createSetupModal = () => {
    const overlay = document.createElement('div');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2147483647;
      padding: 16px;
      box-sizing: border-box;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
      width: min(420px, 100%);
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
      padding: 20px;
      font-family: Arial, sans-serif;
      color: #1f2937;
    `;

    const title = document.createElement('h2');
    title.textContent = 'Configurar autologin';
    title.style.cssText = 'margin: 0 0 8px; font-size: 1.2rem;';

    const description = document.createElement('p');
    description.textContent = 'Guardá tu contraseña una sola vez para iniciar sesión automáticamente.';
    description.style.cssText = 'margin: 0 0 12px; font-size: 0.95rem;';

    const inputLabel = document.createElement('label');
    inputLabel.textContent = 'Contraseña';
    inputLabel.style.cssText = 'display: block; font-weight: 600; margin-bottom: 6px;';

    const modalPasswordInput = document.createElement('input');
    modalPasswordInput.type = 'password';
    modalPasswordInput.autocomplete = 'current-password';
    modalPasswordInput.placeholder = 'Ingresá tu contraseña';
    modalPasswordInput.style.cssText = `
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
    `;

    const enabledLabel = document.createElement('label');
    enabledLabel.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 14px;';

    const enabledCheckbox = document.createElement('input');
    enabledCheckbox.type = 'checkbox';
    enabledCheckbox.checked = true;

    const enabledText = document.createElement('span');
    enabledText.textContent = 'Activar autologin';

    enabledLabel.append(enabledCheckbox, enabledText);

    const actions = document.createElement('div');
    actions.style.cssText = 'display: flex; justify-content: flex-end; gap: 8px;';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.textContent = 'Cerrar';
    closeButton.style.cssText = `
      border: 1px solid #d1d5db;
      background: #fff;
      color: #1f2937;
      padding: 9px 12px;
      border-radius: 6px;
      cursor: pointer;
    `;

    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.textContent = 'Guardar y continuar';
    saveButton.style.cssText = `
      border: none;
      background: #2563eb;
      color: #fff;
      padding: 9px 12px;
      border-radius: 6px;
      cursor: pointer;
    `;

    const status = document.createElement('p');
    status.style.cssText = 'margin: 10px 0 0; font-size: 0.9rem; color: #dc2626; min-height: 1em;';

    const removeModal = () => {
      overlay.remove();
    };

    closeButton.addEventListener('click', removeModal);

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        removeModal();
      }
    });

    saveButton.addEventListener('click', () => {
      const password = modalPasswordInput.value;

      if (!password.trim()) {
        status.textContent = 'Ingresá una contraseña para continuar.';
        return;
      }

      chrome.storage.local.set(
        {
          autologinPassword: password,
          autologinEnabled: enabledCheckbox.checked,
        },
        () => {
          status.style.color = '#047857';
          status.textContent = 'Configuración guardada.';

          // Mantener oculta la contraseña en el modal y limpiar su valor visible.
          modalPasswordInput.value = '••••••••';

          if (enabledCheckbox.checked && passwordInput.value.trim().length === 0) {
            passwordInput.value = password;
            passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
            passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
          }

          setTimeout(() => {
            removeModal();
            if (enabledCheckbox.checked) {
              submitFormIfPossible();
            }
          }, 400);
        }
      );
    });

    actions.append(closeButton, saveButton);
    modal.append(title, description, inputLabel, modalPasswordInput, enabledLabel, actions, status);
    overlay.append(modal);
    document.body.append(overlay);
    modalPasswordInput.focus();
  };

  chrome.storage.local.get(['autologinPassword', 'autologinEnabled'], ({ autologinPassword, autologinEnabled }) => {
    if (!autologinPassword) {
      createSetupModal();
      return;
    }

    if (!autologinEnabled) {
      return;
    }

    if (passwordInput.value.trim().length === 0) {
      passwordInput.value = autologinPassword;
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    submitFormIfPossible();
  });
})();
