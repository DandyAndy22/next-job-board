'use client'
import { 
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react"
import { 
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    User 
} from "firebase/auth"
import {
    getDoc,
    doc,
    setDoc
} from "firebase/firestore"
import { auth, db } from "../app/firebase"

interface AuthUser {
    user: User | null
}

interface UserSettings {
    id: string
    occupation: string
    organization: string
    linkedin: string
    github: string
}

interface UserContextType {
    user: User | null
    userSettings: UserSettings | null
    saveUserSettings: Function
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null)

  const saveUserSettings = (settings: UserSettings) => {
    if (user != null) {
        setUserSettings({
            id: user.uid,
            occupation: settings.occupation,
            organization: settings.organization,
            linkedin: settings.linkedin,
            github: settings.github
        })
    }
  }

  useEffect(() => {
    writeUserSettings(userSettings)
  }, [userSettings])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => findUser(user))
    return unsubscribe
  }, [])

  async function findUser(user: User | null) {
    setUser(user)

    if (user != null) {
        setUserSettings(await findUserSettings(user.uid))
    } else {
        setUserSettings(null)
    }
  }

  return (
    <UserContext.Provider value={{ user, userSettings, saveUserSettings }}>
      {children}
    </UserContext.Provider>
  );
}

async function findUserSettings(uid: string) {
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        const data = docSnap.data()
        const settings = {
            id: docSnap.id,
            occupation: data.occupation,
            organization: data.organization,
            linkedin: data.linkedin,
            github: data.github
        }
        return settings
    } else {
        return null
    }
}

function writeUserSettings(userSettings: UserSettings | null | undefined) {
    if (userSettings != null) {
        const docRef = doc(db, "users", userSettings.id)
        const settings = {
            occupation: userSettings.occupation ? userSettings.occupation : "",
            organization: userSettings.organization ? userSettings.organization : "",
            linkedin: userSettings.linkedin ? userSettings.linkedin : "",
            github: userSettings.github ? userSettings.github : ""
        }
        setDoc(docRef, settings)
    }
}

export const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
}

export const logOut = () => {
    signOut(auth)
}
export function useUserContext() {
    const context = useContext(UserContext)
    return context?.user
}

export function useUserSettingsContext() {
    const context = useContext(UserContext)
    return context?.userSettings
}

export function useSaveUserSettingsContext() {
    const context = useContext(UserContext)
    return context?.saveUserSettings
}