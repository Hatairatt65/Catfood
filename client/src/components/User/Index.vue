<template>
  <div class="user-container">
    <h1 class="title">My Profile</h1>
    <div class="create-user">
      <button class="create-button" v-on:click="navigateTo('/user/create')">Register</button>
    </div>
    <hr />
    <div v-if="users.length" class="user-list">
      <div><b>จำนวนผู้ใช้งาน:</b> {{ users.length }}</div><br>
      <div v-for="user in users" v-bind:key="user.id" class="user-card">
        <div class="user-details">
          <div class="user-detail"><b>id:</b> <span>{{ user.id }}</span></div>
          <div class="user-detail"><b>ชื่อผู้ใช้:</b> <span>{{ user.name }} {{ user.lastname }}</span></div>
          <div class="user-detail"><b>อีเมล:</b> <span>{{ user.email }}</span></div>
          <div class="user-detail"><b>สถานะ:</b> <span>{{ user.status }}</span></div>
        </div>

        <div class="button-group">
          <button class="view-button" v-on:click="navigateTo('/user/'+user.id)">View</button>
          <button class="edit-button" v-on:click="navigateTo('/user/edit/'+user.id)">Edit</button>
          <button class="delete-button" v-on:click="deleteUser(user)">Delete</button>
        </div>
        <hr />
      </div>
    </div>
    <div>
      <button class="logout-button" v-on:click="logout">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.user-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #ffafbd, #ffc3a0); /* กราเดียนต์สีเดียวกับ header */
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); /* เงาแบบเด่นชัด */
  color: white; /* สีข้อความ */
}

.title {
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 20px;
  letter-spacing: 1.5px; /* ช่องว่างระหว่างตัวอักษร */
}

.create-user {
  text-align: right;
  margin-bottom: 20px;
}

.create-button,
.view-button,
.edit-button,
.delete-button,
.logout-button {
  padding: 12px 25px;
  border: none;
  border-radius: 30px; /* มุมมนมากขึ้น */
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* เงา */
}

.create-button {
  background-color: #007bff;
}

.view-button {
  background-color: #28a745;
}

.edit-button {
  background-color: #6c757d;
}

.delete-button {
  background-color: #dc3545;
}

.logout-button {
  background-color: #343a40;
  width: 100%;
}

.create-button:hover,
.view-button:hover,
.edit-button:hover,
.delete-button:hover,
.logout-button:hover {
  transform: translateY(-3px); /* ยกปุ่มขึ้น */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); /* เพิ่มเงา */
}

.create-button:hover {
  background-color: #0056b3;
}

.view-button:hover {
  background-color: #218838;
}

.edit-button:hover {
  background-color: #5a6268;
}

.delete-button:hover {
  background-color: #c82333;
}

.logout-button:hover {
  background-color: #23272b;
}

.user-list {
  margin-top: 20px;
}

.user-card {
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); /* เงาการ์ด */
  transition: transform 0.3s, box-shadow 0.3s;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); /* เพิ่มเงาเมื่อโฮเวอร์ */
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 15px; /* เพิ่มระยะห่างระหว่างข้อมูล */
  color: #333;
}

.user-detail {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.user-detail b {
  flex-basis: 40%;
  font-weight: bold;
  color: #555;
}

.user-detail span {
  flex-basis: 60%;
  color: #333;
}
</style>

<script>
import UsersService from "@/services/UsersService";
export default {
  data(){
    return {
      users: []
    }
  },
  async created() {
    try{
      this.users = (await UsersService.index()).data;
    }catch(err){
      console.log(err);
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('setToken',null)
      this.$store.dispatch('setUser',null)
      this.$router.push({
        name: 'login'
      })
    },
    navigateTo(route){
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if (result) {
        try {
          await UsersService.delete(user);
          // อัปเดตข้อมูลหลังจากลบ
          this.users = this.users.filter(u => u.id !== user.id); // กรองข้อมูล
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData(){
      try{
        this.users = (await UsersService.index()).data;
      }catch(err){
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
