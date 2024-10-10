<template>
  <div class="user-card">
    <h1 class="title">Show User</h1>
    <div class="user-details">
      <p><strong>ID:</strong> <span>{{ user.id }}</span></p>
      <p><strong>Name:</strong> <span>{{ user.name }}</span></p>
      <p><strong>Lastname:</strong> <span>{{ user.lastname }}</span></p>
      <p><strong>Email:</strong> <span>{{ user.email }}</span></p>
      <p><strong>Status:</strong> <span>{{ user.status }}</span></p>
      <p><strong>Created At:</strong> <span>{{ user.createdAt }}</span></p>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  background: linear-gradient(135deg, #ffffff, #f2f3f7);
  border-radius: 12px;
  padding: 25px;
  max-width: 450px;
  margin: 30px auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.user-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 25px;
  font-size: 28px;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.user-details {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 2;
  color: #34495e;
}

.user-details p {
  margin: 15px 0;
  font-size: 18px;
}

.user-details strong {
  font-weight: 600;
  color: #2c3e50;
}

.user-details span {
  color: #2980b9;
  font-weight: 600;
}

.user-details p:hover span {
  color: #395dde;
  transition: color 0.2s ease;
}
</style>


<script>
import UsersService from "@/services/UsersService";

export default { 
  data(){
    return {
      user: {}
    }
  },
  async created() {
    try{
      var userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    }catch(err){
      console.log(err);
    }
    
    // console.log(this.user);
  },
  

}
</script>

<style>

</style>