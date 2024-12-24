<template>
  <div v-if="skill" class="mx-3 sm:mx-0">
    <NuxtLink to="/dashboard" class="flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 mb-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
      </svg>
    </NuxtLink>

    <div class="bg-dark-gray-800 py-7 px-10 rounded-t-2xl space-y-5">
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
    <button @click="removeSkill(skill.name)" class="w-full bg-dark-gray-600 py-3 rounded-b-2xl text-center hover:bg-red-900">
        Delete skill
    </button>
    <div class="bg-dark-gray-800 py-7 px-10 rounded-2xl mt-10 space-y-5">
      <p class="text-xl">Practice logs</p>
      <div class="flex divide-x divide-dark-gray-800 md:min-w-80">
        <button @click="toggleModal" class="bg-dark text-center rounded-l-xl py-3 px-5 w-full text-xs md:text-sm hover:bg-dark/50">
          Add practice
        </button>
        <button @click="eraseAllLogs(skill.name)" class="bg-dark text-center rounded-r-xl py-3 px-5 w-full text-xs md:text-sm hover:bg-red-900">
          Erase all logs
        </button>
      </div>
      <div v-if="skill.logs.length > 0" class="space-y-5">
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
      <div v-else>
        <p class="text-center text-sm italic">You have no practice logs</p>
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

  const { getSkill, addLog, removeSkill, eraseAllLogs, getSkillsFromLocalStorage } = useSkillStore()
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
    getSkillsFromLocalStorage()
    getSkill(route.params?.skill as string)
  })



  const transformXpToPourcentage = (xp: number) => {
    return (xp / 1000) * 100
  }
</script>

<style>

</style>