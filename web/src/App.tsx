import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Dashboard from 'Components/Dashboard';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'Store';
import { BASE_URL } from 'Config';

const client = new ApolloClient({
  uri: BASE_URL
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Dashboard />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  )
}

export default App;