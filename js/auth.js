const Auth = (() => {
  const SESSION_KEY = "tinyBrainUser";
  const USERS_KEY = "tinyBrainUsers";

  const read = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  return {
    getUser() {
      return read(SESSION_KEY, null);
    },
    isLoggedIn() {
      return this.getUser() !== null;
    },
    signIn(user) {
      const users = read(USERS_KEY, []);
      const email = user.email.trim().toLowerCase();
      let saved = users.find((u) => u.email === email);
      if (!saved) {
        saved = { ...user, email };
        users.push(saved);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(saved));
    },
    logout() {
      localStorage.removeItem(SESSION_KEY);
    },
    requireLogin() {
      if (!this.isLoggedIn()) {
        sessionStorage.setItem("loginRequired", "true");
        location.replace("home.html#login");
      }
    },
  };
})();
