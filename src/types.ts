export type ElectionResponse = {
    "kind": "civicinfo#electionsQueryResponse",
    "elections": [Election]
}

export type Election = {
    "id": number, // The unique ID of this election.
    "name": string, // A displayable name for the election.
    "electionDay": string, // Day of the election in YYYY-MM-DD format.
    "ocdDivisionId": string // The political division of the election. Represented as an OCD Division ID. Voters within these political jurisdictions are covered by this election. This is typically a state such as ocd-division/country:us/state:ca or for the midterms or general election the entire US (i.e. ocd-division/country:us).
}

export type Address = {
    "locationName": string,
    "line1": string,
    "line2": string,
    "line3": string,
    "city": string,
    "state": string,
    "zip": string
}

export type Location = {
    "address": Address,
    "notes": string,
    "pollingHours": string,
    "name": string,
    "voterServices": string,
    "startDate": string,
    "endDate": string,
    "latitude": number,
    "longitude": number,
    "sources": [Source]
}

export type Candidate = {
    "name": string,
    "party": string,
    "candidateUrl": string,
    "phone": string,
    "photoUrl": string,
    "email": string,
    "orderOnBallot": number,
    "channels": [
        {
            "type": string,
            "id": string
        }
    ]
}

export type ElectionOfficial = {
    "name": string,
    "title": string,
    "officePhoneNumber": string,
    "faxNumber": string,
    "emailAddress": string
}

export type Contest = {
    "type": string,
    "primaryParty": string,
    "electorateSpecifications": string,
    "special": string,
    "ballotTitle": string,
    "office": string,
    "level": [
        string
    ],
    "roles": [
        string
    ],
    "district": {
        "name": string,
        "scope": string,
        "id": string
    },
    "numberElected": number,
    "numberVotingFor": number,
    "ballotPlacement": number,
    "candidates": [Candidate],
    "referendumTitle": string,
    "referendumSubtitle": string,
    "referendumUrl": string,
    "referendumBrief": string,
    "referendumText": string,
    "referendumProStatement": string,
    "referendumConStatement": string,
    "referendumPassageThreshold": string,
    "referendumEffectOfAbstain": string,
    "referendumBallotResponses": [
        string
    ],
    "sources": [Source]
}

export type Source = {
    "name": string,
    "official": boolean
}

export type AdministrationRegion = {
    "electionAdministrationBody": ElectionAdministrationBody,
    "name": string,
    "sources": [Source],
}

export type ElectionAdministrationBody = {
    "name": string,
    "electionInfoUrl": string,
    "electionRegistrationUrl": string,
    "electionRegistrationConfirmationUrl": string,
    "electionNoticeText": string,
    "electionNoticeUrl": string,
    "absenteeVotingInfoUrl": string,
    "votingLocationFinderUrl": string,
    "ballotInfoUrl": string,
    "electionRulesUrl": string,
    "voter_services": [
        string
    ],
    "hoursOfOperation": string,
    "correspondenceAddress": Address,
    "physicalAddress": Address,
    "electionOfficials": [ElectionOfficial],
}

export type State = {
    "name": string,
    "electionAdministrationBody": ElectionAdministrationBody,
    "local_jurisdiction": AdministrationRegion,
    "sources": [Source]
}

// https://developers.google.com/civic-information/docs/v2/elections/voterInfoQuery
export type VoterInfo = {
    "kind": "civicinfo#voterInfoResponse",
    "election": Election,
    "otherElections": [Election],
    "normalizedInput": Address,
    "pollingLocations": [Location],
    "earlyVoteSites": [Location],
    "dropOffLocations": [Location],
    "contests": [Contest],
    "state": [State],
    "mailOnly": boolean
}