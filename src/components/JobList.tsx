import { Box, List } from "@mui/material";
import JobRow from "./JobRow";
import { JobDetails } from "@/app/types";

export default function JobList(props: { jobs: JobDetails[], handleRowClick: Function }) {

    return (
        <Box sx={{ width: '100%', height: 250, maxWidth: "100vw", bgcolor: 'background.paper' }}>
            <List>
                {props.jobs.map((job, index) => <JobRow key={index} index={index} job={job} />)}
            </List>
        </Box>
    )
}