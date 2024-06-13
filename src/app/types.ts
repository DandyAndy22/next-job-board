import { User } from "firebase/auth"

export interface JobDetails {
	application_link: string
	company: string
	description: string
	id: number
	salary: string
	title: string
}

export interface UserSettings {
	id: string
	title: string
	description: string
	company: string
	salary: string
	applicationLink: string
}

export interface UserContextType {
	user: User | null
	userSettings: UserSettings | null
	saveUserSettings: Function
}