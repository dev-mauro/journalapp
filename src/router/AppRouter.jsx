import { Routes, Route, Navigate } from "react-router-dom"
import { AuthRoutes } from '../auth'
import { useCheckAuthStatus } from "../hooks"
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from "../ui"

const AppRouter = () => {

  const { status } = useCheckAuthStatus();
  if(status === 'checking') return <CheckingAuth />

  return (
    <Routes>

      {
        (status === 'authenticated')
          ? <Route path="/*" element={ <JournalRoutes /> }/>
          : <Route path="/auth/*" element={ <AuthRoutes /> }/>
      }

      <Route path="/*" element={ <Navigate to="/auth/login" /> }/>

    </Routes>
  )
}

export { AppRouter }
