import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'

import Home from './pages/Home.jsx'
import ResearchAreas from './pages/ResearchAreas.jsx'
import People from './pages/People.jsx'
import PersonDetail from './pages/PersonDetail.jsx'
import Publications from './pages/Publications.jsx'
import Datasets from './pages/Datasets.jsx'
import News from './pages/News.jsx'
import Products from './pages/Products.jsx'
import Collaborators from './pages/Collaborators.jsx'
import Contact from './pages/Contact.jsx'
import DroughtMonitor from './pages/DroughtMonitor.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/research-areas" element={<ResearchAreas />} />
        <Route path="/research-areas/:slug" element={<ResearchAreas />} />
        <Route path="/people" element={<People />} />
        <Route path="/people/:slug" element={<PersonDetail />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/news" element={<News />} />
        <Route path="/products" element={<Products />} />
        <Route path="/collaborators" element={<Collaborators />} />
        <Route path="/drought-monitor" element={<DroughtMonitor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
