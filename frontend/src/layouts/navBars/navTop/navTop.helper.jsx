import { useContext } from 'react';

import Logo from '@assets/logo/logo';
import RedirectLink from '@components/redirect/redirect';

import AppContext from '@contexts/app.context';

import firstCharUppercase from '@utils/firstCharUppercase';

import config from '@config';
const { path } = config;

const NavContext = ({
  id, pathname, givenName, profile, handleLogout, styles, onLinkClick
}) => {
  const { currPageRef } = useContext(AppContext);

  const handleLogo = () => {
    if (onLinkClick) onLinkClick();
    currPageRef.current.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <RedirectLink 
        url={path.root}
        onClick={handleLogo}
      >
        <Logo classes={styles[`${id}Logo`]}/>
      </RedirectLink>
      <ul className={styles[`${id}Links`]}>
          <li onClick={onLinkClick}>
            {pathname.includes('profile') ? 
              <RedirectLink 
                url={path.manage.absolute} 
                classes={styles[`${id}Text`]}
              >
                Manage
              </RedirectLink> : 
              <RedirectLink 
                url={(givenName && firstCharUppercase(givenName)) ? path.profile.absolute : path.auth.absolute} 
                classes={styles[`${id}Text`]}
              >
                {(givenName && firstCharUppercase(givenName)) || 'Sign in'}
              </RedirectLink>
            }
          </li>
          <li onClick={onLinkClick ?? undefined}>
            <RedirectLink 
              url={path.faq.absolute}
              classes={styles[`${id}Text`]}
            >
              FAQ
            </RedirectLink>
          </li>
          {typeof profile !== 'undefined' && profile !== null &&
            <li
              onClick={handleLogout ?? undefined}
            >
              <RedirectLink
                classes={styles[`${id}Text`]}
              >
                Logout
              </RedirectLink>
            </li>
          }
      </ul>
    </>
  )
}

export default NavContext;