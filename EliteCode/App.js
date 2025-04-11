import * as React from 'react';
import * as eva from '@eva-design/eva';
import AppNavigator from './AppNavigator';
import { AuthProvider } from './AuthContext';
import { enableScreens } from 'react-native-screens';
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
enableScreens();
export default function App() {

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </ApplicationProvider>
    </>
  )
}