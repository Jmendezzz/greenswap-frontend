import { Outlet, useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/UserContext';
import { ROUTES } from '@/constants/routes';
import { useEffect } from 'react';

function ProtectedRoute() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate(ROUTES.login);
    }
  }, [user, navigate]);

  return user ? <Outlet /> : null;
}

export default ProtectedRoute;
