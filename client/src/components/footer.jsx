import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="flex w-[100%] h-auto">
            <div className="backdrop-blur-lg bg-white/30 w-[100%]  border-black border rounded-md mt-6 mx-6 mb-2 p-4"> {/* Added padding */}
                <div className="flex flex-row justify-around mb-2  bg-[#d9d9d9] h-10">
                    <Link to='https://www.linkedin.com/in/adarshsingh05/'>
                        <div className="font-bold mt-2">Contact Us</div>
                    </Link>
                    <Link to='https://github.com/adarshsingh05/Freelancing-portal'>
                        <div className="font-bold mt-2">Contribute</div>
                    </Link>
                    <Link to='https://github.com/adarshsingh05/Freelancing-portal'>
                        <div className="font-bold mt-2">Suggest Us</div>
                    </Link>
                </div>
                <div className="text-center mb-4 text-md">
                    The site is currently in Development Mode, contribute to make it even better ❤️
                </div>
            </div>
        </div>
    );
}

export default Footer;
