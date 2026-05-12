import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, onSnapshot, doc, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase'

export const useTrackerStore = defineStore('tracker', () => {
  const engineers = ref([])
  const tasks = ref([])
  const iterations = ref([])
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
          teamIds: teamId ? [teamId] : [],
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
      const id = eng.email ? eng.email.toLowerCase() : Math.random().toString(36).substr(2, 9)
      await setDoc(doc(db, 'engineers', id), { ...eng, teamId: null, role: eng.role || 'member' })
      if (eng.email) {
        const emailLower = eng.email.toLowerCase()
        await setDoc(doc(db, 'users', emailLower), {
          email: emailLower,
          displayName: eng.name,
          role: 'member',
          teamIds: [],
          hasLoggedIn: false,
          createdAt: new Date().toISOString()
        }, { merge: true })
      }
    })
    await Promise.all(promises)
  }

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

  // ─── Tasks ──────────────────────────────────────────────────────────────────

  const subscribeTasks = () => {
    if (!isDbReady) return;
    const tasksCol = collection(db, 'tasks')
    onSnapshot(tasksCol, (snapshot) => {
      tasks.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
  }

  const addTask = async (taskData) => {
    if (!isDbReady) {
      tasks.value.push({ id: Math.random().toString(36).substr(2, 9), ...taskData })
      return;
    }
    const id = Math.random().toString(36).substr(2, 9)
    await setDoc(doc(db, 'tasks', id), taskData)
  }

  const updateTaskStatus = async (taskId, newStatus) => {
    if (!isDbReady) {
      const task = tasks.value.find(t => t.id === taskId)
      if (task) task.status = newStatus
      return;
    }
    const taskRef = doc(db, 'tasks', taskId)
    await updateDoc(taskRef, { status: newStatus })
  }

  const updateTaskDetails = async (taskId, updates) => {
    if (!isDbReady) {
      const task = tasks.value.find(t => t.id === taskId)
      if (task) Object.assign(task, updates)
      return;
    }
    const taskRef = doc(db, 'tasks', taskId)
    await updateDoc(taskRef, updates)
  }

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
    await updateDoc(taskRef, { comments: arrayUnion(newComment) })
  }

  const deleteTask = async (taskId) => {
    if (!isDbReady) {
      tasks.value = tasks.value.filter(t => t.id !== taskId)
      return;
    }
    const taskRef = doc(db, 'tasks', taskId)
    await deleteDoc(taskRef)
  }

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

  // ─── Iterations (Sprints) ────────────────────────────────────────────────────

  const subscribeIterations = () => {
    if (!isDbReady) return;
    const iterCol = collection(db, 'iterations')
    onSnapshot(iterCol, (snapshot) => {
      iterations.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
  }

  const addIteration = async (iterData) => {
    const id = Math.random().toString(36).substr(2, 9)
    const payload = { ...iterData, createdAt: new Date().toISOString() }
    if (!isDbReady) {
      iterations.value.push({ id, ...payload })
      return id;
    }
    await setDoc(doc(db, 'iterations', id), payload)
    return id;
  }

  const updateIteration = async (iterationId, updates) => {
    if (!isDbReady) {
      const iter = iterations.value.find(i => i.id === iterationId)
      if (iter) Object.assign(iter, updates)
      return;
    }
    const iterRef = doc(db, 'iterations', iterationId)
    await updateDoc(iterRef, updates)
  }

  const deleteIteration = async (iterationId) => {
    if (!isDbReady) {
      iterations.value = iterations.value.filter(i => i.id !== iterationId)
      tasks.value.forEach(t => { if (t.iterationId === iterationId) t.iterationId = null })
      return;
    }
    // Detach tasks first
    const tasksToDetach = tasks.value.filter(t => t.iterationId === iterationId)
    await Promise.all(tasksToDetach.map(t => updateDoc(doc(db, 'tasks', t.id), { iterationId: null })))
    await deleteDoc(doc(db, 'iterations', iterationId))
  }

  return {
    engineers,
    tasks,
    iterations,
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
    deleteTaskComment,
    subscribeIterations,
    addIteration,
    updateIteration,
    deleteIteration,
  }
})
