import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import AdminLayout from '../components/AdminLayout'
import Home from '../pages/Home'
import Features from '../pages/Features'
import Technology from '../pages/Technology'
import About from '../pages/About'
import Dashboard from '../pages/Dashboard'
import NewAssessment from '../pages/NewAssessment'
import EEGDataManagement from '../pages/EEGDataManagement'
import Report from '../pages/Report'
import GroupAnalytics from '../pages/GroupAnalytics'
import ModelTraining from '../pages/ModelTraining'
import SystemSettings from '../pages/SystemSettings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'features', element: <Features /> },
      { path: 'technology', element: <Technology /> },
      { path: 'about', element: <About /> },
      {
        element: <AdminLayout />,
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'new-assessment', element: <NewAssessment /> },
          { path: 'eeg-data', element: <EEGDataManagement /> },
          { path: 'report', element: <Report /> },
          { path: 'group-analytics', element: <GroupAnalytics /> },
          { path: 'model-training', element: <ModelTraining /> },
          { path: 'settings', element: <SystemSettings /> },
        ],
      },
    ],
  },
])
