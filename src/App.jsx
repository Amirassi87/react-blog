import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import 'inter-ui/inter.css';
import './Modal/Modal.css';

//pages
import ArticleDetails, {
	ArticleDetailsLoader,
} from './articles/ArticleDetails';
import ArticlesList from './articles/ArticlesList';
import NewArticle from './articles/NewArticle';
import EditArticle, { ArticleLoader } from './articles/EditArticle';
import Modal from './Modal/Modal';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LogOut from './pages/LogOut';
import RootLayout from './Layouts/RootLayout';
import ArticleError from './articles/ArticleError';
import Loader from './articles/Loader';
import AuthContextProvider from './pages/AuthContextProvider';
import NotFound from './pages/NotFound';
import PrivateRoute from './pages/PrivateRoute';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />} errorElement={<ArticleError />}>
			<Route path="/loader" element={<Loader />} />
			<Route path="/articles" element={<ArticlesList />} />
			<Route path="/" element={<ArticlesList />} />
			<Route
				path="articles/:slug"
				element={<ArticleDetails />}
				loader={ArticleDetailsLoader}
			/>
			<Route
				path="/articles/new-article"
				element={
					<PrivateRoute>
						<NewArticle />
					</PrivateRoute>
				}
			/>
			<Route
				path="/articles/:slug/edit"
				element={
					<PrivateRoute>
						<EditArticle />
					</PrivateRoute>
				}
				loader={ArticleLoader}
			/>

			<Route path="/sign-in" element={<SignIn />} />
			<Route path="/sign-up" element={<SignUp />} />
			<Route path="/log-out" element={<LogOut />} />
			<Route
				path="/profile"
				element={
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				}
			/>
			<Route path="/modal" element={<Modal />} />
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

function App() {
	return (
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	);
}

export default App;
