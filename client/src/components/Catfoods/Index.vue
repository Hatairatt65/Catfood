<template>
  <div class="catfood-container">
    <h1>ALL CATFOOD</h1>
    <div class="top-controls">
      <!-- ช่องค้นหาพร้อมปุ่มค้นหา -->
      <input 
        type="text" 
        v-model="searchQueryTemp" 
        placeholder="Search Catfood..." 
        class="search-input" 
      />
      <button 
        @click="searchCatfood" 
        class="search-btn"
      >
      Search
      </button>
      <button 
        @click="navigateTo('/catfood/create')" 
        class="create-btn"
      >
        + Add Catfood
      </button>
      <!-- Dropdown สำหรับเลือกช่วงอายุ -->
    </div>
    <h4>รายการอาหารแมว {{filteredCatfoods.length}} รายการ</h4>
    <div v-for="catfood in filteredCatfoods" :key="catfood.id" class="catfood-item">
      <div class="catfood-image">
        <img :src="BASE_URL + catfood.picture" alt="Catfood Image" v-if="catfood.picture" />
      </div>
      <div class="catfood-details">
        <p><strong>ID:</strong> {{ catfood.id }}</p>
        <p><strong>ชื่ออาหารแมว:</strong> {{ catfood.catfoodname }}</p>
        <p><strong>ยี่ห้อ:</strong> {{ catfood.brand }}</p>
        <p><strong>เหมาะสำหรับอายุ:</strong> {{ catfood.age }}</p>
        <p><strong>ประเภทของอาหาร:</strong> {{ catfood.type }}</p>
        <p><strong>ราคา:</strong> {{ catfood.price }}.00 บาท</p>
        <p><strong>คงเหลือ:</strong> {{ catfood.Stock }} จำนวน</p>
        <div class="catfood-actions">
          <button @click="navigateTo('/catfood/' + catfood.id)" class="view-btn">View</button>
          <button @click="navigateTo('/catfood/edit/' + catfood.id)" class="edit-btn">Edit</button>
          <button @click="deleteCatfood(catfood)" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catfood-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.top-controls {
  display: flex; /* ทำให้แน่ใจว่ามี flexbox */
  justify-content: flex-start; /* ใช้เพื่อตั้งตำแหน่งให้เป็นจุดเริ่มต้น */
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  flex-grow: 1; /* ให้มันใช้พื้นที่ว่างในแนวนอนทั้งหมด */
  max-width: 300px; /* กำหนดความกว้างสูงสุด เพื่อไม่ให้เกิน */
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 10px; /* ระยะห่างจากปุ่มค้นหา */
  font-size: 16px;
}

/* ตกแต่งช่องค้นหา */
.search-input {
  width: 200px; /* กำหนดความกว้างเฉพาะ */
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 10px; /* เพิ่มระยะห่างจากปุ่ม */
  font-size: 16px;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* ปุ่มค้นหา */
.search-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

/* ปุ่มสร้าง */
.create-btn {
  background-color: #ff6f61;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}
/* ตกแต่งช่องค้นหา */
.search-input {
  flex: 1;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  margin-right: 20px; /* เพิ่มระยะห่างจากปุ่ม */
  font-size: 16px;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* ปุ่มสร้าง */
.create-btn {
  background-color: #ff6f61;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

/* รายการอาหารแมว */
.catfood-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #fafafa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.catfood-item:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.catfood-image {
  flex-basis: 25%;
  margin-right: 20px;
}

.catfood-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.catfood-details {
  flex-basis: 60%;
}

.catfood-details p {
  margin-bottom: 10px;
}

.catfood-actions {
  margin-top: 15px;
}

.catfood-actions button {
  margin-right: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.view-btn {
  background-color: #007bff;
  color: white;
}

.edit-btn {
  background-color: #6c757d;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.view-btn:hover,
.edit-btn:hover,
.delete-btn:hover {
  transform: translateY(-2px);
}
</style>

<script>
  import CatfoodsService from '@/services/CatfoodsService'
  export default {
    data() {
      return {
        catfoods: [],
        searchQuery: '', // ตัวแปรเก็บค่าการค้นหาที่แท้จริง
        searchQueryTemp: '', // ตัวแปรชั่วคราวสำหรับช่องค้นหา
        BASE_URL: 'http://localhost:8081/assets/uploads/' 
      }
    },
    async created() {
      this.catfoods = (await CatfoodsService.index()).data
    },
    computed: {
      filteredCatfoods() {
        if (!this.searchQuery) {
          return this.catfoods; // ถ้าไม่มีการค้นหา แสดงข้อมูลทั้งหมด
        }
        return this.catfoods.filter(catfood =>
          catfood.catfoodname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          catfood.brand.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          catfood.age.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          catfood.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          String(catfood.price).includes(this.searchQuery)
        );
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setCatfood', null)
        this.$router.push({
          name: 'login'
        })
      },
      navigateTo(route) {
        this.$router.push(route)
      },
      async deleteCatfood(catfood) {
        let result = confirm("Want to delete?")
        if (result) {
          try {
            await CatfoodsService.delete(catfood)
            this.refreshData()
          } catch (err) {
            console.log(err)
          }
        }
      },
      async refreshData() {
        this.catfoods = (await CatfoodsService.index()).data
      },
      searchCatfood() {
        this.searchQuery = this.searchQueryTemp; // ตั้งค่า searchQuery จาก input ที่ป้อน
      }
    }
  }
</script>
