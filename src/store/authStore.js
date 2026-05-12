import { defineStore } from 'pinia'
import { ref } from 'vue'
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc, collection, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const userRole = ref(null)
  const userTeamIds = ref([]) // Changed to array for multiple team support
  const allUsers = ref([]) // To store all users for admin management
  const isAuthReady = ref(false)
  const error = ref(null)

  const fetchUserData = async (uid, email, displayName) => {
    try {
      if (!db || !email) return // Guard if db isn't initialized or no email
      const userEmail = email.toLowerCase()
      const userRef = doc(db, 'users', userEmail)
      
      // Use onSnapshot for real-time role and team updates
      onSnapshot(userRef, async (userSnap) => {
        if (userSnap.exists()) {
          const data = userSnap.data()
          userRole.value = data.role
          userTeamIds.value = data.teamIds || (data.teamId ? [data.teamId] : [])
          
          if (!data.hasLoggedIn) {
            await updateDoc(userRef, { hasLoggedIn: true })
          }
        } else {
          const newUserData = {
            email: userEmail,
            displayName,
            role: 'guest',
            teamIds: [],
            hasLoggedIn: true,
            createdAt: new Date().toISOString()
          }
          await setDoc(userRef, newUserData)
          userRole.value = 'guest'
          userTeamIds.value = []
        }
      })
    } catch (err) {
      console.error('Error fetching user data:', err)
      error.value = 'Failed to load user permissions.'
    }
  }

  const initAuth = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        user.value = currentUser
        await fetchUserData(currentUser.uid, currentUser.email, currentUser.displayName)
      } else {
        user.value = null
        userRole.value = null
        userTeamIds.value = []
      }
      isAuthReady.value = true
    })
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    error.value = null
    try {
      const result = await signInWithPopup(auth, provider)
      user.value = result.user
      await fetchUserData(result.user.uid, result.user.email, result.user.displayName)
    } catch (err) {
      error.value = err.message
      console.error('Google login error:', err)
      throw err
    }
  }

  const fetchAllUsers = () => {
    if (!db) return
    const usersCol = collection(db, 'users')
    onSnapshot(usersCol, (snapshot) => {
      allUsers.value = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }))
    })
  }

  const updateUserPermissions = async (uid, updates) => {
    try {
      const userRef = doc(db, 'users', uid)
      await updateDoc(userRef, updates)
      // If updating self, update local state
      if (uid === user.value?.uid) {
        if (updates.role !== undefined) userRole.value = updates.role
        if (updates.teamIds !== undefined) userTeamIds.value = updates.teamIds
      }
    } catch (err) {
      console.error('Failed to update user:', err)
      throw err
    }
  }

  const deleteUserDoc = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid)
      await deleteDoc(userRef)
    } catch (err) {
      console.error('Failed to delete user:', err)
      throw err
    }
  }

  return { 
    user, userRole, userTeamIds, allUsers, isAuthReady, error, 
    initAuth, loginWithGoogle, fetchAllUsers, updateUserPermissions, deleteUserDoc
  }
})
