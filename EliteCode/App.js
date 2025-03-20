import * as React from 'react';
import * as eva from '@eva-design/eva';
import AppNavigator from './AppNavigator';
import { AuthProvider } from './AuthContext';
import { ApplicationProvider} from '@ui-kitten/components';

export default function App() {
  return (
    <>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </ApplicationProvider>
    </>
  )
}