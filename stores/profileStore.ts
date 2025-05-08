import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profileStore', () => {

  const defaultProfile = {
    username: 'Anonymous',
    streak: 3,
  }

  const profile = ref<{ username: string, streak: number }>({ username: '', streak: 0 })


  const editProfileUsername = (newUsername: string) => {
    profile.value.username = newUsername
    saveLocalProfile()
  }

  const editProfileStreak = (newStreak: number) => {  
    profile.value.streak = newStreak
    saveLocalProfile()
  }
  
  const saveLocalProfile = () => {
    localStorage.setItem('profile', JSON.stringify(profile.value))
  }

  const getLocalProfile = () => {
    const profileFromLocalStorage = localStorage.getItem('profile')
    if (profileFromLocalStorage) {
      profile.value = JSON.parse(profileFromLocalStorage)
    } else {
      profile.value = defaultProfile
      saveLocalProfile()
    }
  }

  return {
    profile,
    editProfileUsername,
    editProfileStreak,
    saveLocalProfile,
    getLocalProfile
  }
})