import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
    const criteria = [
        { label: "At least 6 characters", met: password.length >= 6 },
        { label: "Contain uppercase letter", met: /[A-Z]/.test(password) },
        { label: "Contain lowercase letter", met: /[a-z]/.test(password) },
        { label: "Contain a number", met: /\d/.test(password) },
    ];

    return (
        <div className="mt-4 space-y-2">
            {criteria.map((item) => (
                <div key={item.label} className="flex items-center text-sm">
                    {item.met ? (
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                    ) : (
                        <X className="w-4 h-4 text-gray-400 mr-2" />
                    )}
                    <span className={item.met ? 'text-green-600' : 'text-red-500'}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

const PasswordStrengthMeter = ({ password }) => {
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 6) strength++;
        if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
        if (/\d/.test(pass)) strength++;
        return strength;
    };

    const getBarColor = (strength) => {
        if (strength === 0) return "bg-red-500";
        if (strength === 1) return "bg-red-400";
        if (strength === 2) return "bg-yellow-500";
        return "bg-green-500";
    };

    const strength = getStrength(password);

    const getStrengthText = (strength) => {
        if (strength === 0) return "Very Weak";
        if (strength === 1) return "Weak";
        if (strength === 2) return "Fair";
        if (strength === 3) return "Good";
        return "Strong";
    };

    return (
        <div className="mt-4">
            <div className="flex justify-between items-center mb-2 text-black">
                <span>Password Strength:</span>
                <span className={`text-sm ${getBarColor(strength).replace("bg-", "text-")}`}>{getStrengthText(strength)}</span>
            </div>

            <div className="flex space-x-1 mb-4">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-1/3 rounded-full transition-colors duration-300 
                            ${index < strength ? getBarColor(strength) : "bg-slate-400"}`}
                    />
                ))}
            </div>
            <PasswordCriteria password={password} />
        </div>
    );
};

export default PasswordStrengthMeter;
