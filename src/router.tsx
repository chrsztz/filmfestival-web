import { createBrowserRouter } from 'react-router'
import RootLayout from './components/layout/RootLayout'
import HomePage from './pages/HomePage'
import ConceptPage from './pages/ConceptPage'
import GuestsPage from './pages/GuestsPage'
import SubmissionsPage from './pages/SubmissionsPage'
import NewsPage from './pages/NewsPage'
import CinemaPage from './pages/CinemaPage'
import HallOfFamePage from './pages/HallOfFamePage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/concept', element: <ConceptPage /> },
      { path: '/guests', element: <GuestsPage /> },
      { path: '/submissions', element: <SubmissionsPage /> },
      { path: '/news', element: <NewsPage /> },
      { path: '/cinema', element: <CinemaPage /> },
      { path: '/hall-of-fame', element: <HallOfFamePage /> },
    ],
  },
])
