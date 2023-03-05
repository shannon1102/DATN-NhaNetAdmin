import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { productColumns,postColumns, userColumns, depositColumns } from "./datatablesource";
import NewProduct from "./pages/newProduct/NewProduct";
import NewPost from "./pages/newPost/NewPost";
import SingleUser from "./pages/single/user/SigleUser";
import PostMedia from "./pages/single/post/PostMedia";
import SinglePost from "./pages/single/post/SinglePost";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <SingleUser/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Thêm mới người dùng" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={productColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewProduct  />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="deposits">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={depositColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":depositId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom  />
                  </ProtectedRoute>
                }
              /> */}
            </Route>
            <Route path="posts">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={postColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":postId"
                element={
                  <ProtectedRoute>
                    <SinglePost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewPost  />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
