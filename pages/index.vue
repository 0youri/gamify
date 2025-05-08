<template>
  <div class="flex flex-col items-center gap-5 lg:gap-5">
    <!-- Page Header -->
    <div class="text-xl lg:text-xl font-medium text-center">
      Enjoy your learning journey !
    </div>
    <p class="lg:w-1/3 text-sm text-balance text-center">
      <span class="italic">Gamify</span> is a self-improvement app that turns learning into a game.
      Set a skill to focus on, log practice sessions to earn XP, and unlock achievements as you level up your skills.
      Simple, motivational, and fun.
    </p>
    <NuxtLink to="/dashboard" class="bg-dark-gray-800 px-10 py-3 text-lg md:text-sm rounded-2xl hover:bg-dark-gray-600">
      try demo
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
  onMounted(() => {
    localStorage.clear();
  })
</script>

<style>

</style>