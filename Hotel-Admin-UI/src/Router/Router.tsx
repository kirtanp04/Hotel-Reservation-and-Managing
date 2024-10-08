import { ElementType, Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import LoadingPage from "src/components/LoadingPage";
import AuthGaurd from "src/guard/AuthGaurd";
import LoginGaurd from "src/guard/LoginGaurd";
// import LoadingPage from "../components/LoadingPage";

const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Component {...props} />
    </Suspense>
  );
};

const Login = Loadable(lazy(() => import("src/pages/Authentication/Login")));
const Layout = Loadable(lazy(() => import("src/layout/SideMenu"))); // side menu
const PropertyList = Loadable(
  lazy(() => import("src/pages/Property/PropertyList"))
);
const PropertyViewer = Loadable(
  lazy(() => import("src/pages/Property/PropertyViewer"))
);
const BookingList = Loadable(
  lazy(() => import("src/pages/Booking/BookingList"))
);
const JobList = Loadable(lazy(() => import("src/pages/Job/JobList")));
const BookingDetails = Loadable(
  lazy(() => import("src/pages/Booking/BookingDetails"))
);
const RoomList = Loadable(lazy(() => import("src/pages/room/RoomList")));
const Dashboard = Loadable(lazy(() => import("src/pages/Dashboard/Dashboard")));
const Errorlogs = Loadable(lazy(() => import("src/pages/ErrorLogs/Errorlogs")));
const ChatViewer = Loadable(lazy(() => import("src/pages/Chat/ChatViewer")));
const ReviewList = Loadable(lazy(() => import("src/pages/Review/ReviewList")));
const EmailVerification = Loadable(
  lazy(() => import("src/pages/Authentication/EmailVerification"))
);
const SignUp = Loadable(
  lazy(() => import("src/pages/Authentication/Register"))
);

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          path: "",
          element: (
            <LoginGaurd>
              <Login />
            </LoginGaurd>
          ),
          index: true,
        },
        { path: "register", element: <SignUp /> },
        { path: "about", element: <>About</> },
        { path: "contact", element: <>About</> },
        {
          path: ":username/email/verification/:token",
          element: (
            <LoginGaurd>
              <EmailVerification />
            </LoginGaurd>
          ),
        },
      ],
    },

    {
      path: "swiftstay",
      element: (
        <AuthGaurd>
          <Layout />
        </AuthGaurd>
      ),
      children: [
        {
          element: <Navigate to="/swiftstay/dashboard" replace />,
          index: true,
        },
        { path: "dashboard", element: <Dashboard /> },
        {
          path: "properties",
          element: <Outlet />,
          children: [
            {
              element: <PropertyList />,
              index: true,
            },
            {
              path: ":property",
              element: <PropertyViewer />,
            },
          ],
        },
        { path: "rooms", element: <RoomList /> },
        {
          path: "bookings",
          element: <Outlet />,
          children: [
            {
              element: <BookingList />,
              index: true,
            },
            {
              path: ":userName/bookingdetails/:bookingID",
              element: <BookingDetails />,
            },
          ],
        },
        {
          path: "jobs",
          element: <Outlet />,
          children: [
            {
              element: <JobList />,
              index: true,
            },
          ],
        },
        { path: "reviews", element: <ReviewList /> },
        { path: "errorlogs", element: <Errorlogs /> },
        { path: "chats", element: <ChatViewer /> },
      ],
    },
  ]);
}
