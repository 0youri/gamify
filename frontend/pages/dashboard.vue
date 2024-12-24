<template>
  <div class="mx-3 sm:mx-0">
    <div class="flex flex-col md:flex-row items-center gap-5 py-5 px-10 bg-dark-gray-800 rounded-2xl">
      <div class="flex flex-col md:flex-row items-center gap-5 w-1/2">

        <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
          <img class="w-full h-full object-cover object-top" src="/img/avatar.webp" alt="">
        </div>
        <div class="space-y-1">
          <p class="text-xl text-center">{{ profile.username }}</p>
          <div class="flex items-center gap-1">
            <svg class="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" /></svg>
            <p class="text-xs">{{ profile.streak }} days in a row</p>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 flex justify-center items-center text-sm divide-x divide-dark-gray-800">
        <button @click="toggleModal('editProfile')" class="bg-dark py-3 rounded-l-xl w-full md:w-1/2 hover:bg-blue-900">Edit profile</button>
        <NuxtLink to="/" class="bg-dark text-center py-3 rounded-r-xl w-full md:w-1/2 hover:bg-red-900">Delete profile</NuxtLink>
      </div>

    </div>
    <div class="bg-dark-gray-800 py-7 px-10 rounded-2xl mt-10 space-y-5">
      <p class="text-xl">Your skills</p>
      <button @click="toggleModal('addSkill')" class="w-full bg-dark rounded-xl text-center py-2.5 hover:bg-dark/50">Add skill</button>
      <div>
        <p class="text-lg mb-3 pb-1 border-b">In Progress</p>
        <div 
          v-if="skills.filter(skill => skill.xp < 1000).length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:justify-items-center"
        >
          <div
            v-for="skill in skills.filter(skill => skill.xp < 1000).sort((a, b) => b.xp - a.xp)"
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
        <div v-else class="px-5 md:px-32">
          <p class="text-center text-sm italic">You have no skills in progress</p>
        </div>
      </div>
      <div >
        <p class="text-lg mb-3 pb-1 border-b">Finished</p>
        <div
          v-if="skills.filter(skill => skill.xp === 1000).length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:justify-items-center"
        >
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
        <div v-else class="px-5 md:px-32">
          <p class="text-center text-sm italic">You have no finished skills</p>
        </div>
      </div>
    </div>

    <Modal
      :visible="modals.addSkill"
      @close="toggleModal('addSkill')"
    >
      <template #title>
        <p class="text-xl">Add skill</p>
      </template>
      <template #default>
        <form class="space-y-5" @submit.prevent="addSkill(skillName); toggleModal('addSkill')" @reset="toggleModal('addSkill')">
          <input
            v-model="skillName"
            type="text"
            required minlength="1"
            class="w-full bg-dark-gray-400 rounded-xl text-sm py-3 px-5"
            placeholder="Skill name"
          />
          <div class="flex gap-5 text-sm w-full">
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

    <Modal
      :visible="modals.editProfile"
      @close="toggleModal('editProfile')"
    >
      <template #title>
        <p class="text-xl">Edit profile</p>
      </template>
      <template #default>
        <form
          class="space-y-5" 
          @submit.prevent="editProfileUsername(newUsername); toggleModal('editProfile')"
          @reset="toggleModal('editProfile')"
        >
          <input
            v-model="newUsername"
            type="text"
            required minlength="1"
            class="w-full bg-dark-gray-400 rounded-xl text-sm py-3 px-5"
            placeholder="New username"
          />
          <div class="flex gap-5 text-sm w-full">
            <button type="reset" class="bg-dark-gray-800 text-center rounded-xl py-3 px-5 w-full hover:bg-red-900">
              Close
            </button>
            <button type="submit" class="bg-dark-gray-800 text-center rounded-xl py-3 px-5 w-full hover:bg-blue-900">
              Edit
            </button>
          </div>
        </form>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
  import { useProfileStore } from "~/stores/profileStore";
  import { useSkillStore } from "~/stores/skillStore";

  const { addSkill, getSkillsFromLocalStorage } = useSkillStore()
  const { skills } = storeToRefs(useSkillStore())

  const { editProfileUsername, getLocalProfile } = useProfileStore()
  const { profile } = storeToRefs(useProfileStore())

  const modals = reactive({
    addSkill: false,
    editProfile: false,
  });
  const skillName = ref('');
  const newUsername = ref('');

  const toggleModal = (modalName: keyof typeof modals) => {
    modals[modalName] = !modals[modalName];
    if (modalName === 'addSkill') {
      skillName.value = '';
    } else if (modalName === 'editProfile') {
      newUsername.value = ''
    }
  };

  

  const transformXpToPourcentage = (xp: number) => {
    return (xp / 1000) * 100
  }

  onMounted(() => {
    getSkillsFromLocalStorage()
    getLocalProfile()
  })

</script>

<style>

</style>