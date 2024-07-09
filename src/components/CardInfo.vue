<template>
  <div>
    <div class="filter-container">
      <input type="text" v-model="filters.name" placeholder="Name" />
      <select v-model="filters.status">
        <option value="">Any Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <button @click="applyFilters">Применить</button>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="!info.prev">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="!info.next">Next</button>
    </div>
    <div class="card-container">
      <Card
        v-for="character in characters"
        :key="character.id"
        :name="character.name"
        :image="character.image"
        :status="character.status"
        :species="character.species"
        :gender="character.gender"
      />
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="!info.prev">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="!info.next">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchCharacters } from "../api";
import Card from "./Card.vue";

const characters = ref([]);
const info = ref({});
const currentPage = ref(1);

const filters = ref({
  name: "",
  status: "",
});

const loadPage = async (page) => {
  try {
    console.log("Loading page:", page);
    console.log("Filters:", filters.value);
    const data = await fetchCharacters(
      page,
      filters.value.name,
      filters.value.status
    );
    console.log("Fetched data:", data);
    characters.value = data.results;
    info.value = data.info;
    currentPage.value = page;
  } catch (error) {
    console.error("Failed to load page:", error);
  }
};
const applyFilters = () => {
  loadPage(1);
};

const prevPage = () => {
  if (info.value.prev) {
    loadPage(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (info.value.next) {
    loadPage(currentPage.value + 1);
  }
};

onMounted(() => {
  loadPage(1);
});
</script>

<style scoped>
.filter-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.card-container > * {
  width: calc(33.333% - 40px);
  margin-bottom: 20px;
  box-sizing: border-box;
}

@media (max-width: 1024px) {
  .card-container > * {
    width: calc(50% - 40px);
  }
}

@media (max-width: 600px) {
  .card-container > * {
    width: calc(100% - 40px);
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
