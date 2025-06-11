import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';

function NamePrompt({ open, onClose, onSave }) {
    const [name, setName] = useState("");

    const handleSave = () => {
        onSave(name);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ 
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 300, bgcolor: 'background.paper', p: 4, borderRadius: '8px'
            }}>
                <Typography variant="h6">Enter Your Full Name</Typography>
                <TextField 
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>Save</Button>
            </Box>
        </Modal>
    );
}

export default NamePrompt;
