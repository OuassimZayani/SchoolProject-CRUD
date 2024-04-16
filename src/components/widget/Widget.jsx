import "./widget.scss";
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QuizIcon from '@mui/icons-material/Quiz';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { useModules } from '../../ModulesContext';
import { useClasses } from '../../ClassesContext';
import { useExams } from '../../ExamsContext';
import { useResults } from '../../ResultsContext';

const Widget = ({ type }) => {
  const { calculateModulesNumber } = useModules();
  const { calculateClassesNumber } = useClasses();
  const { calculateExamsNumber } = useExams();
  const { calculateResultsNumber } = useResults();


  let data;
  let count;

  // Define the variables within the component
  const modulesNumber = calculateModulesNumber();
  const classesNumber = calculateClassesNumber();
  const examsNumber = calculateExamsNumber();
  const resultsNumber = calculateResultsNumber();

  switch (type) {
    case "module":
      data = {
        title: "MODULES",
        link: "See all modules",
        icon: (
          <SchoolIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      count = modulesNumber;
      break;
    case "class":
      data = {
        title: "CLASSES",
        link: "View all classes",
        icon: (
          <AccessTimeIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      count = classesNumber;
      break;
    case "exam":
      data = {
        title: "EXAMS",
        link: "View all exams",
        icon: (
          <QuizIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      count = examsNumber;
      break;
    case "result":
      data = {
        title: "RESULTS",
        link: "See all results",
        icon: (
          <InsertChartIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      count = resultsNumber;
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{count}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
