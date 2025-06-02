/**
 * COMPLETE AUTH SYSTEM FOR RESTAURANT WEBSITE
 * Гарантированно скрывает кнопку входа после авторизации
 */

// Главная функция инициализации
function initAuthSystem() {
  // 1. Создаем контейнер для уведомлений, если его нет
  createAlertContainer();
  
  // 2. Инициализируем хранилище пользователей
  initUserStorage();
  
  // 3. Проверяем статус авторизации
  updateAuthUI();
  
  // 4. Вешаем обработчики на формы
  setupAuthForms();
  
  // 5. Следим за изменениями в localStorage
  setupStorageListener();
}

// Создаем контейнер для уведомлений
function createAlertContainer() {
  if (!document.getElementById('alert-container')) {
    const alertContainer = document.createElement('div');
    alertContainer.id = 'alert-container';
    alertContainer.style.cssText = `
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 0 20px;
    `;
    document.body.prepend(alertContainer);
  }
}

// Инициализируем хранилище пользователей
function initUserStorage() {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
}

// Обновляем интерфейс в зависимости от статуса авторизации
function updateAuthUI() {
  const isLoggedIn = localStorage.getItem('currentUser') !== null;
  const loginButtons = document.querySelectorAll('.login-btn');
  const profileButtons = document.querySelectorAll('.profile-btn');

  loginButtons.forEach(btn => {
    btn.style.display = isLoggedIn ? 'none' : 'block';
  });
  profileButtons.forEach(btn => {
    btn.style.display = isLoggedIn ? 'block' : 'none';
  });
}

// Настраиваем обработчики форм
function setupAuthForms() {
  // Обработчик входа
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      await handleLogin();
    });
  }

  // Обработчик регистрации
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      await handleRegister();
    });
  }
}

// Обработчик входа
async function handleLogin() {
  try {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) throw new Error('Неверный email или пароль');
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    showAlert('Вход выполнен успешно!', 'success');
    updateAuthUI();
    
    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 1500);
    
  } catch (error) {
    showAlert(error.message, 'danger');
  }
}

// Обработчик регистрации
async function handleRegister() {
  try {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    // Валидация
    if (password !== confirmPassword) {
      throw new Error('Пароли не совпадают!');
    }

    if (password.length < 6) {
      throw new Error('Пароль должен содержать минимум 6 символов');
    }

    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = JSON.parse(localStorage.getItem('users'));
    
    if (users.some(user => user.email === email)) {
      throw new Error('Пользователь с таким email уже зарегистрирован');
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    showAlert('Регистрация прошла успешно!', 'success');
    updateAuthUI();
    
    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 1500);
    
  } catch (error) {
    showAlert(error.message, 'danger');
  }
}

// Показ уведомлений
function showAlert(message, type = 'success') {
  const alertContainer = document.getElementById('alert-container');
  const alertId = 'alert-' + Date.now();
  
  const alertHTML = `
    <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert" style="margin-top: 10px;">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
  
  alertContainer.insertAdjacentHTML('beforeend', alertHTML);
  
  setTimeout(() => {
    const alertElement = document.getElementById(alertId);
    if (alertElement) {
      const bsAlert = new bootstrap.Alert(alertElement);
      bsAlert.close();
    }
  }, 3000);
}

// Следим за изменениями в других вкладках
function setupStorageListener() {
  window.addEventListener('storage', (event) => {
    if (event.key === 'currentUser') {
      updateAuthUI();
    }
  });
}

// Инициализируем систему при загрузке
document.addEventListener('DOMContentLoaded', initAuthSystem);