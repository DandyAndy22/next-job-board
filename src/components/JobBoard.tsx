'use client'
import { JobList } from "@/components/JobList";
import { useState } from "react";
import JobDetailsDialog from "@/components/JobDetailsDialog";
import { JobDetails } from "@/app/types";


export function JobBoard(props: { jobs: JobDetails[] }) {
    const { jobs } = props
    const [selectedJob, setSelectedJob] = useState<number | null>(null)
    const [open, setOpen] = useState(false)

    const handleRowClick = (index: number) => {
        setSelectedJob(index)
        setOpen(true)
    }

    return (
        <main>
            <JobList jobs={jobs} setSelectedJob={setSelectedJob} handleRowClick={handleRowClick} />
            {selectedJob ? <JobDetailsDialog job={jobs[selectedJob]} open={open} setOpen={setOpen} /> : null}
        </main>
    );
}