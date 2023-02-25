import { useEffect, useState } from "react";

let previousId = 0;
const rendersNumbers = [];

export default function useRendersNumber() {
  const [id, setId] = useState(0);
  useEffect(() => {
    previousId += 1;
    setId(previousId);
    rendersNumbers[previousId] = 0;
    return (
      (i) => () =>
        delete rendersNumbers[i]
    )(previousId);
  }, []);
  rendersNumbers[id] += 1;

  return rendersNumbers[id];
}
