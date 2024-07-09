<template>
  <div class="card">
    <img :src="image" alt="Character Image" class="card-image" />
    <div class="card-info">
      <h2>{{ name }}</h2>
      <p>Status: {{ status }}</p>
      <p>Species: {{ species }}</p>
      <p>Gender: {{ gender }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  name: String,
  image: String,
  status: String,
  species: String,
  gender: String,
});
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: #524c4c;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  width: 100%;
}

.card-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.card-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: antiquewhite;
}
</style>
