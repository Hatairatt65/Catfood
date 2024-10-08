<template>
  <div>
    <h1>Add Catfood</h1>
    <form v-on:submit.prevent="createBlog">
      <p>
        ชื่ออาหารแมว :
        <input type="text" v-model="blog.catfoodname" />
      </p>
      <p>
        ยี่ห้อ :
        <input type="text" v-model="blog.brand" />
      </p>
      <p>
        เหมาะสำหรับอายุ :
        <input type="text" v-model="blog.age" />
      </p>
      <p>
        ประเภทของอาหาร :
        <label>
          <input type="radio" v-model="blog.type" value="อาหารเปียก" />
          อาหารเปียก
        </label>
        <label>
          <input type="radio" v-model="blog.type" value="อาหารเม็ด" />
          อาหารเม็ด
        </label>
      </p>
      <p>
        ราคา:
        <input type="text" v-model="blog.price" min="0" style="width: 70px;" /> บาท
      </p>
      <p> สต๊อก:
        <input type="number" v-model="blog.Stock" step="0.01" min="0" style="width: 70px;" /> จำนวน
      </p>
      <p>
        Upload photo:
        <input type="file" @change="filesChange($event.target.files)" accept="image/*" />
        <ul class="pictures">
          <li v-if="pictures.length > 0" :key="pictures[0].id">
            <br />
            <img :src="pictures[0].url" alt="picture image" style="width: 200px;" />
          </li>
        </ul>
      </p>
      <p></p>
      <p>
        <button type="submit">Add Catfood</button>
      </p>
    </form>
  </div>
</template>

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
