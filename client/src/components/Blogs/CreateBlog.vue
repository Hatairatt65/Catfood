<template>
  <div class="catfood-form-container">
    <h1>Add Catfood</h1>
    <form v-on:submit.prevent="createBlog" class="catfood-form">
      <div class="form-group">
        <label>ชื่ออาหารแมว:</label>
        <input type="text" v-model="blog.catfoodname" />
      </div>
      <div class="form-group">
        <label>ยี่ห้อ:</label>
        <input type="text" v-model="blog.brand" />
      </div>
      <div class="form-group">
        <label>เหมาะสำหรับอายุ:</label>
        <input type="text" v-model="blog.age" />
      </div>
      <div class="form-group">
        <label>ประเภทของอาหาร:</label>
        <label>
          <input type="radio" v-model="blog.type" value="อาหารเปียก" />
          อาหารเปียก
        </label>
        <label>
          <input type="radio" v-model="blog.type" value="อาหารเม็ด" />
          อาหารเม็ด
        </label>
      </div>
      <div class="form-group">
        <label>ราคา:</label>
        <input type="text" v-model="blog.price" min="0" style="width: 70px;" /> บาท
      </div>
      <div class="form-group">
        <label>สต๊อก:</label>
        <input type="number" v-model="blog.Stock" step="0.01" min="0" style="width: 70px;" /> จำนวน
      </div>
      <div class="form-group">
        <label>Upload photo:</label>
        <input type="file" @change="filesChange($event.target.files)" accept="image/*" />
        <ul class="pictures">
          <li v-if="pictures.length > 0" :key="pictures[0].id">
            <br />
            <img :src="pictures[0].url" alt="picture image" style="width: 200px;" />
          </li>
        </ul>
      </div>
      <div class="form-group">
        <button type="submit" class="submit-button">Add Catfood</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.catfood-form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.catfood-form {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

input[type="text"], input[type="number"], input[type="file"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

input[type="radio"] {
  margin-right: 5px;
}

.submit-button {
  background-color: #37a8d4;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #e95be2;
}

.pictures img {
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
</style>


<script>
import BlogsService from "@/services/BlogsService";
import UploadService from "@/services/UploadService"; // เพิ่มการนำเข้า UploadService

export default {
  data() {
    return {
      blog: {
        catfoodname: "",
        brand: "",
        age: "",
        type: "",
        price: "",
        Stock: "",
        picture: "",
        BASE_URL: "http://localhost:8081/assets/uploads/",
      },
      pictures: [], // เปลี่ยนให้สามารถเก็บภาพได้เพียง 1 ภาพ
    };
  },
  methods: {
    async createBlog() {
      if (this.pictures.length === 0) {
        alert("Please upload a picture.");
        return;
      }

      // อัปเดตชื่อไฟล์ภาพใน blog ก่อนส่งไปยังเซิร์ฟเวอร์
      this.blog.picture = this.pictures[0].name; // ใช้เฉพาะภาพแรก

      try {
        await BlogsService.post(this.blog);
        this.$router.push({ name: "blogs" });
      } catch (err) {
        console.log(err);
      }
    },
    async filesChange(fileList) {
      const formData = new FormData();
      this.pictures = []; // ล้าง pictures ก่อนหน้านี้
      const file = fileList[0]; // รับเพียงไฟล์แรก
      if (file) {
        formData.append("images", file);
        const url = URL.createObjectURL(file); // สร้าง URL สำหรับแสดงภาพ
        this.pictures.push({ id: 1, name: file.name, url }); // เก็บ URL ด้วย
      }

      // อัปโหลดไฟล์ภาพไปยังเซิร์ฟเวอร์
      await UploadService.upload(formData);
    },
  },
};
</script>
