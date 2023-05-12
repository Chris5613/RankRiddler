import { configureStore } from '@reduxjs/toolkit';
import csgoSlice from './CsgoSlice';
import leagueSlice from './LeagueSlice';
import valorantSlice from './ValorantSlice';
import navSlice from './NavSlice';
import bugSlice from './BugSlice';
import leaderboardSlice from './LeaderboardSlice';
import settingsSlice from './SettingsSlice';
import submitSlice from './SubmitSlice';

const store = configureStore({
  reducer: {
    csgo: csgoSlice.reducer,
    league: leagueSlice.reducer,
    nav: navSlice.reducer,
    valorant: valorantSlice.reducer,
    bug: bugSlice.reducer,
    leaderboard: leaderboardSlice.reducer,
    settings: settingsSlice.reducer,
    submit: submitSlice.reducer,
  },
});

export default store;
