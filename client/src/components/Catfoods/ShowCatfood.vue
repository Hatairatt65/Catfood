<template>
    <div class="catfood-detail-container">
        <h1>Show Catfood</h1>
        <div class="catfood-detail">
            <img :src="BASE_URL + catfood.picture" alt="Catfood Image" v-if="catfood.picture" class="catfood-image" />
            <div class="catfood-info">
                <p><strong>ID:</strong> {{ catfood.id }}</p>
                <p><strong>ชื่ออาหารแมว:</strong> {{ catfood.catfoodname }}</p>
                <p><strong>ยี่ห้อ:</strong> {{ catfood.brand }}</p>
                <p><strong>เหมาะสำหรับอายุ:</strong> {{ catfood.age }}</p>
                <p><strong>ประเภทของอาหาร:</strong> {{ catfood.type }}</p>
                <p><strong>ราคา:</strong> {{ catfood.price }} บาท</p>
                <p><strong>สต๊อกสินค้า:</strong> {{ catfood.Stock }} จำนวน</p>
            </div>
        </div>
        <div class="action-buttons">
            <button @click="navigateTo('/catfood/edit/' + catfood.id)" class="action-btn edit-btn">Edit Catfood</button>
            <button @click="navigateTo('/catfoods')" class="action-btn back-btn">back</button>
        </div>
    </div>
</template>

<style scoped>
.catfood-detail-container {
    width: 70%; /* Increased width for more space */
    margin: 20px auto;
    padding: 20px;
    background-color: #ffffff; /* Changed to white for a cleaner look */
    border-radius: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Enhanced shadow for depth */
}

.catfood-detail-container:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3); /* Stronger shadow on hover */
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-family: 'Arial', sans-serif; /* Modern font style */
}

.catfood-detail {
    display: flex;
    align-items: flex-start; /* Align items at the top */
    margin-bottom: 20px;
}

.catfood-image {
    width: 300px; /* Increased size for better visibility */
    height: auto;
    border-radius: 10px;
    margin-right: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.catfood-info p {
    margin: 8px 0;
    font-size: 18px; /* Slightly larger text */
    line-height: 1.6; /* Improved line height */
}

strong {
    color: #555;
}

.action-buttons {
    display: flex;
    justify-content: center;
    margin-top: 30px; /* More space above buttons */
}

.action-btn {
    padding: 12px 20px; /* Increased padding for buttons */
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px; /* Slightly larger font for buttons */
    transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth background transition */
}

.edit-btn {
    background-color: #6c757d; /* Gray background */
    color: white;
    margin-right: 20px; /* Increased margin for spacing */
}

.back-btn {
    background-color: #007bff; /* Blue background */
    color: white;
}

.edit-btn:hover {
    background-color: #5a6268; /* Darker gray on hover */
    transform: translateY(-2px); /* Raise button on hover */
}

.back-btn:hover {
    background-color: #0056b3; /* Darker blue on hover */
    transform: translateY(-2px); /* Raise button on hover */
}
</style>


<script>
import CatfoodsService from '@/services/CatfoodsService';
export default {
    data () {
        return {
            catfood: null,
            BASE_URL: 'http://localhost:8081/assets/uploads/', // Correct base URL
        };
    },
    async created () {
        try {
            let catfoodId = this.$route.params.catfoodId;
            this.catfood = (await CatfoodsService.show(catfoodId)).data;
        } catch (error) {
            console.error('Error fetching catfood data:', error); // More informative error logging
        }
    },
    methods: {
        navigateTo (route) {
            this.$router.push(route);
        },
    }
};
</script>

<style scoped>
</style>
