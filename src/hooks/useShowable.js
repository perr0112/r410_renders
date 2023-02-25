import { useState } from "react";

export default function useShowable(shown, baseClassName = "") {
  const [isShown, setIsShown] = useState(shown);
  const toggleShown = () => {
    setIsShown(isShown);
  };
  return {
    isShown,
    toggleShown,
    setIsShown,
    className: isShown ? `${baseClassName}` : `${baseClassName} shown`,
  };
}
