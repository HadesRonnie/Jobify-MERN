import { useDashboardContext } from '../pages/DashboardLayout';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { role } = user;
        const { text, path, icon } = link;
        if (path === 'admin' && role !== 'admin') return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
