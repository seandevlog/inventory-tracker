import { useState } from "react";

import styles from "./navSub.module.css";

import StockSearch from "./stockSearch/stockSearch";
import {
  QuickActionList,
  RedirectList,
} from "./navSub.helper";

import useMediaQuery from "@hooks/useMediaQuery";

import {
  Dashboard,
  Users,
  Items,
  Suppliers,
  Locations,
  Orders,
  Transactions,
  Links as LinksSVG,
  QuickActions as QuickActionsSVG,
  ViewStock,
} from "@assets/navBot/";

const quickActions = [
  {
    name: "viewStock",
    Component: ViewStock,
    Action: StockSearch,
  },
];

const links = [
  { name: "dashboard", Component: Dashboard },
  { name: "users", Component: Users },
  { name: "items", Component: Items },
  { name: "locations", Component: Locations },
  { name: "suppliers", Component: Suppliers },
  { name: "orders", Component: Orders },
  { name: "transactions", Component: Transactions },
];

const NavSub = () => {
  const [isActionsShown, setIsActionsShown] = useState(false);

  const isMobile = useMediaQuery("(max-width: 767px)");

  if (isMobile) {
    return (
      <nav className={styles.navSub}>
        <ul className={styles.links}>
          <li className={styles.menuSwitcher}>
            <button
              type="button"
              className={styles.navControl}
              onClick={() =>
                setIsActionsShown((current) => !current)
              }
              aria-expanded={isActionsShown}
              aria-label={
                isActionsShown
                  ? "Show navigation links"
                  : "Show quick actions"
              }
            >
              {isActionsShown ? (
                <>
                  <LinksSVG />
                  <span>Links</span>
                </>
              ) : (
                <>
                  <QuickActionsSVG />
                  <span>Actions</span>
                </>
              )}
            </button>
          </li>

          {isActionsShown ? (
            <QuickActionList
              list={quickActions}
              classes={styles}
              showIcons
            />
          ) : (
            <RedirectList
              list={links}
              classes={styles}
              showIcons
            />
          )}
        </ul>
      </nav>
    );
  }

  return (
    <nav className={styles.navSub}>
      <ul className={styles.quickActions}>
        <QuickActionList
          list={quickActions}
          classes={styles}
        />
      </ul>

      <ul className={styles.links}>
        <RedirectList
          list={links}
          classes={styles}
        />
      </ul>
    </nav>
  );
};

export default NavSub;