<template>
  <div class="login-container">
    <div class="login-card">
      <h1>User Login</h1>
      <form v-on:submit.prevent="onLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" v-model="password" required />
        </div>
        <button type="submit" class="login-btn">Login</button>
        <div class="error" v-if="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  max-width: 400px;
  width: 100%;
  padding: 40px;
  background: linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h1 {
  margin-bottom: 30px;
  font-size: 28px;
  color: #333;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #1abc9c;
  box-shadow: 0 0 5px rgba(205, 108, 243, 0.5);
  outline: none;
}

.login-btn {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  background-color: #9c41da;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.login-btn:hover {
  background-color: #5cc0ee;
  transform: translateY(-2px);
}

.error {
  margin-top: 15px;
  color: #e74c3c;
  font-size: 14px;
  font-weight: bold;
}
</style>

<script>
import AuthenService from "../services/AuthenService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push({
          name: "users",
        });
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>
