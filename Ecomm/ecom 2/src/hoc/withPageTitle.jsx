import { useEffect } from "react";

export default function withPageTitle(Component, title) {
  return function Wrapped(props) {
    useEffect(() => {
      const prev = document.title;
      document.title = title;
      return () => { document.title = prev; };
    }, []);
    return <Component {...props} />;
  };
}
