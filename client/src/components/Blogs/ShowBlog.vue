<template>
    <div>
        <h1>Show Catfood</h1>
        <img :src="BASE_URL + blog.picture" alt="Catfood Image" v-if="blog.picture" style="width: 200px; height: auto;" />
        <p>รหัสรายการ: {{ blog.id }}</p>
        <p>ชื่ออาหารแมว: {{ blog.catfoodname }}</p>
        <p>ยี่ห้อ: {{ blog.brand }}</p>
        <p>เหมาะสำหรับอายุ: {{ blog.age }}</p>
        <p>ประเภทของอาหาร: {{ blog.type }}</p>
        <p>ราคา: {{ blog.price }}</p>
        <p>สต๊อก: {{ blog.Stock }}</p>
        <p>
            <button v-on:click="navigateTo('/blog/edit/'+ blog.id)">แก้ไข Catfood</button>
            <button v-on:click="navigateTo('/blogs')">กลับ </button>
        </p>
    </div>
</template>
<script>
    import BlogsService from '@/services/BlogsService'
    export default {
        data () {
            return {
                blog: null,
                BASE_URL: 'http://localhost:8081/assets/uploads/', // ตั้งค่า URL เบสที่ถูกต้อง
            }
        },
        async created () {
            try {
                let blogId = this.$route.params.blogId
                this.blog = (await BlogsService.show(blogId)).data
            } catch (error) {
                console.log(error)
            }
        },
        methods: {
            navigateTo (route) {
                this.$router.push(route)
            },
        }
    }
</script>
<style scoped>
</style>