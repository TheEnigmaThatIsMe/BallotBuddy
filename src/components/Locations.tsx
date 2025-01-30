import {CardContent, Collapse, List, ListItem, ListItemText, Typography} from "@mui/material";
import {Location} from "../types.ts";
import React from "react";
import { ExpandMore } from "@mui/icons-material";

interface LocationsProps {
    title: string;
    locations: [Location];
}

export const Locations: React.FC<LocationsProps> = ({ title, locations }) => {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <CardContent>
            <Typography variant="h5">{title} ({locations.length}) <ExpandMore onClick={handleExpandClick}></ExpandMore></Typography>
            <Collapse in={expanded} timeout="auto">
                <List>
                    {locations.map((location: Location, index: number) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={location.address.locationName}
                                secondary={`${location.address.line1}, ${location.address.city}, ${location.address.state} ${location.address.zip}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </CardContent>
    );
};