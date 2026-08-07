import { useLogout, useMenu, usePermissions } from "@refinedev/core";
import { NavLink } from "react-router";

const RESOURCE_ICONS: Record<string, string> = {
  events: "📅",
  team_members: "👥",
  news: "📰",
  leads: "📊",
  gallery: "🖼️",
  projects: "🚀",
  profiles: "👤",
  divisions: "🏢",
  core_values: "⭐",
  about_content: "📝",
  timeline_events: "🕐",
};

export const Menu = () => {
  const { mutate: logout } = useLogout();
  const { menuItems } = useMenu();
  const { data: role } = usePermissions({});

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.name === "profiles") {
      return role === "superadmin";
    }
    return true;
  });

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">🛸</div>
        <div>
          <div className="sidebar-logo-text">SEDS KDU</div>
          <div className="sidebar-logo-sub">Admin Panel</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar-section">
        <div className="sidebar-section-label">Navigation</div>
        <ul className="sidebar-nav">
          {filteredMenuItems.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.route ?? "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span className="nav-icon">
                  {RESOURCE_ICONS[item.name] ?? "📁"}
                </span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={() => logout()}>
          <span className="nav-icon">🚪</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
};
