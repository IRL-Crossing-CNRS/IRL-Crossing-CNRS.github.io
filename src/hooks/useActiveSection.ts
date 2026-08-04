import { useEffect, useState } from 'react';

const SCROLL_OFFSET = 140;
const BOTTOM_THRESHOLD = 4;

export function useActiveSection(ids: string[]): string | undefined {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let ticking = false;

    const computeActive = () => {
      ticking = false;

      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - BOTTOM_THRESHOLD;
      if (scrolledToBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }

      const activationLine = window.scrollY + SCROLL_OFFSET;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= activationLine) {
          current = id;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(computeActive);
      }
    };

    computeActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return active;
}
