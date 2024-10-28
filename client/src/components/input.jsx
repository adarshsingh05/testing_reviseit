const Input = ({ icon: Icon, ...props }) => {
    return (
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className="w-5 h-5 text-green-500" />
            </div>
            <input
                className="w-[300px] pl-10 pr-3 py-2 bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 transition duration-200"
                {...props}
            />
        </div>
    );
};

export default Input;
