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
import { UserContextType, UserSettings } from "@/app/types"

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [userSettings, setUserSettings] = useState<UserSettings | null>(null)

	const saveUserSettings = (settings: UserSettings) => {
		if (user != null) {
			setUserSettings({
				id: settings.id,
				title: settings.title,
				description: settings.description,
				company: settings.company,
				salary: settings.salary,
				applicationLink: settings.applicationLink
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
			id: data.id,
			title: data.title,
			description: data.description,
			company: data.company,
			salary: data.salary,
			applicationLink: data.applicationLink
		}
		return settings
	} else {
		return null
	}
}

function writeUserSettings(userSettings: UserSettings | null | undefined) {
	if (userSettings != null) {
		const docRef = doc(db, "jobs", userSettings.id)
		const settings = {
			title: userSettings.title ? userSettings.title : "",
			description: userSettings.description ? userSettings.description : "",
			company: userSettings.company ? userSettings.company : "",
			salary: userSettings.salary ? userSettings.salary : "",
			applicationLink: userSettings.applicationLink ? userSettings.applicationLink : ""
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