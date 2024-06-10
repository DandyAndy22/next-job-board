import { ListItem, ListItemButton, ListItemText } from "@mui/material";


export default function JobRow(props: { job: any, index: number }) {

    const handleRowClick = (index: number) => {
        console.log(`Row ${index} clicked`)
        // Set dialog to open job details
    }

    return (
        <ListItem>
            <ListItemButton onClick={() => handleRowClick(props.index)}>
                <ListItemText primary={props.job.title} secondary={props.job.company} />
            </ListItemButton>
            
        </ListItem>
    )
}