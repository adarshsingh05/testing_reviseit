const Input = ({ icon: Icon, iconColor = "text-green-500", className = "", ...props }) => {
    return (
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <input
                className={`w-[300px] pl-10 pr-3 py-2 bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-300 rounded-lg focus:border-[#ff664e] focus:ring-2 focus:ring-[#ff664e] transition duration-200 ${className}`}
                {...props}
            />
        </div>
    );
};

export default Input;
