import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import { AuthProvider, useAuth } from './components/Auth/Auth';
import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';

// Route Authentication
function AuthRoute({ element, ...rest }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
}

// Customized Theme
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(128, 128, 228)',
    },
  },
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <AuthRoute element={<Dashboard />} />
                }
              />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
