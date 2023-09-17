import { useSelector } from 'react-redux';

export default function HideIfNotAdmin({ children }) {
  const user = useSelector((state) => state.user);

  if (user.role!="admin") {
    return <></>;
  }
  return children;
}
