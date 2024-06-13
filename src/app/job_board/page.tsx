'use client'
import JobList from "@/components/JobList";
import NavBar from "@/components/NavBar";
import { useContext, useEffect, useState } from "react";
import JobDetailsDialog from "@/components/JobDetailsDialog";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";




export default function JobBoard() {
    const [selectedJob, setSelectedJob] = useState<number | null>(null)
    const [jobs, setJobs] = useState<Object[] | null>(null)

    const [open, setOpen] = useState(false)

    useEffect(() => {
        let unsubscribed = false;
      
        getDocs(collection(db, "jobs"))
          .then((querySnapshot) => {
            if (unsubscribed) return; // unsubscribed? do nothing.
            
            const newUserDataArray = querySnapshot.docs
              .map((doc) => ({ ...doc.data(), id: doc.id }));
      
            setJobs(newUserDataArray);
          })
          .catch((err) => {
            if (unsubscribed) return; // unsubscribed? do nothing.
      
            // TODO: Handle errors
            console.error("Failed to retrieve data", err);
          });
      
        return () => { unsubscribed = true; };
      }, []);


    const handleRowClick = (index: number) => {
        console.log(`Row ${index} clicked`)
        setSelectedJob(index)
        setOpen(true)
    }

    return (
        <main>
            <NavBar />
            Heading Content Here
            <JobList jobs={jobs} setSelectedJob={setSelectedJob} handleRowClick={handleRowClick} />
            {selectedJob ? <JobDetailsDialog job={jobs[selectedJob]} open={open} setOpen={setOpen} /> : null}
        </main>
    );
}