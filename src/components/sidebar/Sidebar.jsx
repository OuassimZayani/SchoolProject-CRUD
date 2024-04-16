import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Import the useAuth hook


const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Access the logout function from the authentication context

  const handleLogout = () => {
    logout(); // Call the logout function when the logout button is clicked
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">Tech University</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">PAGES</p>
          <Link to="/modules" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>Modules</span>
            </li>
          </Link>
          <Link to="/classes" style={{ textDecoration: "none" }}>
            <li>
              <AccessTimeIcon className="icon" />
              <span>Classes</span>
            </li>
          </Link>
          <Link to="/exams" style={{ textDecoration: "none" }}>
            <li>
                <QuizIcon className="icon" />
                <span>Exams</span>
            </li>
          </Link>
          <Link to="/results" style={{ textDecoration: "none" }}>
            <li>
                <InsertChartIcon className="icon" />
                <span>Results</span>
            </li>
          </Link>
          <Link to="/absences" style={{ textDecoration: "none" }}>
            <li>
                <CancelIcon className="icon" />
                <span>Absence tallies</span>
            </li>
          </Link>
          <Link to="/events" style={{ textDecoration: "none" }}>
            <li>
                <NotificationsNoneIcon className="icon" />
                <span>Events</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
                <AccountCircleOutlinedIcon className="icon" />
                <span>Profile</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;