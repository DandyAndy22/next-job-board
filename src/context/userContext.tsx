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
import { UserContextType, AddedJob } from "@/app/types"

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [addedJob, setAddedJob] = useState<AddedJob | null>(null)

	const saveAddedJob = (settings: AddedJob) => {
		if (user != null) {
			setAddedJob({
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
		writeNewJob(addedJob)
	}, [addedJob])

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => findUser(user))
		return unsubscribe
	}, [])

	async function findUser(user: User | null) {
		setUser(user)

		if (user != null) {
			setAddedJob(await findAddedJob(user.uid))
		} else {
			setAddedJob(null)
		}
	}

	return (
		<UserContext.Provider value={{ user, addedJob, saveAddedJob }}>
			{children}
		</UserContext.Provider>
	);
}

async function findAddedJob(uid: string) {
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

function writeNewJob(addedJob: AddedJob | null | undefined) {
	if (addedJob != null) {
		const docRef = doc(db, "jobs", addedJob.id)
		const settings = {
			title: addedJob.title ? addedJob.title : "",
			description: addedJob.description ? addedJob.description : "",
			company: addedJob.company ? addedJob.company : "",
			salary: addedJob.salary ? addedJob.salary : "",
			applicationLink: addedJob.applicationLink ? addedJob.applicationLink : ""
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

export function useAddedJobContext() {
	const context = useContext(UserContext)
	return context?.addedJob
}

export function useSaveAddedJobContext() {
	const context = useContext(UserContext)
	return context?.saveAddedJob
}