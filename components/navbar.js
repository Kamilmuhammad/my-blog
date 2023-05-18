import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useStore } from "@/store/state";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function Navbar() {
  const { data, loading, getNews } = useStore((state) => state);
  //   const newPost = data.filter((post) => post.title == search);
  const dropdownList = [
    { text: "Internet", path: "/" },
    { text: "Books", path: "/" },
    { text: "Open Source", path: "/" },
    { text: "Crate Post", path: "/create-new-post" },
  ];
  const [dropdown, setDropdown] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [search, setSearch] = useState(false);
  const { data: session, status } = useSession();
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  function logouts() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      iconHtml: "?",
      width: 350,
      showCancelButton: true,
      confirmButtonColor: "#000110",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    router.push(`/search/${searchText}`);
    setSearch(!search);
  }
  return (
    <>
      <nav className="flex py-4 items-center justify-between  ">
        <div
          className={`fixed bg-gray-900/90 h-screen w-full lg:hidden duration-500 ease-linear ${
            hamburger ? "left-0 top-0" : " left-full top-full"
          }`}
        >
          <button
            className="py-11 px-4 text-2xl"
            onClick={() => setHamburger(!hamburger)}
          >
            X
          </button>
          <ul className="text-2xl py-20 px-16 space-y-6">
            <li>
              <Link href={"/post"} className="hover:underline">
                Ui Design
              </Link>
            </li>
            <li>
              <Link href={"/"} className="hover:underline">
                Front-end
              </Link>
            </li>
            <li>
              <Link href={"/"} className="hover:underline">
                Back-end
              </Link>
            </li>
            <li
              className="relative hover:underline"
              onClick={() => setDropdown(!dropdown)}
            >
              <div className="flex cursor-pointer">
                <p>Lainnya </p>
                <svg
                  className="w-3 self-center ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  ></path>
                </svg>
              </div>
              {dropdown && (
                <ul
                  className={`mt-2 bg-gray-800 w-36 flex-col flex rounded bg-opacity-80 absolute`}
                >
                  {dropdownList.map(({ text, path }) => (
                    <li
                      key={text}
                      className="border-b border-white/5 py-1 hover:underline px-4 hover:bg-gray-700 rounded last:border-none"
                    >
                      <Link href={path}>{text}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div
          className="w-2/12 lg:hidden"
          onClick={() => setHamburger(!hamburger)}
        >
          <button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.4">
                <path
                  d="M3 12H21"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6H21"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 18H21"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
        </div>
        <div className="flex items-center  lg:w-2/12 w-8/12 justify-center">
          <div className="bg-gray-600 w-10 h-10 flex items-center justify-center rounded mr-3">
            {" "}
            E
          </div>
          <Link href={"/"}>Epictetus</Link>
        </div>

        <ul className="lg:flex gap-8  hidden items-center w-8/12 ml-24  ">
          <li>
            <Link href={"/post"} className="hover:underline">
              Ui Design
            </Link>
          </li>
          <li>
            <Link href={"/"} className="hover:underline">
              Front-end
            </Link>
          </li>
          <li>
            <Link href={"/"} className="hover:underline">
              Back-end
            </Link>
          </li>
          <li
            className="relative hover:underline"
            onClick={() => setDropdown(!dropdown)}
          >
            <div className="flex cursor-pointer">
              Lainnya{" "}
              <svg
                className="w-3 self-center ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                ></path>
              </svg>
            </div>
            {dropdown && (
              <ul
                className={`mt-2 bg-gray-800 w-36 flex-col flex rounded bg-opacity-80 absolute`}
              >
                {dropdownList.map(({ text, path }) => (
                  <li
                    key={text}
                    className="border-b border-white/5 py-1 hover:underline px-4 hover:bg-gray-700 rounded last:border-none"
                  >
                    <Link href={path}>{text}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
        <div className="w-3/12 text-end hidden lg:block">
          <form
            action=""
            className="bg-gray-800 flex p-2 rounded-full"
            onSubmit={(e) => handleSubmit(e)}
          >
            <button className="w-4 mr-2 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                ></path>
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
        </div>

        <div className="w-2/12 mt-2 text-end lg:hidden">
          <button className="w-6 text-white" onClick={() => setSearch(!search)}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={`lg:hidden fixed py-2 bg-gray-900 px-4 rounded duration-500 ease-linear ${
            !search ? "-right-full" : "right-[20%] md:right-[35%]"
          }
                    }`}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none "
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
        </div>

        {status === "authenticated" ? (
          <p
            className={`pl-2 cursor-pointer hover:underline`}
            onClick={() => logouts()}
          >
            logout&nbsp;!
          </p>
        ) : (
          <Link href="/login" className={`pl-2`}>
            Login / signup
          </Link>
        )}
      </nav>
    </>
  );
}

export default Navbar;
