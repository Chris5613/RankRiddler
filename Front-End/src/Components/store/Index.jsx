import { configureStore } from '@reduxjs/toolkit';
import csgoSlice from './CsgoSlice';
import leagueSlice from './LeagueSlice';
import valorantSlice from './ValorantSlice';
import settingsSlice from './SettingsSlice';
import submitSlice from './SubmitSlice';
import apexSlice from './ApexSlice';
import rainbowSlice from './RainbowSlice';
import fortniteSlice from './FortniteSlice';
import rocketSlice from './RocketSlice';
import overwatchSlice from './OverwatchSlice';
import multiplayerSlice from './MultiplayerSlice'

const store = configureStore({
  reducer: {
    csgo: csgoSlice.reducer,
    league: leagueSlice.reducer,
    valorant: valorantSlice.reducer,
    settings: settingsSlice.reducer,
    submit: submitSlice.reducer,
    apex: apexSlice.reducer,
    rainbow: rainbowSlice.reducer,
    fortnite: fortniteSlice.reducer,
    rocket: rocketSlice.reducer,
    overwatch: overwatchSlice.reducer,
    multiplayer: multiplayerSlice.reducer
  },
});

export default store;