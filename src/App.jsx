//importing necessary react hooks
import { useEffect, useState, useRef } from "react";
import UserCard from "./components/UserCard";
import UserModal from "./components/UserModal";
import FilterBar from "./components/FilterBar";


// main app component
export default function App() {

  const [users, setUsers] = useState([]); //this state holds user data in array
  const [displayedUsers, setDisplayedUsers] = useState([]);//this state will display the users recieving them from users 
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const observer = useRef(); // i have used observer so that the user keep loading as you go down

  const fetchUsers = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`https://randomuser.me/api/?results=20&page=${pageNum}`);
      const data = await res.json();
      setUsers((prev) => [...prev, ...data.results]);
      setDisplayedUsers((prev) => [...prev, ...data.results]);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  useEffect(() => {
    if (!search && !gender) {
      setDisplayedUsers(users);
    } else {
      const filtered = users.filter((user) => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
        return (
          fullName.includes(search.toLowerCase()) &&
          (gender ? user.gender === gender : true)
        );
      });
      setDisplayedUsers(filtered);
    }
  }, [search, gender, users]);

  // Infinite scroll hook
  const lastUserRef = useRef();
  useEffect(() => {
    const observerInstance = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (lastUserRef.current) observerInstance.observe(lastUserRef.current);
    return () => {
      if (lastUserRef.current) observerInstance.unobserve(lastUserRef.current);
    };
  }, [displayedUsers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4 text-white">
      <h1 className="text-4xl font-extrabold text-center mb-2 text-cyan-400 drop-shadow-lg">User Directory</h1>
      <h6 className="text-center text-sm text-white/70 mb-6">By Ayesh Jamadar</h6>

      <FilterBar
        search={search}
        setSearch={setSearch}
        gender={gender}
        setGender={setGender}
      />

      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="grid gap-6 mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {displayedUsers.map((user, idx) => (
          <div
            key={user.login.uuid}
            ref={idx === displayedUsers.length - 1 ? lastUserRef : null}
          >
            <UserCard user={user} onClick={() => setSelectedUser(user)} />
          </div>
        ))}
      </div>

      {loading && <p className="text-center mt-4">Loading more users...</p>}

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}