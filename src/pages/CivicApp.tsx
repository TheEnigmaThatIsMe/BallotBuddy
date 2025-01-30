import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import {Election, VoterInfo} from "../types.ts";
import VoterInfoPage from "./VoterInfoPage.tsx";

// Test Address 340 Main St, Venice, CA 90291

const API_KEY = "";
const API_VERSION = "v2";
const BASE_URL = `https://www.googleapis.com/civicinfo/${API_VERSION}`;
const ELECTION_API_URL = `${BASE_URL}/elections`;
const VOTER_INFO_API_URL = `${BASE_URL}/voterinfo`;

const CivicApp: React.FC = () => {
    const [elections, setElections] = useState<Election[]>([]);
    const [voterInfo, setVoterInfo] = useState<VoterInfo>();
    const [open, setOpen] = useState(false);
    const [selectedElection, setSelectedElection] = useState<Election>();
    const [address, setAddress] = useState("");

    useEffect(() => {
        fetch(`${ELECTION_API_URL}?key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.elections) {
                    setElections(data.elections);
                }
            })
            .catch((error) => console.error("Error fetching elections:", error));
    }, []);

    const handleElectionClick = (election: Election) => {
        setSelectedElection(election);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAddress("");
    };

    const fetchVoterInfo = () => {
        console.log("Fetching voter info for:", address, "Election ID:", selectedElection?.id);
        fetch(`${VOTER_INFO_API_URL}?key=${API_KEY}&address=${address}&electionId=${selectedElection?.id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Voter Info:", data);
                setVoterInfo(data);
            })
            .catch((error) => console.error("Error fetching voter info:", error));
    };

    const handleSubmit = () => {
        fetchVoterInfo();
        handleClose();
    };

    if (voterInfo) {
        return <VoterInfoPage voterInfo={voterInfo} />;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Ballot Buddy
            </Typography>
            <Card>
                <CardContent>
                    <Typography variant="h6">Choose an Election</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Election</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {elections.map((election: Election) => (
                                <TableRow key={election.id}>
                                    <TableCell>{election.name}</TableCell>
                                    <TableCell>{election.electionDay}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => handleElectionClick(election)}>
                                            Enter Address
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Your Address</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CivicApp;