<template>
  <!-- Modal Overlay -->
  <div
    v-if="visible"
    class="fixed inset-0 bg-dark bg-opacity-80 flex items-center justify-center z-50"
  >
    <!-- Modal Card -->
    <div class="bg-dark border-1 border-black rounded-3xl p-10 border border-dark-gray-800 mx-5">
      <div class="flex justify-between gap-20 items-center text-white pb-5">
        <slot name="title" />
        <button @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
  defineProps({
    visible: { type: Boolean, required: true },
  });
</script>