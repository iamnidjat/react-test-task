import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CardListPage from "../pages/CardListPage";
import CardDetailPage from "../pages/cardDetailPage/CardDetailPage";
import NotFoundPage from "../components/notFoundComponent/NotFoundPage";

const RouteNavigator = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<CardListPage />} />
          <Route path="/cards/:id" element={<CardDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </Router>
  );
};

export default RouteNavigator;