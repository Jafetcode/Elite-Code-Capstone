import { registerRootComponent } from 'expo';
import {server} from './API/server';
import App from './App';

serve({
    fetch: App.fetch,
    port
})
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
