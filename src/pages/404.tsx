import { useNavigate } from 'react-router';
import ErrorComponent from '../components/Error/Error';

export default function NotFound(): JSX.Element {
  const navigate = useNavigate();
  return <ErrorComponent status="404" callBack={() => navigate(-1)} />;
}
