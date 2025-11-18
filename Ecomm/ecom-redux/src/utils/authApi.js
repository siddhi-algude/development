// src/utils/authApi.js
const USERS_DB = []; // our mock DB

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export default {
  async signup({ name, email, password }) {
    await wait(700);

    const exists = USERS_DB.find((u) => u.email === email);
    if (exists) throw new Error("Email already registered");

    const tempUser = { name, email, password, otp: "1234" };
    return tempUser;
  },

  async verifyOtp(email, otp) {
    await wait(500);

    if (otp !== "1234") throw new Error("Invalid OTP");

    const existing = USERS_DB.find((u) => u.email === email);

    if (!existing) {
      const newUser = { email, name: "User", id: Date.now() };
      USERS_DB.push(newUser);
      return newUser;
    }

    return existing;
  },

  async login({ email, password }) {
    await wait(700);

    const user = USERS_DB.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) throw new Error("Invalid credentials");

    return user;
  },
};
