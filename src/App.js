import React from 'react';
import { App, Panel, View } from 'framework7-react'
import routes from './routes'

import AuthProvider from './auth-provider'

const app = () => {
  const f7params = {
    id: 'io.framework7.dokaneh', 
    name: 'دكانة نت', 
    theme: 'ios',
    routes,
  }
  return (
    <AuthProvider>
     <App params={f7params}>
        <Panel right reveal themeDark>
          <View url="/panel/"/>
        </Panel>
        <View id="main-view" url="/" main className="safe-areas"/>
      </App>
    </AuthProvider>
  );
}

export default app;
