import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './AuthContext';
import { UsersProvider } from './UsersContext';
import { ModulesProvider } from './ModulesContext';
import { ClassesProvider } from './ClassesContext';
import { ExamsProvider } from './ExamsContext';
import { ResultsProvider } from './ResultsContext';
import { AbsencesProvider } from './AbsencesContext';
import { EventsProvider } from './EventsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AuthProvider>
    <UsersProvider>
      <ModulesProvider>
        <ClassesProvider>
          <ExamsProvider>
            <ResultsProvider>
              <AbsencesProvider>
                <EventsProvider>
                  <App />
                </EventsProvider>
              </AbsencesProvider>
            </ResultsProvider>
          </ExamsProvider>
        </ClassesProvider>
      </ModulesProvider>
    </UsersProvider>
  </AuthProvider>

);

