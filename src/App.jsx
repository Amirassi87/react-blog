import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "inter-ui/inter.css";

//pages
import ArticleDetails, {
  ArticleDetailsLoader,
} from "./articles/ArticleDetails";
import ArticlesList, { articlesListLoader } from "./articles/ArticlesList";
// import CreateArticle from "./pages/CreateArticle";
// import EditArticle from "./pages/EditArticle";
// import EditProfile from "./pages/EditProfile";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";

//layouts
import RootLayout from "./Layouts/RootLayout";
import ArticleError from "./articles/ArticleError";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        path="/articles"
        element={<ArticlesList />}
        loader={articlesListLoader}
        errorElement={<ArticleError />}
      />
      <Route
        path="/"
        element={<ArticlesList />}
        loader={articlesListLoader}
        errorElement={<ArticleError />}
      />
      {/* <Route path="/pages/SignIn" element={<SignIn />} />
      <Route path="/pages/SignUp" element={<SignUp />} />
      <Route path="/pages/EditProfile" element={<EditProfile />} /> */}

      {/* <Route path="/Layouts/ArticleLayout" element={<ArticleLayout />}> */}
      <Route
        path="articles/:slug"
        element={<ArticleDetails />}
        loader={ArticleDetailsLoader}
        errorElement={<ArticleError />}
      />
      {/* <Route path="/pages/CreateArticle" element={<CreateArticle />} />
        <Route path="/pages/EditArticle" element={<EditArticle />} /> */}
      {/* </Route> */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
