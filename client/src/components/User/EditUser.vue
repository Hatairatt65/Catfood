<template>
  <div class="edit-user-container">
    <h1 class="title">Edit User</h1>
    <form @submit.prevent="editUser" class="edit-user-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="user.name" required>
      </div>
      <div class="form-group">
        <label for="lastname">Lastname:</label>
        <input type="text" id="lastname" v-model="user.lastname" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password" required>
      </div>
      <div class="form-group">
        <button type="submit" class="submit-button">Update User</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.edit-user-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;
  background: linear-gradient(135deg, #f5bb51 0%, #fda085 100%);
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;
  color: white;
  text-align: center;
}

.title {
  font-size: 2.5em;
  margin-bottom: 30px;
  letter-spacing: 1.5px;
  color: #fff;
}

.edit-user-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  margin-bottom: 20px;
}

.form-group label {
  font-weight: bold;
  font-size: 1.1em;
  color: #fff;
}

.form-group input {
  padding: 12px;
  border-radius: 30px;
  border: none;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1em;
  transition: background-color 0.3s, border-color 0.3s;
}

.form-group input:focus {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid #fff;
  outline: none;
}

.submit-button {
  padding: 15px 30px;
  border-radius: 30px;
  border: none;
  background-color: #4bb5c4;
  color: white;
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.submit-button:hover {
  background-color: #4388d1;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.submit-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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
  async created(){
    try{
      var userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    }catch(err){
      console.log(err);
    }
  },
  methods:{
    async editUser(){
      try{
        await UsersService.put(this.user);
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