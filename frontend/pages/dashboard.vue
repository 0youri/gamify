<template>
  <div class="mx-3 sm:mx-0">
    <div class="flex flex-col items-center gap-3">
      <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
        <img class="w-full h-full object-cover object-top" src="/img/avatar.webp" alt="">
      </div>
      <p class="text-xl">Anonymous</p>
    </div>
    <div class="bg-dark-gray-800 py-7 px-10 rounded-2xl mt-10 space-y-5">
      <p class="text-xl">Your skills</p>
      <button @click="toggleModal" class="w-full bg-dark rounded-xl text-center py-2.5 hover:bg-dark/50">Add skill</button>
      <div>
        <p class="text-lg mb-3 pb-1 border-b">In Progress</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:justify-items-center">
          <div
            v-for="skill in skills.filter(skill => skill.xp < 1000)"
            :key="skill.name"
            class="bg-dark-gray-600 rounded-xl p-3 space-y-5 w-72 lg:w-60 hover:bg-dark-gray-400 relative group"
          >
            <NuxtLink
              :to="`/skills/${skill.name.toLowerCase()}`"
              class="absolute inset-0 bg-dark bg-opacity-95 rounded-xl flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <p class="text-white">Details</p>
            </NuxtLink>
            <div class="text-center">
              <p class="text-lg">{{ skill.name }}</p>
              <p class="text-sm">level: {{ skill.level }}</p>
            </div>
            <div class="space-y-2">
              <div class="w-full bg-dark-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-5 rounded-full"
                  :style="`width: ${transformXpToPourcentage(skill.xp)}%;`"
                  :class="{
                    'bg-red-500 bg-opacity-50': skill.xp < 300,
                    'bg-yellow-500 bg-opacity-50': skill.xp >= 300 && skill.xp < 700,
                    'bg-green-500 bg-opacity-50': skill.xp >= 700 && skill.xp < 1000,
                  }"
                ></div>
              </div>
              <p class="text-center text-xs">{{ skill.xp }} / 1000 XP</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="text-lg mb-3 pb-1 border-b">Finished</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:justify-items-center">
          <div
            v-for="skill in skills.filter(skill => skill.xp === 1000)"
            :key="skill.name"
            class="bg-dark-gray-600 rounded-xl p-3 space-y-5 w-72 lg:w-60 hover:bg-dark-gray-400 relative group"
          >
            <NuxtLink
              :to="`/skills/${skill.name.toLowerCase()}`"
              class="absolute inset-0 bg-dark bg-opacity-95 rounded-xl flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <p class="text-white">Details</p>
            </NuxtLink>
            <div class="text-center">
              <p class="text-lg">{{ skill.name }}</p>
              <p class="text-sm">level: {{ skill.level }}</p>
            </div>
            <div class="space-y-2">
              <div class="w-full bg-dark-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-5 rounded-full bg-white"
                  :style="`width: ${transformXpToPourcentage(skill.xp)}%;`"
                ></div>
              </div>
              <p class="text-center text-xs">{{ skill.xp }} / 1000 XP</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal
      :visible="modalState"
      @close="toggleModal"
    >
      <template #title>
        <p class="text-xl">Add skill</p>
      </template>
      <template #default>
        <div class="space-y-5">
          <input
            v-model="skillName"
            type="text"
            class="w-full bg-dark-gray-400 rounded-xl text-sm py-3 px-5"
            placeholder="Skill name"
          />
          <div class="flex gap-5 text-sm w-full">
            <button @click="toggleModal" class="bg-dark-gray-800 text-center rounded-xl py-3 px-5 w-full hover:bg-red-900">
              Close
            </button>
            <button @click="addSkill(skillName); toggleModal()" class="bg-dark-gray-800 text-center rounded-xl py-3 px-5 w-full hover:bg-green-900">
              Add
            </button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts" setup>

  import { useSkillStore } from "~/stores/skillStore";

  const { addSkill } = useSkillStore()
  const { skills } = storeToRefs(useSkillStore())

  const modalState = ref(false);
  const skillName = ref('');

  const toggleModal = () => {
    modalState.value = !modalState.value;
    skillName.value = '';
  }

  const transformXpToPourcentage = (xp: number) => {
    return (xp / 1000) * 100
  }

</script>

<style>

</style>