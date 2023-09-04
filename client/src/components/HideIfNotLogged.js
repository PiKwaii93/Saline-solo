import { useSelector } from 'react-redux';

export default function HideIfNotLogged({ children }) {
  const user = useSelector((state) => state.user);

  if (!user.token) {
    return <></>;
  }
  return children;
}
