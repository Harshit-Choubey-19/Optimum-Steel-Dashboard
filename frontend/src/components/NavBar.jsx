import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import avatar from "../images/avatar.png";

const NavBar = () => {
  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      // Redirect to login page
      toast.success("Loged out successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Failed to log out!");
    },
  });

  const handleClick = () => {
    logoutMutation();
  };

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 left-0 w-full z-50">
      <div className="flex-1">
        <Link className="text-2xl mr-2" to={"/"}>
          <h1 className="font-bold">
            Optimum&nbsp;<span className="text-blue-500 font-bold">Steels</span>
          </h1>
        </Link>
      </div>
      <div className="flex-none gap-5">
        <Link className="max-[739px]:hidden">
          <button className="btn btn-outline btn-lg">Auction</button>
        </Link>
        <Link className="max-[739px]:hidden">
          <button className="btn btn-outline btn-lg">News</button>
        </Link>
        <Link className={`${authUser ? "hidden" : "block"}`} to={"/login"}>
          <button className="btn btn-outline btn-info btn-lg">Login</button>
        </Link>
        <div className={`${authUser?.role === "admin" ? "block" : "hidden"}`}>
          <Link to={"/admin"} className="max-[535px]:hidden">
            <span className="badge badge-neutral badge-lg">
              <b>Go to Admin Dashboard</b>
            </span>
          </Link>
        </div>
        <div className={`dropdown dropdown-end ${authUser ? "" : "hidden"}`}>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={authUser?.profileImg ? authUser?.profileImg : avatar}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href={`/profile/${authUser?._id}`} className="justify-between">
                Profile&nbsp;
                <span className="badge badge-neutral">{authUser?.role}</span>
              </a>
            </li>
            {authUser?.role === "admin" && (
              <li className="min-[535px]:hidden">
                <a href="/admin">Admin Dahboard</a>
              </li>
            )}
            <li className="min-[740px]:hidden">
              <a>Auction</a>
            </li>
            <li className="min-[740px]:hidden">
              <a>News</a>
            </li>
            <li>
              <button onClick={handleClick}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
