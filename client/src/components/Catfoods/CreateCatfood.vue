<template>
  <div class="catfood-form-container">
    <h1>Add Catfood</h1>
    <form v-on:submit.prevent="createCatfood" class="catfood-form">
      <div class="form-group">
        <label>ชื่ออาหารแมว :</label>
        <input type="text" v-model="catfood.catfoodname" />
      </div>
      <div class="form-group">
        <label>ยี่ห้อ :</label>
        <input type="text" v-model="catfood.brand" />
      </div>
      <div class="form-group">
        <label>เหมาะสำหรับอายุ :</label>
        <select v-model="catfood.age" class="form-input select-input">
            <option value="">กรุณาเลือก</option>
            <option value="2-10 เดือน">2-10 เดือน</option>
            <option value="1 ปีขึ้นไป">1 ปีขึ้นไป</option>
            <option value="โตเต็มวัย">โตเต็มวัย</option>
        </select>
    </div>

      <div class="form-group">
        <label>ประเภทของอาหาร :</label>
        <label>
          <input type="radio" v-model="catfood.type" value="อาหารเปียก" />
          อาหารเปียก
        </label>
        <label>
          <input type="radio" v-model="catfood.type" value="อาหารเม็ด" />
          อาหารเม็ด
        </label>
      </div>
      <div class="form-group">
        <label>ราคา : <input type="text" v-model="catfood.price" min="0" style="width: 70px;" /> บาท</label>
      </div>
      <div class="form-group">
        <label>สต๊อก : <input type="number" v-model="catfood.Stock" step="0.01" min="0" style="width: 70px;" /> จำนวน</label>
      </div>
      <div class="form-group">
        <label>Upload photo : </label>
        <input type="file" @change="filesChange($event.target.files)" accept="image/*" />
        <ul class="pictures">
          <li v-if="pictures.length > 0" :key="pictures[0].id">
            <br />
            <img :src="pictures[0].url" alt="picture image" class="uploaded-image" />
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
  background: linear-gradient(135deg, #e3d6f8 0%, #b4ddfa 100%);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
  transition: box-shadow 0.25s ease, transform 0.25s ease; /* Transition for inputs */
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

input[type="text"],
input[type="number"],
input[type="file"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease; /* Transition for inputs */
}

input[type="text"]:hover,
input[type="number"]:hover {
  transform: translateY(-3px); /* Raise input on hover */
}

input[type="text"]:focus,
input[type="number"]:focus {
  border-color: #37a8d4;
  box-shadow: 0 0 5px rgba(27, 98, 126, 0.5);
  transform: translateY(0); /* Reset the transform on focus */
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
  transition: background-color 0.3s, transform 0.3s;
}

.submit-button:hover {
  background-color: #e95be2;
  transform: scale(1.05);
}

.pictures img {
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  max-width: 150px; /* เปลี่ยนขนาดความกว้างที่ต้องการ */
  height: auto; /* รักษาสัดส่วนของภาพ */
}
.select-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
    transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease; /* Transition for select */
}

.select-input:hover {
    border-color: #37a8d4; /* เปลี่ยนสี border ขณะเลื่อนเมาส์ */
    box-shadow: 0 0 5px rgba(27, 98, 126, 0.5);
}

.select-input:focus {
    border-color: #37a8d4;
    box-shadow: 0 0 5px rgba(27, 98, 126, 0.5);
    transform: translateY(0); /* Reset the transform on focus */
}


</style>


<script>
import CatfoodsService from "@/services/CatfoodsService";
import UploadService from "@/services/UploadService"; // เพิ่มการนำเข้า UploadService

export default {
  data() {
    return {
      catfood: {
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
    async createCatfood() {
      if (this.pictures.length === 0) {
        alert("Please upload a picture.");
        return;
      }

      // อัปเดตชื่อไฟล์ภาพใน catfood ก่อนส่งไปยังเซิร์ฟเวอร์
      this.catfood.picture = this.pictures[0].name; // ใช้เฉพาะภาพแรก

      try {
        await CatfoodsService.post(this.catfood);
        this.$router.push({ name: "catfoods" });
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
