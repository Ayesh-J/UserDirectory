import { useEffect, useRef } from "react";

export default function UserModal({ user, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white/10 backdrop-blur-xl text-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative border border-white/20 animate-fadeIn"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white/70 hover:text-red-400 text-2xl font-bold"
        >
          &times;
        </button>

        <img
          src={user.picture.large}
          alt="Profile"
          className="w-28 h-28 mx-auto rounded-full border-4 border-white/20 mb-4 shadow-md"
        />

        <h2 className="text-center text-2xl font-bold mb-1">
          {user.name.first} {user.name.last}
        </h2>

        <p className="text-center text-white/70 text-sm mb-2">
          {user.location.city}, {user.location.country}
        </p>

        <div className="text-center space-y-1 mt-4 text-sm">
          <p>Email: <span className="text-white/90">{user.email}</span></p>
          <p>Phone: <span className="text-white/90">{user.phone}</span></p>
          <p>DOB: <span className="text-white/90">{new Date(user.dob.date).toLocaleDateString()}</span></p>
        </div>
      </div>
    </div>
  );
}
