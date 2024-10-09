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
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}

.user-details {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.user-details p {
  margin: 10px 0;
  color: #555;
}

.user-details strong {
  color: #333;
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