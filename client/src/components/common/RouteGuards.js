import { useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ItemContext } from "../../contexts/ItemContext";

export const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const NonPrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export const ItemOwner = ({ children }) => {
  const { selectItem } = useContext(ItemContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const { itemId } = useParams();

  const currentItem = selectItem(itemId);

  if (isAuthenticated && user._id !== currentItem._ownerId) {
    return <Navigate to='/catalog' replace />
  }

  return children ? children : <Outlet />;
};

// export const ItemOwner = () => {
//   const { selectItem } = useContext(ItemContext);
//   const { user, isAuthenticated } = useContext(AuthContext);
//   const { itemId } = useParams();

//   const currentItem = selectItem(itemId);

//   return (isAuthenticated && user._id !== currentItem._ownerId) ? <Outlet /> : <Navigate to="/catalog" replace />;
// };