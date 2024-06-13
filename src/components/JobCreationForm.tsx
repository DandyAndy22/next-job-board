
import { useSaveJobContext } from "@/context/userContext"
import { Box, Button, FormControl, Link, List, ListItem, ListItemText, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export default function UserInfoForm() {
    const [title, setTitle] = useState<string>("")

    const saveJob = useSaveJobContext()

    const handleJobSubmit = () => {
        if (saveJob != null) {
            saveJob({ title, company, description, salary, application_link })
        }
    }

    const handleOccupationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    useEffect(() => {
        if (job != null) {
            console.log("Occupation Set in Effect")
            setTitle(job.title)
        }
    }, [job])

    return (
        <div>
            <FormControl sx={{ p: 2 }}>
                <TextField
                    id="occupation"
                    label="Occupation"
                    sx={{ mt: "15px" }}
                    value={occupation}
                    onChange={handleOccupationChange}
                />
                <Box sx={{ margin: "25px", marginLeft: "45px", marginRight: "0px" }}>
                    <Button 
                        color="success" 
                        variant="contained" 
                        sx={{ marginRight: "25px" }} 
                        onClick={handleJobSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </FormControl>
        </div>
    )
}