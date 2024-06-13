import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { JobDetails } from '@/app/types';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props: { job: JobDetails, open: boolean, setOpen: Function}) {
  const { job } = props

  const handleClose = () => {
    props.setOpen(false);
  }

  const handleApply = (link: string) => {
    window.open(job.application_link, "_blank")
  }

  return (
      <Dialog
        open={props.open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }}>
          {job.title} at {job.company}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              {job.description}
            </div>
            <div>
              {job.salary ? <p><strong>Salary:</strong> {job.salary}</p> : null}
            </div>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Button onClick={() => window.open(job.application_link, "_blank")}>Apply (Redirect)</Button>
        </DialogActions>
      </Dialog>
  )
}