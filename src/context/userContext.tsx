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
    doc,
    setDoc,
    collection,
    getDocs
} from "firebase/firestore"
import { auth, db } from "../app/firebase"
import { JobDetails } from "@/app/types"

interface UserContextType {
    user: User | null
    jobs: Object[] | null
    saveJob: Function
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [newJob, setNewJob] = useState<JobDetails | null>(null)
    const [jobs, setJobs] = useState<Object[] | null>(null)

    const saveJob = (job: JobDetails) => {
        if (job != null) {
            setNewJob({
                id: job.id,
                title: job.title,
                company: job.company,
                description: job.description,
                salary: job.salary,
                tags: job.tags,
                application_link: job.application_link
            })
        }
    }

    useEffect(() => {
        writeNewJob(newJob)
    }, [newJob])

    //useEffect(() => {
    //  findUser(user)
    //}, [])

    const [userDataArray, setUserDataArray] = useState<{ id: string }[]>([]);

    return (
        <UserContext.Provider value={{ user, jobs, saveJob }}>
            {children}
        </UserContext.Provider>
    );
}


function writeNewJob(newJob: JobDetails | null | undefined) {
    if (newJob != null) {
        const docRef = doc(db, "jobs", newJob.id)
        const settings = {
            title: newJob.title ? newJob.title : ""
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

export function useJobsContext() {
    const context = useContext(UserContext)
    return context?.jobs
}

export function useSaveJobContext() {
    const context = useContext(UserContext)
    return context?.saveJob
}