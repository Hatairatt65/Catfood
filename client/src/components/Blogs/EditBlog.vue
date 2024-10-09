<template>
    <div class="edit-catfood-container">
        <h1 class="title">Edit Catfood</h1>
        <form v-on:submit.prevent="editBlog" class="catfood-form">
            <div v-if="blog.picture" class="image-preview">
                <img :src="BASE_URL + blog.picture" alt="Catfood Image" class="catfood-image" />
            </div>
            <div class="form-group">
                <label for="catfoodname">ชื่ออาหารแมว:</label>
                <input type="text" id="catfoodname" v-model="blog.catfoodname" class="form-input" />
            </div>
            <div class="form-group">
                <label for="brand">ยี่ห้อ:</label>
                <input type="text" id="brand" v-model="blog.brand" class="form-input" />
            </div>
            <div class="form-group">
                <label for="age">เหมาะสำหรับอายุ:</label>
                <input type="text" id="age" v-model="blog.age" class="form-input" />
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
                <label for="price">ราคา:</label>
                <input type="number" id="price" v-model="blog.price" min="0" class="form-input small-input" /> บาท
            </div>
            <div class="form-group">
                <label for="stock">สต๊อก:</label>
                <input type="number" id="stock" v-model="blog.Stock" step="0.01" min="0" class="form-input small-input" /> จำนวน
            </div>
            <div class="form-buttons">
                <button type="submit" class="submit-button">Update</button>
                <button type="button" @click="navigateTo('/blogs')" class="back-button">back</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
.edit-catfood-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 30px; /* Increased padding for the container */
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    transition: box-shadow 0.3s ease, transform 0.3s ease; /* Transition for smooth effect */
}

.edit-catfood-container:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Stronger shadow on hover */
    transform: translateY(-5px); /* Raise container on hover */
}

.title {
    text-align: center;
    color: #333;
}

.catfood-form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 20px; /* Increased space between form groups */
}

.form-input {
    width: 100%;
    padding: 10px; /* Inner padding of the input */
    margin: 5px 0; /* Margin to create space around input */
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease, transform 0.3s ease; /* Transition for inputs */
}

.form-input:hover {
    box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.2); /* Darker shadow on input hover */
    transform: translateY(-2px); /* Raise input on hover */
}

.small-input {
    width: 70px;
}

.image-preview {
    text-align: center;
    margin-bottom: 15px;
}

.catfood-image {
    width: 300px;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.form-buttons {
    display: flex;
    justify-content: space-between;
}

.submit-button {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease; /* Transition for buttons */
}

.submit-button:hover {
    background-color: #0056b3;
    transform: translateY(-2px); /* Raise button on hover */
}

.back-button {
    background-color: #6c757d;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease; /* Transition for buttons */
}

.back-button:hover {
    background-color: #5a6268;
    transform: translateY(-2px); /* Raise button on hover */
}
</style>


<script>
import BlogsService from '@/services/BlogsService'

export default {
    data() {
        return {
            blog: {
                catfoodname: '',
                brand: 'null',
                age: 'null',
                type: '',
                price: '',
                Stock: '',
                picture: '', // เพิ่ม property สำหรับรูปภาพ
            },
            BASE_URL: 'http://localhost:8081/assets/uploads/', // URL เบสสำหรับรูปภาพ
        }
    },
    methods: {
    async editBlog() {
        try {
            await BlogsService.put(this.blog);
            this.$router.push({
                name: 'blogs'
            });
        } catch (err) {
            console.log(err);
        }
    },
    navigateTo(route) {
        this.$router.push(route); // Navigate to the specified route
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
