import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, onSnapshot, doc, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase'

export const useTrackerStore = defineStore('tracker', () => {
  const engineers = ref([])
  const tasks = ref([])
  const isDbReady = !!db

  // Fetch engineers and their team mappings
  const subscribeEngineers = () => {
    if (!isDbReady) return;
    const engCol = collection(db, 'engineers')
    onSnapshot(engCol, (snapshot) => {
      engineers.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
  }

  const updateEngineerTeam = async (engineerId, teamId, role = 'member') => {
    if (!isDbReady) {
      const eng = engineers.value.find(e => e.id === engineerId)
      if (eng) {
        eng.teamId = teamId
        eng.role = role
      }
      return;
    }
    const engRef = doc(db, 'engineers', engineerId)
    await updateDoc(engRef, { teamId, role })
    
    // Also update the users collection if the ID looks like an email
    if (engineerId.includes('@')) {
      const userRef = doc(db, 'users', engineerId)
      const userSnap = await getDoc(userRef)
      if (userSnap.exists()) {
        await updateDoc(userRef, { 
          teamIds: teamId ? [teamId] : [], // Override team assignment for simplicity
          role: role 
        })
      }
    }
  }

  const addEngineersBulk = async (engineersData) => {
    if (!isDbReady) {
      engineersData.forEach(e => {
        const id = e.email ? e.email.toLowerCase() : Math.random().toString(36).substr(2, 9)
        engineers.value.push({ id, ...e, teamId: null })
      })
      return;
    }
    const promises = engineersData.map(async (eng) => {
      // Use email as ID if available, otherwise fallback to random
      const id = eng.email ? eng.email.toLowerCase() : Math.random().toString(36).substr(2, 9)
      
      // 1. Create engineer document for board display
      await setDoc(doc(db, 'engineers', id), { ...eng, teamId: null, role: 'member' })
      
      // 2. Pre-provision Firebase user document
      if (eng.email) {
        const emailLower = eng.email.toLowerCase()
        await setDoc(doc(db, 'users', emailLower), {
          email: emailLower,
          displayName: eng.name,
          role: 'member',
          teamIds: [],
          hasLoggedIn: false,
          createdAt: new Date().toISOString()
        }, { merge: true }) // use merge to preserve existing users if any
      }
    })
    await Promise.all(promises)
  }

  // Delete an engineer
  const deleteEngineer = async (engineerId) => {
    if (!isDbReady) {
      engineers.value = engineers.value.filter(e => e.id !== engineerId)
      return;
    }
    const engRef = doc(db, 'engineers', engineerId)
    await deleteDoc(engRef)
    
    if (engineerId.includes('@')) {
      const userRef = doc(db, 'users', engineerId)
      await deleteDoc(userRef)
    }
  }

  // Fetch all tasks
  const subscribeTasks = () => {
    if (!isDbReady) return;
    const tasksCol = collection(db, 'tasks')
    onSnapshot(tasksCol, (snapshot) => {
      tasks.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
  }

  // Add a task
  const addTask = async (taskData) => {
    if (!isDbReady) {
      tasks.value.push({ id: Math.random().toString(36).substr(2, 9), ...taskData })
      return;
    }
    const id = Math.random().toString(36).substr(2, 9)
    await setDoc(doc(db, 'tasks', id), taskData)
  }

  // Update task status (column)
  const updateTaskStatus = async (taskId, newStatus) => {
    if (!isDbReady) {
      const task = tasks.value.find(t => t.id === taskId)
      if (task) task.status = newStatus
      return;
    }
    const taskRef = doc(db, 'tasks', taskId)
    await updateDoc(taskRef, { status: newStatus })
  }

  // Update multiple details of a task
  const updateTaskDetails = async (taskId, updates) => {
    if (!isDbReady) {
      const task = tasks.value.find(t => t.id === taskId)
      if (task) {
        Object.assign(task, updates)
      }
      return;
    }
    const taskRef = doc(db, 'tasks', taskId)
    await updateDoc(taskRef, updates)
  }

  // Add a comment to a task
  const addTaskComment = async (taskId, commentText, authorName) => {
    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      text: commentText,
      author: authorName || 'Unknown',
      timestamp: new Date().toISOString()
    }
    
    if (!isDbReady) {
      const task = tasks.value.find(t => t.id === taskId)
      if (task) {
        if (!task.comments) task.comments = []
        task.comments.push(newComment)
      }
      return;
    }
    
    const taskRef = doc(db, 'tasks', taskId)
    await updateDoc(taskRef, {
      comments: arrayUnion(newComment)
    })
  }

  // Delete a task
  const deleteTask = async (taskId) => {
    if (!isDbReady) {
      tasks.value = tasks.value.filter(t => t.id !== taskId)
      return;
    }
    const taskRef = doc(db, 'tasks', taskId)
    await deleteDoc(taskRef)
  }

  // Update a comment
  const updateTaskComment = async (taskId, commentId, newText) => {
    if (!isDbReady) {
      const task = tasks.value.find(t => t.id === taskId)
      if (task && task.comments) {
        const comment = task.comments.find(c => c.id === commentId)
        if (comment) comment.text = newText
      }
      return;
    }
    const taskRef = doc(db, 'tasks', taskId)
    const task = tasks.value.find(t => t.id === taskId)
    if (task && task.comments) {
      const updatedComments = task.comments.map(c => c.id === commentId ? { ...c, text: newText } : c)
      await updateDoc(taskRef, { comments: updatedComments })
    }
  }

  // Delete a comment
  const deleteTaskComment = async (taskId, commentId) => {
    if (!isDbReady) {
      const task = tasks.value.find(t => t.id === taskId)
      if (task && task.comments) {
        task.comments = task.comments.filter(c => c.id !== commentId)
      }
      return;
    }
    const taskRef = doc(db, 'tasks', taskId)
    const task = tasks.value.find(t => t.id === taskId)
    if (task && task.comments) {
      const updatedComments = task.comments.filter(c => c.id !== commentId)
      await updateDoc(taskRef, { comments: updatedComments })
    }
  }

  return {
    engineers,
    tasks,
    subscribeEngineers,
    updateEngineerTeam,
    addEngineersBulk,
    deleteEngineer,
    subscribeTasks,
    addTask,
    updateTaskStatus,
    updateTaskDetails,
    deleteTask,
    addTaskComment,
    updateTaskComment,
    deleteTaskComment
  }
})
