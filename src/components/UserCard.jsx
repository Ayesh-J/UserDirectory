

export default function UserCard({ user, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg cursor-pointer transition-transform hover:scale-105 hover:shadow-xl border border-white/10 text-white"
    >
      <div className="flex items-center space-x-4">
        <img
          src={user.picture.large}
          alt="avatar"
          className="w-16 h-16 rounded-full border-2 border-white/20 shadow-sm"
        />
        <div>
          <h2 className="text-lg font-semibold text-white">
            {user.name.first} {user.name.last}
          </h2>
          <p className="text-sm text-blue-200">{user.location.country}</p>
          <p className="text-sm text-cyan-400">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
