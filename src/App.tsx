import { RouterProvider } from 'react-router'
import { router } from './router'
import { I18nProvider } from './i18n'

export default function App() {
  return (
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  )
}
