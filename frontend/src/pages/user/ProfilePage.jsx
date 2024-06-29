import React, { useEffect, useState } from "react";
import "daisyui/dist/full.css";

import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import LoadingSpinner from "../../common/LoadingSpinner";
import avatar from "../../images/avatar.png";

import { useQuery } from "@tanstack/react-query";
import { formatMemberSinceDate } from "../../utils/date";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(false);

  const { data: user } = useQuery({ queryKey: ["authUser"] });
  const { updateProfile, isUpdatingProfile } = useUpdateUserProfile();

  const [profile, setProfile] = useState({
    profileImg: "",
    fullName: "",
    currentPassword: "",
    newPassword: "",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          profileImg: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = () => {
    setShow(!show);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(profile);
  };

  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName,
        newPassword: "",
        currentPassword: "",
      });
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <div className="max-w-screen-md mx-auto flex h-full px-2 mt-8 mb-24">
        <div className="flex-1 flex flex-col justify-center items-center bg-base-100 shadow-xl mb-5">
          <div className="card-body">
            <div className="flex items-center mb-5">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img
                    src={user?.profileImg ? user?.profileImg : avatar}
                    alt="Profile"
                  />
                </div>
              </div>
              <div className="ml-4">
                <h2 className="card-title">{user?.fullName}</h2>
                <span className="badge badge-neutral mt-2 p-4">
                  {user.role}
                </span>
                <p>{user?.email}</p>
                <p>
                  Joined at:&nbsp;
                  <span className="text-slate-500">
                    {formatMemberSinceDate(user?.createdAt)}
                  </span>
                </p>
                <button
                  className="btn btn-outline btn-primary mt-2"
                  onClick={handleEditToggle}
                >
                  {isUpdatingProfile ? "Editing.." : "Edit"}
                </button>
              </div>
            </div>
            {isEditing && (
              <form
                className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col"
                onSubmit={handleSubmit}
              >
                <div className="form-control mt-2">
                  Full Name
                  <label className="input input-bordered rounded flex items-center gap-2">
                    <input
                      type="text"
                      name="fullName"
                      value={profile?.fullName}
                      onChange={handleChange}
                      className="grow"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">Change Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="file-input file-input-bordered"
                  />
                </div>
                <div className="form-control mt-2">
                  <label className="input input-bordered rounded flex items-center gap-2">
                    <input
                      type={show ? "text" : "password"}
                      name="currentPassword"
                      placeholder="Current Password"
                      value={profile.currentPassword}
                      onChange={handleChange}
                      className="grow"
                    />
                  </label>
                </div>
                <div className="form-control mt-2">
                  <label className="input input-bordered rounded flex items-center gap-2">
                    <input
                      type={show ? "text" : "password"}
                      name="newPassword"
                      placeholder="New Password"
                      value={profile.newPassword}
                      onChange={handleChange}
                      className="grow"
                    />
                  </label>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Show Password</span>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={handleCheckboxChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="form-control mt-4">
                  <button className="btn rounded-full btn-success text-white">
                    {isUpdatingProfile ? <LoadingSpinner /> : "Save"}
                  </button>
                  <button
                    className="btn btn-ghost rounded-full mt-2"
                    onClick={handleEditToggle}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
