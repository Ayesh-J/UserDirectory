export default function FilterBar({ search, setSearch, gender, setGender }) {
  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-1/2 p-2 rounded-md bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="w-full sm:w-1/4 p-2 rounded-md bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      >
        <option value="" className="text-black">All Genders</option>
        <option value="male" className="text-black">Male</option>
        <option value="female" className="text-black">Female</option>
      </select>
    </div>
  );
}
