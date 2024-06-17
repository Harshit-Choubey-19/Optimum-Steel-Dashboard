import {CssBaseline,ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from 'theme';
import Dashboard from "scenes/Dashboard";
import Layout from 'scenes/Layout';
import Products from 'scenes/Products';
import Details from 'scenes/Details';
import appRoutes from 'routes/appRoutes';
import Buy from 'scenes/Buy';
import LoginPage from "scenes/loginPage";


function App() {
  const mode = useSelector((state) => state.appState.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
       <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
        <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <Layout /> : <Navigate to="/" />}
            />

         <Route element={<Layout />}>
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/products" element={<Products />} />
           {appRoutes.map((route, index) => {
             if (route.child) {
              return route.child.map((childRoute, childIndex) => (
               <Route key={childIndex} path={childRoute.path} element={childRoute.element} />
              ));
              }
              return <Route key={index} path={route.path} element={route.element} />;
            })}
            <Route path="/buy" element={<Buy />} />
         </Route>
        </Routes>
       </ThemeProvider>
      </BrowserRouter>
      
    
    </div>
  );
}

export default App;


