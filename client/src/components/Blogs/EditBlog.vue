<template>
    <div>
        <h1>Edit Catfood</h1>
        <form v-on:submit.prevent="editBlog">
            <p>ชื่ออาหารแมว: <input type="text" v-model="blog.catfoodname"></p>
            <p>ยี่ห้อ :<input type="text" v-model="blog.brand" /></p>
            <p>เหมาะสำหรับอายุ: <input type="text" v-model="blog.age"></p>
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
            <p>ราคา:<input type="text" v-model="blog.price" min="0" style="width: 70px;" /> บาท</p>
            <p>สต๊อก:<input type="number" v-model="blog.Stock" step="0.01" min="0" style="width: 70px;" /> จำนวน</p>
            <p>
                <button type="submit">อัปเดตข้อมูล</button>
                <button v-on:click="navigateTo('/blogs')">กลับ</button>
            </p>
        </form>
    </div>
</template>
<script>
import BlogsService from '@/services/BlogsService'
import VueCkeditor from "vue-ckeditor2"

export default {
    components: { VueCkeditor },
    data() {
        return {
            blog: {
                catfoodname: '',
                brand: 'null',
                age: 'null',
                type: '',
                price: '',
                Stock: '',
            },
            config: {
                toolbar: [
                    ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']
                ],
                height: 300
            },
        }
    },
    methods: {
        async editBlog() {
            try {
                await BlogsService.put(this.blog)
                this.$router.push({
                    name: 'blogs'
                })
            } catch (err) {
                console.log(err)
            }
        }

    },
    async created() {
        try {
            let blogId = this.$route.params.blogId
            this.blog = (await BlogsService.show(blogId)).data

        } catch (error) {
            console.log(error)
        }
    },



}
</script>
<style scoped></style>