import { useState, useEffect } from "react";

/**
 * This simple hook makes it easy to share && render components, logic, styling, etc. through the use of media queries from your JSX code.
 *
 * Example usage:
 * import useMediaQuery from "./utils/useMediaQuery";
 * const isDesktop = useMediaQuery('(min-width: 960px)');
 *
 * Source: https://fireship.io/snippets/use-media-query-hook/
 */

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;
