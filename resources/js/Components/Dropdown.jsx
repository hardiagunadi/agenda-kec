import { Menu, Transition } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { Fragment } from "react";

function Dropdown({ children }) {
    return (
        <Menu>
            <div className="relative">{children}</div>
        </Menu>
    );
}

function Button({ children }) {
    return <Menu.Button>{children}</Menu.Button>;
}

function Items({
    align = "right",
    width = "48",
    contentClasses = "py-1 bg-white",
    children,
}) {
    let alignmentClasses = "origin-top";

    if (align === "left") {
        alignmentClasses = "origin-top-left left-0";
    } else if (align === "right") {
        alignmentClasses = "origin-top-right right-0";
    }

    let widthClasses = "";

    if (width === "48") {
        widthClasses = "w-48";
    }

    return (
        <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items
                className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
            >
                <div
                    className={
                        `rounded-md ring-1 ring-black ring-opacity-5 ` +
                        contentClasses
                    }
                >
                    {children}
                </div>
            </Menu.Items>
        </Transition>
    );
}

function Item({
    className = "",
    children,
    href = "/dashboard",
    disabled = false,
    method = "get",
}) {
    return (
        <Menu.Item disabled={disabled}>
            <Link
                className={`
                        block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out
                        ${disabled && " cursor-default"}
                        ${
                            !disabled &&
                            " hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        }
                        ${className && ` ${className}`}
                    `}
                href={!disabled && href}
                method={method}
                as="button"
            >
                {children}
            </Link>
        </Menu.Item>
    );
}

function Separator() {
    return <div className="border-b" />;
}

Dropdown.Button = Button;
Dropdown.Items = Items;
Dropdown.Item = Item;
Dropdown.Separator = Separator;

export default Dropdown;
