<template>
  <div v-if="skill" class="mx-3 sm:mx-0">
    <div class="bg-dark-gray-800 py-7 px-10 rounded-2xl space-y-5">
      <div>
        <p class="sm:text-xl">{{ skill.name }}</p>
        <p class="text-sm">level: {{ skill.level }}</p>
      </div>
      <div class="space-y-2">
        <div class="w-full bg-dark-gray-200 rounded-full overflow-hidden">
          <div
            class=" h-5 rounded-full"
            :style="`width: ${transformXpToPourcentage(skill.xp)}%;`"
            :class="{
              'bg-red-500 bg-opacity-50': skill.xp < 300,
              'bg-yellow-500 bg-opacity-50': skill.xp >= 300 && skill.xp < 700,
              'bg-green-500 bg-opacity-50': skill.xp >= 700 && skill.xp < 1000,
              'bg-white': skill.xp === 1000,
            }"
          ></div>
        </div>
        <p class="text-center text-xs">{{ skill.xp }} / 1000 XP</p>
      </div>
    </div>
    <div class="bg-dark-gray-800 py-7 px-10 rounded-2xl mt-10 space-y-5">
      <p class="text-xl">Practice logs</p>
      <button @click="toggleModal" class="bg-dark text-center rounded-xl py-3 px-5 w-full text-sm md:text-base hover:bg-dark/50">
        Add practice
      </button>
      <div class="space-y-5">
        <div
          v-for="log in skill.logs"
          :key="log.name"
          class="bg-dark-gray-600 rounded-xl py-3 px-5 w-full hover:bg-dark-gray-400"
          :class="log.xp === 1000 ? 'order-last' : ''"
        >
          <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-10 md:gap-20 text-xs md:text-base">
            <p>{{ log.name }}</p>
            <p class="text-dark-gray-100">+{{ log.xp }} XP</p>
          </div>
        </div>
      </div>
    </div>
    <Modal
      :visible="modalState"
      @close="toggleModal"
    >
      <template #title>
        <p class="text-xl">Add practice</p>
      </template>
      <template #default>
        <form class="space-y-5" @submit.prevent="addLog(form); toggleModal()" @reset="toggleModal">
          <input
            v-model="form.name"
            type="text"
            required minlength="1"
            class="w-full bg-dark-gray-400 rounded-xl text-sm py-3 px-5"
            placeholder="Practice name"
          />
          <input
            v-model="form.xp"
            type="number"
            min="1"
            max="200"
            class="w-full bg-dark-gray-400 rounded-xl text-sm py-3 px-5"
            placeholder="XP gained"
          />
          <div class="flex gap-5 text-sm">
            <button type="reset" class="bg-dark-gray-800 text-center rounded-xl py-3 px-5 w-full hover:bg-red-900">
              Close
            </button>
            <button type="submit" class="bg-dark-gray-800 text-center rounded-xl py-3 px-5 w-full hover:bg-green-900">
              Add
            </button>
          </div>
        </form>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
  import { useSkillStore } from "~/stores/skillStore";

  const { getSkill, addLog } = useSkillStore()
  const { skill } = storeToRefs(useSkillStore())


  const route = useRoute()
  const modalState = ref(false);
  
  // Form values 
  const form = reactive({
    name: '',
    xp: 0
  });

  const toggleModal = () => {
    modalState.value = !modalState.value;
    form.name = '';
    form.xp = 0;
  };

  onMounted(() => {
    getSkill(route.params?.skill as string)
  })



  const transformXpToPourcentage = (xp: number) => {
    return (xp / 1000) * 100
  }
</script>

<style>

</style>