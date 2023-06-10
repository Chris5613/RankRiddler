//Production
const root = 'https://rr-back-end.onrender.com';

//Development
// const root = 'http://localhost:3001';

const API = {
    ValorantSubmit: `${root}/form/val`,
    LeagueSubmit: `${root}/form/league`,
    CsgoSubmit: `${root}/form/csgo`,
    GetValorantData: `${root}/form/valdata`,
    GetLeagueData: `${root}/form/leaguedata`,
    GetCsgoData: `${root}/form/csgodata`,
    BugSubmit: `${root}/form/bug`,
    ReportSubmit: `${root}/form/report`,
    GetAllUsers: `${root}/allusers`,
    GetUserByUsername: `${root}/user`,
    SaveUser: `${root}/saveuser`,
    GetUserByUuid: `${root}/user`,
    UpdatePoints: `${root}/updatepoints`,
    GameSubmit: `${root}/form`,
    MultiplayerWon: `${root}/multiplayerwon`, // Needs username in body
    MultiplayerLost: `${root}/multiplayerlost`, // Needs username in body
}

export default API;