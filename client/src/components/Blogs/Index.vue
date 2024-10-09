<template>
    <div class="catfood-container">
      <h2>ALL Catfood</h2>
      <p>
        <button @click="navigateTo('/blog/create')" class="create-btn">Add Catfood</button>
      </p>
  
      <div v-for="blog in blogs" :key="blog.id" class="catfood-item">
        <div class="catfood-image">
          <img :src="BASE_URL + blog.picture" alt="Catfood Image" v-if="blog.picture" />
        </div>
        <div class="catfood-details">
          <p><strong>ID:</strong> {{ blog.id }}</p>
          <p><strong>ชื่ออาหารแมว:</strong> {{ blog.catfoodname }}</p>
          <p><strong>ยี่ห้อ:</strong> {{ blog.brand }}</p>
          <p><strong>เหมาะสำหรับอายุ:</strong> {{ blog.age }}</p>
          <p><strong>ประเภทของอาหาร:</strong> {{ blog.type }}</p>
          <p><strong>ราคา:</strong> {{ blog.price }}.00 บาท</p>
          <p><strong>คงเหลือ:</strong> {{ blog.Stock }} จำนวน</p>
          <div class="catfood-actions">
            <button @click="navigateTo('/blog/' + blog.id)" class="view-btn">View</button>
            <button @click="navigateTo('/blog/edit/' + blog.id)" class="edit-btn">Edit</button>
            <button @click="deleteBlog(blog)" class="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .catfood-container {
    margin: 0 auto;
    padding: 20px; /* เพิ่มการเว้นระยะขอบด้านใน */
    background-color: #fff; /* พื้นหลัง */
    border-radius: 15px; /* มุมมน */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* เงาที่เด่นชัด */
  }
  
  h2 {
    text-align: center;
    color: #333; /* สีข้อความ */
    margin-bottom: 20px; /* ระยะห่างด้านล่าง */
  }
  
  .create-btn {
    background-color: #ff6f61; /* สีที่สอดคล้องกับ Header */
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 15px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }
  
  .create-btn:hover {
    transform: translateY(-2px);
  }
  
  .catfood-item {
    display: flex;
    align-items: flex-start;
    padding: 15px; /* เพิ่มระยะห่างด้านใน */
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    margin-bottom: 20px;
    background-color: #fafafa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* เพิ่มการเปลี่ยนแปลง */
  }
  
  /* เอฟเฟกต์เมื่อเลื่อนเมาส์ */
  .catfood-item:hover {
    transform: scale(1.02); /* ขยายขนาด */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* เพิ่มเงา */
  }
  
  .catfood-image img {
    width: 300px; /* ปรับขนาดรูปภาพ */
    height: auto;
    margin-right: 15px;
    border-radius: 10px; /* มุมมนสำหรับรูปภาพ */
  }
  
  .catfood-details {
    flex-grow: 1;
  }
  
  .catfood-actions {
    margin-top: 10px;
  }
  
  .catfood-actions button {
    margin-right: 10px;
    padding: 8px 12px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s; /* เพิ่มการเปลี่ยนแปลงให้ปุ่ม */
  }
  
  .view-btn {
    background-color: #007bff;
    border-radius: 10px;
    color: white;
  }
  
  .edit-btn {
    background-color: #6c757d;
    border-radius: 10px;
    color: white;
  }
  
  .delete-btn {
    background-color: #dc3545;
    border-radius: 10px;
    color: white;
  }
  
  /* เอฟเฟกต์เมื่อเลื่อนเมาส์ */
  .view-btn:hover,
  .edit-btn:hover,
  .delete-btn:hover {
    transform: translateY(-2px); /* ขยับขึ้นเมื่อเลื่อนเมาส์ */
  }
  
  hr {
    border-top: 1px solid #e0e0e0;
    margin-top: 20px;
  }
  </style>
  
<script>
import BlogsService from '@/services/BlogsService'
export default {
    data() {
        return {
            blogs: [],
            BASE_URL: 'http://localhost:8081/assets/uploads/' // ตั้งค่า URL เบสที่ถูกต้อง
        }
    },
    async created() {
        this.blogs = (await BlogsService.index()).data
    },
    methods: {
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setBlog', null)
            this.$router.push({
                name: 'login'
            })
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        async deleteBlog(blog) {
            let result = confirm("Want to delete?")
            if (result) {
                try {
                    await BlogsService.delete(blog)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.blogs = (await BlogsService.index()).data
        }
    }
}
</script>

<script>
    import BlogsService from '@/services/BlogsService'
    export default {
        data() {
            return {
                blogs: [],
                BASE_URL: 'http://localhost:8081/assets/uploads/' // ตั้งค่า URL เบสที่ถูกต้อง
            }
        },
        async created() {
            this.blogs = (await BlogsService.index()).data
        },
        methods: {
            logout() {
                this.$store.dispatch('setToken', null)
                this.$store.dispatch('setBlog', null)
                this.$router.push({
                    name: 'login'
                })
            },
            navigateTo(route) {
                this.$router.push(route)
            },
            async deleteBlog(blog) {
                let result = confirm("Want to delete?")
                if (result) {
                    try {
                        await BlogsService.delete(blog)
                        this.refreshData()
                    } catch (err) {
                        console.log(err)
                    }
                }
            },
            async refreshData() {
                this.blogs = (await BlogsService.index()).data
            }
        }
    }
</script>

<style scoped>
</style>