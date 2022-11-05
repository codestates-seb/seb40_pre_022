import { Navigate } from "react-router-dom";

function PrivateRoute({ auth, component: Component }) {
  return auth ? (
    Component
  ) : (
    <Navigate to='/members/login' {...alert("로그인이 필요합니다!")}></Navigate>
  );
}

export default PrivateRoute;
