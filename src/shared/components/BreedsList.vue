<script setup lang="ts">
import { useCatStore } from '@stores/cat.store';
import { ref, onBeforeMount, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { useRouter } from 'vue-router';

const router = useRouter();

const catStore = useCatStore()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const loading = ref(false);

const breeds = ref();

const isDesktop = ref(window.innerWidth > 768);

const checkScreenSize = () => {
  isDesktop.value = window.innerWidth > 768;
};

onMounted(() => {
  window.addEventListener('resize', checkScreenSize);
});

onBeforeMount(async () => {
  window.removeEventListener('resize', checkScreenSize);

  await catStore.fetchBreeds()
  breeds.value = catStore.breeds;
  console.log(breeds.value)
});

function detalhe(catID: number) {
  router.push({
    name: 'detalhes',
    query: {
      id: catID
    },
  });
}

</script>
<template>
  <div class="w-full bg-white h-full rounded-lg">

    <div class="card p-2">
      <DataTable v-model:filters="filters" :value="breeds" scrollable scrollHeight="400px" :loading="loading" paginator
        :rows="10" dataKey="id">
        <template #header>
          <div class="flex justify-end">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
            </IconField>
          </div>
        </template>
        <template #empty> Gatinhos não encontrados. </template>
        <template #loading> Carregando. Por favor, aguarde. </template>
        <Column field="name" header="Name">
          <template #body="{ data }">
            {{ data.name }}
          </template>
        </Column>
        <Column field="origin" header="Origin">
          <template #body="{ data }">
            {{ data.origin }}
          </template>
        </Column>
        <Column field="life_span" header="Life">
          <template #body="{ data }">
            {{ data.life_span }}
          </template>
        </Column>

        <Column v-if="isDesktop" field="intelligence" header="Intelligence">
          <template #body="{ data }">
            {{ data.intelligence }}
          </template>
        </Column>
        <Column v-if="isDesktop" field="affection_level" header="Affection Level">
          <template #body="{ data }">
            {{ data.affection_level }}
          </template>
        </Column>
        <Column v-if="isDesktop" field="energy_level" header="Energy Level">
          <template #body="{ data }">
            {{ data.energy_level }}
          </template>
        </Column>

        <Column header="Details">
          <template #body="{ data }">
            <button @click="detalhe(data.id)">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']"
                class="text-gray-500 cursor-pointer hover:text-blue-500" />
            </button>
          </template>
        </Column>
      </DataTable>
    </div>

  </div>
</template>
