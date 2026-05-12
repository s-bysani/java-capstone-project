import { defineStore } from 'pinia'
import { ref } from 'vue'
import { doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const useAdminStore = defineStore('admin', () => {
  const features = ref({
    emailNotifications: false,
    sprintManagement: true,
    guestAccess: false
  })
  const loading = ref(true)
  const error = ref(null)

  let unsubscribe = null

  const subscribeFeatures = () => {
    if (!db) return
    loading.value = true
    error.value = null

    const featuresRef = doc(db, 'settings', 'features')
    
    unsubscribe = onSnapshot(
      featuresRef,
      (docSnap) => {
        if (docSnap.exists()) {
          features.value = { ...features.value, ...docSnap.data() }
        } else {
          // Initialize default features if document doesn't exist
          setDoc(featuresRef, features.value).catch(err => console.error('Failed to init features:', err))
        }
        loading.value = false
      },
      (err) => {
        console.error('Error fetching features:', err)
        error.value = 'Failed to load feature flags'
        loading.value = false
      }
    )
  }

  const unsubscribeFeatures = () => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  }

  const toggleFeature = async (featureKey, value) => {
    try {
      if (!db) return
      const featuresRef = doc(db, 'settings', 'features')
      await updateDoc(featuresRef, {
        [featureKey]: value
      })
    } catch (err) {
      console.error(`Error toggling feature ${featureKey}:`, err)
      throw err
    }
  }

  return {
    features,
    loading,
    error,
    subscribeFeatures,
    unsubscribeFeatures,
    toggleFeature
  }
})
