<template>
    <div class="edit-catfood-container">
        <h1 class="title">Edit Catfood</h1>
        <form v-on:submit.prevent="editCatfood" class="catfood-form">
            <div v-if="catfood.picture" class="image-preview">
                <img :src="BASE_URL + catfood.picture" alt="Catfood Image" class="catfood-image" />
            </div>
            <div class="form-group">
                <label for="catfoodname">ชื่ออาหารแมว:</label>
                <input type="text" id="catfoodname" v-model="catfood.catfoodname" class="form-input" />
            </div>
            <div class="form-group">
                <label for="brand">ยี่ห้อ:</label>
                <input type="text" id="brand" v-model="catfood.brand" class="form-input" />
            </div>
            <div class="form-group">
                <label for="age">เหมาะสำหรับอายุ:</label>
                <input type="text" id="age" v-model="catfood.age" class="form-input" />
            </div>
            <div class="form-group">
                <label>ประเภทของอาหาร:</label>
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
                <label for="price">ราคา:</label>
                <input type="number" id="price" v-model="catfood.price" min="0" class="form-input small-input" /> บาท
            </div>
            <div class="form-group">
                <label for="stock">สต๊อก:</label>
                <input type="number" id="stock" v-model="catfood.Stock" step="0.01" min="0" class="form-input small-input" /> จำนวน
            </div>
            <div class="form-buttons">
                <button type="submit" class="submit-button">Update</button>
                <button type="button" @click="navigateTo('/catfoods')" class="back-button">back</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
.edit-catfood-container {
    max-width: 400px;
    margin: 0 auto;
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
    border-radius: 10px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.25s ease, transform 0.25s ease; /* Transition for inputs */
}

.form-input:hover {
    box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.2); /* Darker shadow on input hover */
    transform: translateY(-3px); /* Raise input on hover */
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
    border-radius: 20px;
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
import CatfoodsService from '@/services/CatfoodsService'

export default {
    data() {
        return {
            catfood: {
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
    async editCatfood() {
        try {
            await CatfoodsService.put(this.catfood);
            this.$router.push({
                name: 'catfoods'
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
            let catfoodId = this.$route.params.catfoodId
            this.catfood = (await CatfoodsService.show(catfoodId)).data
        } catch (error) {
            console.log(error)
        }
    },
}
</script>

<style scoped></style>
