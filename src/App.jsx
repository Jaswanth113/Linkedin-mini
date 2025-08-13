import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { UserProfile } from './pages/UserProfile';
import { ErrorBoundary } from './components/ErrorBoundary';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function App() {
  return /*#__PURE__*/_jsx(ErrorBoundary, {
    children: /*#__PURE__*/_jsx(AuthProvider, {
      children: /*#__PURE__*/_jsx(Router, {
        children: /*#__PURE__*/_jsx("div", {
          className: "App",
          children: /*#__PURE__*/_jsxs(Routes, {
            children: [/*#__PURE__*/_jsx(Route, {
              path: "/login",
              element: /*#__PURE__*/_jsx(Login, {})
            }), /*#__PURE__*/_jsx(Route, {
              path: "/signup",
              element: /*#__PURE__*/_jsx(SignUp, {})
            }), /*#__PURE__*/_jsx(Route, {
              path: "/",
              element: /*#__PURE__*/_jsx(ProtectedRoute, {
                children: /*#__PURE__*/_jsx(Layout, {
                  children: /*#__PURE__*/_jsx(Home, {})
                })
              })
            }), /*#__PURE__*/_jsx(Route, {
              path: "/profile",
              element: /*#__PURE__*/_jsx(ProtectedRoute, {
                children: /*#__PURE__*/_jsx(Layout, {
                  children: /*#__PURE__*/_jsx(Profile, {})
                })
              })
            }), /*#__PURE__*/_jsx(Route, {
              path: "/user/:userId",
              element: /*#__PURE__*/_jsx(ProtectedRoute, {
                children: /*#__PURE__*/_jsx(Layout, {
                  children: /*#__PURE__*/_jsx(UserProfile, {})
                })
              })
            }), /*#__PURE__*/_jsx(Route, {
              path: "*",
              element: /*#__PURE__*/_jsx(Navigate, {
                to: "/"
              })
            })]
          })
        })
      })
    })
  });
}
export default App;