import React from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";
import {VoterInfo} from "../types.ts";
import {Locations} from "../components/Locations.tsx";

interface VoterInfoPageProps {
    voterInfo: VoterInfo;
}

const VoterInfoPage: React.FC<VoterInfoPageProps> = ({ voterInfo }) => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Voter Information
            </Typography>
            <Card>
                <CardContent>
                    {voterInfo.pollingLocations ? (<Locations title={"Polling Locations"} locations={voterInfo.pollingLocations} />) : (<></>)}
                </CardContent>
                <CardContent>
                    {voterInfo.earlyVoteSites ? (<Locations title={"Early Vote Sites"} locations={voterInfo.earlyVoteSites} />) : (<></>)}
                </CardContent>
                <CardContent>
                    {voterInfo.dropOffLocations ? (<Locations title={"Drop Off Locations"} locations={voterInfo.dropOffLocations} />) : (<></>)}
                </CardContent>
            </Card>
        </Container>
    );
};

export default VoterInfoPage;