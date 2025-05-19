import { NavLink, Outlet, useMatch } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faQuestionCircle, faEdit } from "@fortawesome/free-solid-svg-icons";

const items = [
  {
    label: "Play Game",
    to: '/',
    icon: <FontAwesomeIcon icon={faDice} className="mr-2" />,
  },
  {
    label: "How to Play",
    to: '/about',
    icon: <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />,
  },
  {
    label: "Create Game",
    to: '/create',
    icon: <FontAwesomeIcon icon={faEdit} className="mr-2" />
  },
];

export default function Layout() {
  return (
    <div className="bg-gray-100 h-screen overflow-scroll">
      <div className="flex flex-row w-screen gap-16 justify-center content-center bg-white">
        {items.map(item => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const isActive = useMatch(item.to)
          const activeStyles = isActive
            ? "text-emerald-500 border-b-2 pb-3"
            : "hover:text-emerald-500 hover:border-b-2 hover:pb-3";

          return (
            <NavLink key={item.to} to={item.to} className={`block p-4 border-emerald-500 border-solid ${activeStyles}`}>
              {item.icon}{item.label}
            </NavLink>
          )
        })}
      </div>
      <Outlet />
    </div>
  );
};
