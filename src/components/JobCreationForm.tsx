'use client'
import { useSaveAddedJobContext, useAddedJobContext } from "@/context/userContext"
import { Box, Button, FormControl, Link, List, ListItem, ListItemText, TextField, Typography } from "@mui/material"
import { useEffect, useId, useState } from "react"

export function JobCreationForm() {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [company, setCompany] = useState<string>("")
    const [salary, setSalary] = useState<string>("")
    const [applicationLink, setApplicationLink] = useState<string>("")
    const id = useId()

    const [formEditable, setFormEditable] = useState<boolean>(false)

    const addedJob = useAddedJobContext()
    const saveAddedJob = useSaveAddedJobContext()

    const handleSaveUser = () => {
        setFormEditable(false)
        if (saveAddedJob != null) {
            saveAddedJob({ title, description, company, salary, applicationLink, id })
        }
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompany(e.target.value)
    }

    const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSalary(e.target.value)
    }

    const handleApplicationLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApplicationLink(e.target.value)
    }

    const handleCancel = () => setFormEditable(false)
    const handleEdit = () => setFormEditable(true)

    useEffect(() => {
        if (addedJob != undefined && addedJob != null) {
            console.log("title Set in Effect")
            setTitle(addedJob.title)
            setDescription(addedJob.description)
            setCompany(addedJob.company)
            setApplicationLink(addedJob.applicationLink)
        }
    }, [addedJob])

    return (
        <div>
            {formEditable ? (
                <FormControl sx={{ p: 2 }}>
                    <TextField
                        id="title"
                        label="Title"
                        sx={{ mt: "15px" }}
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <TextField
                        id="dscription"
                        label="Description"
                        sx={{ mt: "15px" }}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <TextField
                        id="company"
                        label="Company"
                        sx={{ mt: "15px" }}
                        value={company}
                        onChange={handleCompanyChange}
                    />
                    <TextField
                        id="salary"
                        label="Salary"
                        sx={{ mt: "15px" }}
                        value={salary}
                        onChange={handleSalaryChange}
                    />
                    <TextField
                        id="applicationLink"
                        label="Application Link"
                        sx={{ mt: "15px" }}
                        value={applicationLink}
                        onChange={handleApplicationLinkChange}
                    />
                    <Box sx={{ margin: "25px", marginLeft: "45px", marginRight: "0px" }}>
                        <Button color="success" variant="contained" sx={{ marginRight: "25px" }} onClick={handleSaveUser}>Save</Button>
                        <Button color="warning" variant="contained" onClick={handleCancel}>Cancel</Button>
                    </Box>
                </FormControl>
            ) : (
                <FormControl sx={{ p: 2 }}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <Typography sx={{ mr: "10px" }}>Title:</Typography>
                            <ListItemText primary={title} />
                        </ListItem>
                        <ListItem>
                            <Typography sx={{ mr: "10px" }}>Description:</Typography>
                            <ListItemText primary={description} />
                        </ListItem>
                        <ListItem>
                            <Typography sx={{ mr: "10px" }}>Company:</Typography>
                            <ListItemText primary={company} />
                        </ListItem>
                        <ListItem>
                            <Typography sx={{ mr: "10px" }}>Salary:</Typography>
                            <ListItemText primary={salary} />
                        </ListItem>
                        <ListItem>
                            <Typography sx={{ mr: "10px" }}>Application Link:</Typography>
                            <ListItemText primary={applicationLink != "" ? <Link href={applicationLink}>Apply Here</Link> : ""} />
                        </ListItem>
                    </List>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleEdit}
                        sx={{ margin: "25px", marginLeft: "45px" }}
                    >
                        Edit Profile
                    </Button>
                </FormControl>
            )}
        </div>
    )
}