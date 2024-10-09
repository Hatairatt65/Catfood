<template>
  <div>
    <div class="nv-navbar">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
      <ul class="nav">
        <li><router-link :to="{ name: 'catfoods' }">Catfood</router-link></li>
        <li><router-link :to="{ name: 'users' }">Profile</router-link></li>
        <li><router-link :to="{ name: 'login' }">Login</router-link></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.nv-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #ffafbd, #ffc3a0); /* สีพื้นหลังที่เป็นกราเดียนต์ */
  padding: 20px 40px; /* ระยะห่าง */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* เงาที่เด่นชัด */
  border-radius: 20px; /* มุมมนมากขึ้น */
  transition: background 0.3s; /* เอฟเฟกต์การเปลี่ยนพื้นหลัง */
}

.logo img {
  height: 60px; /* ขนาดโลโก้ */
  transition: transform 0.3s; /* เอฟเฟกต์การขยายเมื่อเลื่อนเมาส์ */
}

.logo img:hover {
  transform: scale(1.1) rotate(5deg); /* ขยายและหมุนโลโก้ */
}

.nav {
  list-style-type: none; /* ลบจุด */
  display: flex;
  gap: 30px; /* ระยะห่างระหว่างลิงก์ */
}

.nav li {
  position: relative; /* สำหรับการใช้เอฟเฟกต์ */
}

.nav li a {
  text-decoration: none; /* ลบขีดเส้นใต้ */
  color: #333; /* สีข้อความ */
  font-size: 18px; /* ขนาดตัวอักษร */
  padding: 10px 20px; /* ระยะห่างภายใน */
  border-radius: 20px; /* มุมมน */
  transition: color 0.3s, transform 0.3s, background-color 0.3s, box-shadow 0.3s; /* เอฟเฟกต์ในการเปลี่ยนสีและพื้นหลัง */
}

.nav li a:hover {
  color: #fff; /* สีข้อความเมื่อเลื่อนเมาส์ */
  background-color: #ff6f61; /* สีพื้นหลังเมื่อเลื่อนเมาส์ */
  transform: translateY(-5px) scale(1.1); /* ขยับขึ้นและขยายขนาดเมื่อเลื่อนเมาส์ */
  box-shadow: 0 4px 20px rgba(255, 111, 97, 0.6); /* เงาที่เด่นชัดเมื่อเลื่อนเมาส์ */
}

.nav li a:active {
  transform: scale(0.95); /* หดขนาดเมื่อกด */
}

.nav li a.active {
  color: #fff; /* สีข้อความของลิงก์ที่ถูกเลือก */
  background-color: #ff6f61; /* พื้นหลังของลิงก์ที่ถูกเลือก */
  border-radius: 10px; /* มุมมน */
}
</style>
