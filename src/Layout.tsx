import { NavLink, Outlet, useMatch } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faQuestionCircle, faEdit } from "@fortawesome/free-solid-svg-icons";

const items = [
  {
    label: <NavLink to="/">Play Game</NavLink>,
    key: '/',
    icon: <FontAwesomeIcon icon={faDice} className="mr-2" />,
  },
  {
    label: <NavLink to="/about">How to Play</NavLink>,
    key: '/about',
    icon: <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />,
  },
  {
    label: <NavLink to="/create">Create Game</NavLink>,
    key: '/create',
    icon: <FontAwesomeIcon icon={faEdit} className="mr-2" />
  },
];

export default function Layout() {
  return (
    <div className="bg-gray-100 h-screen overflow-scroll">
      <div className="flex flex-row w-screen gap-16 justify-center content-center bg-white">
        {items.map(item => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const isActive = useMatch(item.key)
          const activeStyles = isActive
            ? "text-emerald-500 border-b-2 pb-3"
            : "hover:text-emerald-500 hover:border-b-2 hover:pb-3";

          return (
            <div key={item.key} className={`p-4 border-emerald-500 border-solid ${activeStyles}`}>
              {item.icon}{item.label}
            </div>
          )
        })}
      </div>
      <Outlet />
    </div>
  );
};
