import { useEffect, useMemo, useState } from "react";
import { useFetchers, useNavigation } from "react-router-dom";
import styles from './loading.module.css';

const Loading = () => {
  const navigation = useNavigation();
  const fetchers = useFetchers();

  const isPending = useMemo(() => {
    const navBusy = navigation.state !== "idle";
    const fetcherBusy = fetchers.some((f) => f.state !== "idle");
    return navBusy || fetcherBusy;
  }, [navigation.state, fetchers]);

  const [show, setShow] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    let t1, t2;

    if (isPending) {
      t1 = setTimeout(() => setShow(true), 250);
      t2 = setTimeout(() => setSlow(true), 1500);
    } else {
      setShow(false);
      setSlow(false);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isPending]);

  if (!show) return null;

  return (
    <div
      className={styles.loading}
      role="status"
      aria-live="polite"
    >
      <span className={styles.circle}/>
      <div className={styles.text}>
        {!slow ? (
          <div>Loading…</div>
        ) : (
          <>
            <div>Waking up the server…</div>
            <div className={styles.message}>
              Free-tier cold starts can take up to ~60 seconds.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Loading;