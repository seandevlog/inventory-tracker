import { useContext } from "react";

import Logo from "@assets/logo/logo";
import RedirectLink from "@components/ui/redirect/redirect";

import AppContext from "@contexts/app.context";

import firstCharUppercase from "@utils/firstCharUppercase";

import config from "@config";

const { path } = config;

const NavContent = ({
  id,
  pathname,
  profile,
  handleLogout,
  styles,
  onLinkClick,
}) => {
  const { currPageRef } = useContext(AppContext);

  const displayName = profile?.givenName
    ? firstCharUppercase(profile.givenName)
    : null;

  const isProfilePage = pathname.includes("profile");

  const handleLogoClick = () => {
    onLinkClick?.();

    currPageRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <RedirectLink
        url={path.root}
        onClick={handleLogoClick}
      >
        <Logo classes={styles[`${id}Logo`]} />
      </RedirectLink>

      <ul className={styles[`${id}Links`]}>
        <li>
          <RedirectLink
            url={
              isProfilePage
                ? path.manage.absolute
                : displayName
                  ? path.profile.absolute
                  : path.auth.absolute
            }
            classes={styles[`${id}Text`]}
            onClick={onLinkClick}
          >
            {isProfilePage
              ? "Manage"
              : displayName || "Sign in"}
          </RedirectLink>
        </li>

        <li>
          <RedirectLink
            url={path.faq.absolute}
            classes={styles[`${id}Text`]}
            onClick={onLinkClick}
          >
            FAQ
          </RedirectLink>
        </li>

        {profile && (
          <li
            onClick={handleLogout ?? undefined}
          >
            <RedirectLink
              classes={styles[`${id}Text`]}
            >
              Logout
            </RedirectLink>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavContent;