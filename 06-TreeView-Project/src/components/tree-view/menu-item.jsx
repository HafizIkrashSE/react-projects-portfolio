import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import MenuList from "./menu-list";

export default function MenuItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = item.children?.length > 0;

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <li>
      <div className="menu-item">
        <p>{item.label}</p>

        {hasChildren && (
          <span onClick={handleToggle}>
            {isOpen ? (
              <FaMinus size={18} />
            ) : (
              <FaPlus size={18} />
            )}
          </span>
        )}
      </div>

      {hasChildren && isOpen && (
        <MenuList list={item.children} />
      )}
    </li>
  );
}