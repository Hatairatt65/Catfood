<template>
  <div class="register-container">
    <h1>Register Account</h1>
    <form v-on:submit.prevent="createUser" class="register-form">
      <div class="form-group">
        <label for="firstname">Firstname:</label>
        <input type="text" id="firstname" v-model="user.name" required />
      </div>
      <div class="form-group">
        <label for="lastname">Lastname:</label>
        <input type="text" id="lastname" v-model="user.lastname" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password" required />
      </div>
      <div>
        <button type="submit" class="register-btn">Register</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 450px;
  margin: 80px auto;
  padding: 30px;
  background: linear-gradient(135deg, #ffafbd, #ffc3a0);
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h1 {
  font-size: 28px;
  color: #ffffff;
  margin-bottom: 20px;
  letter-spacing: 1.5px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  color: #ffffff;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #333;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: border 0.3s, box-shadow 0.3s;
}

input:focus {
  border: 2px solid #ff6f61;
  box-shadow: 0 0 15px rgba(255, 111, 97, 0.4);
  outline: none;
}

.register-btn {
  width: 100%;
  padding: 15px;
  font-size: 18px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 111, 97, 0.3);
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.2s;
}

.register-btn:hover {
  background-color: #ff4c39;
  box-shadow: 0 6px 18px rgba(255, 76, 57, 0.4);
  transform: translateY(-3px);
}

.register-btn:active {
  transform: translateY(1px);
}
</style>

<script>
import UsersService from '../../services/UsersService';
export default {
  data(){
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active'
      }
    }
  },
  methods:{
    async createUser(){
      try{
        await UsersService.post(this.user);
        this.$router.push('/users');
      }catch(err){
        console.log(err);
      }
      
    }
  }

}
</script>

<style>

</style>