import { ListItem, ListItemButton, ListItemText } from "@mui/material";


export default function JobRow(props: { job: any, index: number, handleRowClick: Function}) {

    

    return (
        <ListItem>
            <ListItemButton onClick={() => props.handleRowClick(props.index)}>
                <ListItemText primary={props.job.title} secondary={props.job.company} />
            </ListItemButton>
            
        </ListItem>
    )
}