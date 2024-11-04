import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RankingComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://testing-reviseit-1.onrender.com/api/auth/alluser");
                if (response.data.success) {
                    const sortedUsers = response.data.users.sort((a, b) => b.coins - a.coins);
                    setUsers(sortedUsers);
                }
                setLoading(false);
            } catch (error) {
                console.log("Error fetching users:", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner or loader
    }

    // Extract the top user
    const topUser = users[0];

    return (
        <div className="hidden md:block  flex-col items-center bg-white shadow-lg rounded-lg p-6 max-w-md ml-5">
            <h2 className='mb-2 text-center text-black text-xl'>Coins Leader Board</h2>            {/* Top User Display */}
            {topUser && (
                <div className="flex flex-col items-center rounded-sm py-3 rounded-b-full w-full h-auto bg-slate-500 mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 border-4 border-white shadow-lg flex items-center justify-center">
                        {/* Display the first letter in red */}
                        <h2 className="text-red-500 text-6xl font-bold">{topUser.name.charAt(0)}</h2>
                    </div>
                    <span className="text-white text-lg font-bold">{topUser.name}</span>
                    
                    <span className="text-white text-xl flex flex-row">
                    <img className='h-7 w-7 mt-1 mr-1' src='/golden.png'></img>
                        {topUser.coins}</span>
                </div>
            )}
            {/* Users List */}
            <hr />
            <div className='h-[1.7px] w-full bg-black'></div>
            <div className="w-full">
                {users.slice(1).map((user) => (
                    <div key={user._id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <span className="text-gray-800 text-lg">{user.name}</span>
                      
                        <span className="font-bold text-xl flex flex-row">
                        <img className='h-7 w-7 mt-1 mr-1' src='/golden.png'></img>
                        {user.coins}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RankingComponent;
