import { googleSignIn, logOut, useUserContext } from "@/context/userContext"
import { Button } from "@mui/material"

export function LoginButton () {
    const user = useUserContext()
    
    const handleLogOut = () => logOut()
    const handleGoogleSignIn = () => googleSignIn()

    return (
        <div>
            {user != undefined ? (
                <Button color="info" variant="contained" onClick={handleLogOut}>Log Out</Button>
            ) : (
                <Button color="info" variant="contained" onClick={handleGoogleSignIn}>Log In</Button>
            )}
        </div>
    )
}