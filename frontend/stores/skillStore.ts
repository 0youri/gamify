import { defineStore } from 'pinia'

interface Skill {
  name: string;
  level: number;
  xp: number;
  logs: Array<{ name: string, xp: number }>;
}

export const useSkillStore = defineStore('skillStore', () => {
  const defaultSkills = ref([
    {
      order: 1,
      name: 'Coding',
      level: 6,
      xp: 600,
      logs: [
        { name: 'Codecademy', xp: 100 },
        { name: 'LeetCode', xp: 200 },
        { name: 'Project Euler', xp: 300 },
      ]
    },
    {
      order: 2,
      name: 'Guitar',
      level: 2,
      xp: 200,
      logs: [
        { name: 'Practice', xp: 100 },
        { name: 'YouTube', xp: 100 },
      ]
    },
    {
      order: 3,
      name: 'Cooking',
      level: 10,
      xp: 1000,
      logs: [
        { name: 'Cookbook', xp: 100 },
        { name: 'YouTube', xp: 200 },
        { name: 'MasterChef', xp: 700 },
      ]
    },
    {
      order: 4,
      name: 'Dancing',
      level: 8,
      xp: 850,
      logs: [
        { name: 'Dance class', xp: 300 },
        { name: 'YouTube', xp: 200 },
        { name: 'Dance competition', xp: 350 },
      ]
    },
    {
      order: 5,
      name: 'Writing',
      level: 5,
      xp: 510,
      logs: [
        { name: 'Medium', xp: 100 },
        { name: 'Blog', xp: 200 },
        { name: 'Book', xp: 100 },
      ]
    }
  ])


  const skills = ref<Skill[]>([])
  const skill = ref<Skill | null>(null)

  const addSkill = (name: string) => {
    const newSkill: Skill = {
      name,
      level: 0,
      xp: 0,
      logs: []
    }
    skills.value.push(newSkill)
    addSkillsToLocalStorage()
  }

  const addSkillsToLocalStorage = () => {
    localStorage.setItem('skills', JSON.stringify(skills.value))
  }

  const getSkillsFromLocalStorage = () => {
    const skillsFromLocalStorage = localStorage.getItem('skills')
    if (skillsFromLocalStorage) {
      skills.value = JSON.parse(skillsFromLocalStorage)
    } else {
      skills.value = defaultSkills.value
      addSkillsToLocalStorage()
    }
  }

  const eraseAllLogs = (name: string) => {
    const skillToUpdate = skills.value.find(skill => skill.name.toLowerCase() === name.toLowerCase())
    if (skillToUpdate) {
      skillToUpdate.logs = []
      skillToUpdate.level = 0
      skillToUpdate.xp = 0
      addSkillsToLocalStorage()
    }
  }

  const removeSkill = (name: string) => {
    const index = skills.value.findIndex(skill => skill.name.toLowerCase() === name.toLowerCase())
    if (index !== -1) {
      skills.value.splice(index, 1)
      addSkillsToLocalStorage()
      navigateTo('/dashboard')
    }

  }

  const addXP = (name: string, xp: number) => {
    const skillToUpdate = skills.value.find(skill => skill.name.toLowerCase() === name.toLowerCase())
    if (skillToUpdate) {
      skillToUpdate.xp += xp
      const newLevel = Math.floor(skillToUpdate.xp / 100)
      if (newLevel > skillToUpdate.level) {
        skillToUpdate.level = newLevel
      }
    }
  }
  
  const getSkill = (name: string) => {
    skill.value = skills.value.find(skill => skill.name.toLowerCase() === name) || null
  }

  const addLog = (log: { name: string, xp: number }) => {
    if (skill.value) {
      skill.value.logs.push({...log})
      const skillToUpdate = skills.value.find(s => s.name.toLowerCase() === skill.value!.name.toLowerCase())
      if (skillToUpdate) {
        skillToUpdate.logs = [...skill.value.logs]
        addXP(skill.value.name, log.xp)
      }
    }
  }

  return {
    skills, skill,
    addSkill, addLog, removeSkill, eraseAllLogs, getSkillsFromLocalStorage,
    getSkill,
    addXP,
  }
})
