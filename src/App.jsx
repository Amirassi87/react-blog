import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import 'inter-ui/inter.css';

//pages
import ArticleDetails, {
	ArticleDetailsLoader,
} from './articles/ArticleDetails';
import ArticlesList from './articles/ArticlesList';
// import CreateArticle from "./pages/CreateArticle";
// import EditArticle from "./pages/EditArticle";

import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LogOut from './pages/LogOut';
import RootLayout from './Layouts/RootLayout';
import ArticleError from './articles/ArticleError';
import Loader from './articles/Loader';
import AuthContextProvider from './pages/AuthContextProvider';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />} errorElement={<ArticleError />}>
			<Route path="/loader" element={<Loader />} />
			<Route path="/articles" element={<ArticlesList />} />
			<Route path="/" element={<ArticlesList />} />
			<Route path="/pages/sign-in" element={<SignIn />} />
			<Route path="/pages/sign-up" element={<SignUp />} />
			<Route path="/pages/log-out" element={<LogOut />} />
			<Route path="/pages/profile" element={<Profile />} />

			<Route
				path="articles/:slug"
				element={<ArticleDetails />}
				loader={ArticleDetailsLoader}
			/>
			{/* <Route path="/pages/CreateArticle" element={<CreateArticle />} />
        <Route path="/pages/EditArticle" element={<EditArticle />} /> */}
			{/* </Route> */}
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

function App() {
	return (
		<AuthContextProvider>
			<RouterProvider router={router} />;
		</AuthContextProvider>
	);
}

export default App;
