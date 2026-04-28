import { defineStore } from 'pinia'
import { ref } from 'vue'
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc, collection, onSnapshot, updateDoc } from 'firebase/firestore'
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
      const userSnap = await getDoc(userRef)
      
      if (userSnap.exists()) {
        const data = userSnap.data()
        userRole.value = data.role
        // Normalize legacy teamId to array
        userTeamIds.value = data.teamIds || (data.teamId ? [data.teamId] : [])
        
        // Update hasLoggedIn flag if not already set or false
        if (!data.hasLoggedIn) {
          await updateDoc(userRef, { hasLoggedIn: true })
        }
      } else {
        // Create new user, default to admin for ease of testing during capstone
        const newUserData = {
          email: userEmail,
          displayName,
          role: 'admin', // Set to admin by default to prevent testing lockouts
          teamIds: [],
          hasLoggedIn: true, // They just logged in
          createdAt: new Date().toISOString()
        }
        await setDoc(userRef, newUserData)
        userRole.value = 'admin'
        userTeamIds.value = []
      }
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

  return { 
    user, userRole, userTeamIds, allUsers, isAuthReady, error, 
    initAuth, loginWithGoogle, fetchAllUsers, updateUserPermissions 
  }
})
