<template>
    <div>
        <h2>Get all Catfood</h2>
        <p><button v-on:click="logout">ออกจากระบบ</button></p>
        <h4>จำนวนอาหารแมว {{ blogs.length }} รายการ</h4>
        <p><button v-on:click="navigateTo('/blog/create')">สร้าง Catfood</button></p>
        <div v-for="blog in blogs" v-bind:key="blog.id">
            <img :src="BASE_URL + blog.picture" alt="Catfood Image" v-if="blog.picture" style="width: 100px; height: auto;" />
            <p>รหัสสินค้า: {{ blog.id }}</p>
            <p>ชื่ออาหารแมว: {{ blog.catfoodname }}</p>
            <p>ยี่ห้อ: {{ blog.brand }}</p>
            <p>เหมาะสำหรับอายุ: {{ blog.age }}</p>
            <p>ประเภทของอาหาร: {{ blog.type }}</p>
            <p>ราคา: {{ blog.price }}</p>
            <p>สต๊อก: {{ blog.Stock }}</p>
            <p>
                <button v-on:click="navigateTo('/blog/'+ blog.id)">ดูรายละเอียด</button>
                <button v-on:click="navigateTo('/blog/edit/'+ blog.id)">แก้ไขข้อมูล</button>
                <button v-on:click="deleteBlog(blog)">ลบข้อมูล</button>
            </p>
            <hr>
        </div>
    </div>
</template>
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