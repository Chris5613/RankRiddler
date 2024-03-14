// //Production
const root = 'https://rankriddler-test-backend.onrender.com';

// Development
// const root = 'http://localhost:3001';

const API = {
  BugSubmit: `${root}/form/bug`,
  ReportSubmit: `${root}/form/report`,
  GetAllUsers: `${root}/allusers`,
  SaveUser: `${root}/saveuser`,
  GetUserByUuid: `${root}/user`,
  UpdatePoints: `${root}/updatepoints`,
  GameSubmit: `${root}/form`,
  GetApexData: `${root}/form/apexdata`,
  GetFortniteData: `${root}/form/fortnitedata`,
  GetOverwatchData: `${root}/form/overwatchdata`,
  GetRainbowData: `${root}/form/rainbowdata`,
  GetValorantData: `${root}/form/valdata`,
  GetLeagueData: `${root}/form/leaguedata`,
  GetCsgoData: `${root}/form/csgodata`,
  GetRocketData: `${root}/form/rocketdata`,
};

export default API;
