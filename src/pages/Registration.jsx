import { useState } from "react";
import { useNavigate } from "react-router-dom";

const resourcesList = [
    "Ambulances",
    "Rescue Boats",
    "Helicopters",
    "Trucks",
    "Rescue Personnel",
    "Medical Staff",
    "Food Supplies",
    "Water Supplies",
];

const Registration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        agencyName: "",
        representativeName: "",
        agencyEmail: "",
        representativePhone: "",
        agencyAddress: "",
        city: "",
        state: "",
        password: "",
        confirmPassword: "",
        resourcesOffered: "",
        resources: {},
        documents: {
            registrationProof: null,
            idProof: null,
            authorizationLetter: null,
        },
    });

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            documents: {
                ...prev.documents,
                [type]: file,
            },
        }));
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleResourceChange = (resource, count) => {
        setFormData((prev) => ({
            ...prev,
            resources: {
                ...prev.resources,
                [resource]: count,
            },
        }));
    };

    const handleCheckboxChange = (resource, checked) => {
        if (checked) {
            setFormData((prev) => ({
                ...prev,
                resources: {
                    ...prev.resources,
                    [resource]: 1,
                },
            }));
        } else {
            const updated = { ...formData.resources };
            delete updated[resource];
            setFormData((prev) => ({
                ...prev,
                resources: updated,
            }));
        }
    };

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Final Data:", formData);
        alert("Registration submitted!");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <header className="w-full shadow flex items-center justify-between px-8 py-4">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center">
                        <span className="text-lg font-bold">RescueConnect</span>
                    </div>
                    <div className="flex gap-3 items-center">
                        <nav className="hidden md:flex gap-6 text-gray-700">
                            <a href="/" className="hover:text-blue-500">Home</a>
                            <a href="/" className="hover:text-blue-500">About</a>
                            <a href="/" className="hover:text-blue-500">Contact</a>
                        </nav>
                        <button
                            onClick={() => navigate("/")} // <-- this navigates to login
                            className="bg-blue-500 text-white px-6 py-2 rounded-2xl font-semibold hover:scale-102 cursor-pointer"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </header>
            <main className="w-full max-w-md py-12 px-4">
                <h1 className="text-2xl font-bold text-center mb-8">Register Your Agency</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {step === 1 && (
                        <>
                            <div>
                                <label className="block mb-1 ml-2">Agency Name</label>
                                <input
                                    type="text"
                                    name="agencyName"
                                    value={formData.agencyName}
                                    onChange={handleChange}
                                    className="w-full border border-black/20 focus:outline-1 rounded-2xl p-2"
                                    placeholder="Enter agency name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 ml-2">Email</label>
                                <input
                                    type="email"
                                    name="agencyEmail"
                                    value={formData.agencyEmail}
                                    onChange={handleChange}
                                    className="w-full border border-black/20 focus:outline-1 rounded-2xl p-2"
                                    placeholder="Enter agency Email ID"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 ml-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border border-black/20 focus:outline-1 rounded-2xl p-2"
                                    placeholder="Create a strong password"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 ml-2">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full border border-black/20 focus:outline-1 rounded-2xl p-2"
                                    placeholder="Re-enter your password"
                                    required
                                />
                            </div>

                            <button
                                type="button"
                                className="bg-blue-500 hover:scale-102 hover:bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-2xl"
                                onClick={() => {
                                    if (formData.password !== formData.confirmPassword) {
                                        alert("Passwords do not match!");
                                    }
                                    else if (formData.agencyName == "" || formData.agencyEmail == "" || formData.confirmPassword == "" || formData.password == "") {
                                        alert("Please fill all the fields");
                                    }

                                    else {
                                        handleNext();
                                    }
                                }}
                            >
                                Next →
                            </button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div>
                                <h2 className="text-xl font-bold mb-4">Step 2: Details Entry</h2>
                                <p className="text-gray-600 mb-2">Please fill all the fields below</p>
                                <label className="block mb-1 ml-2">Representative Name</label>
                                <input
                                    type="text"
                                    name="representativeName"
                                    value={formData.representativeName}
                                    onChange={handleChange}
                                    className="w-full border border-black/20 focus:outline-1 rounded-2xl p-2"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 ml-2">Representative Phone</label>
                                <input
                                    type="tel"
                                    name="representativePhone"
                                    value={formData.representativePhone}
                                    onChange={handleChange}
                                    className="w-full border border-black/20 focus:outline-1 rounded-2xl p-2"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 ml-2">Agency Address</label>
                                <input
                                    type="text"
                                    name="agencyAddress"
                                    value={formData.agencyAddress}
                                    onChange={handleChange}
                                    className="w-full border border-black/20 focus:outline-1 rounded-2xl p-2"
                                    placeholder="Enter agency address"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 ml-2">Operating City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full border border-black/20 focus:outline-1 rounded-2xl p-2"
                                    placeholder="Enter operating city"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 ml-2">Operating State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full border border-black/20 focus:outline-1 rounded-2xl p-2"
                                    placeholder="Enter operating state"
                                    required
                                />
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="bg-gray-400 hover:bg-gray-500 hover:scale-102 text-white px-6 py-2 rounded-2xl cursor-pointer"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="bg-blue-500 hover:scale-102 hover:bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-2xl"
                                >
                                    Next →
                                </button>
                            </div>


                        </>
                    )}


                    {step === 3 && (
                        <>
                            <div>
                                <h2 className="text-xl font-bold mb-4">Step 3: Select Resources offered</h2>
                                <p className="text-gray-600 mb-2">Select and specify the different resources offered by your agency</p>
                                {resourcesList.map((resource) => (
                                    <div key={resource} className="mt-5 ml-4 text-lg">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={formData.resources.hasOwnProperty(resource)}
                                                onChange={(e) =>
                                                    handleCheckboxChange(resource, e.target.checked)
                                                }
                                            />
                                            {resource}
                                        </label>
                                        {formData.resources.hasOwnProperty(resource) && (
                                            <input
                                                type="number"
                                                min="1"
                                                value={formData.resources[resource]}
                                                className="outline outline-black/20 rounded-2xl text-center ml-3 w-15"
                                                onChange={(e) =>
                                                    handleResourceChange(resource, parseInt(e.target.value, 10))
                                                }
                                            />
                                        )}
                                    </div>
                                ))}
                                <div className="flex justify-between mt-5">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="bg-gray-400 hover:bg-gray-500 hover:scale-102 text-white px-6 py-2 rounded-2xl cursor-pointer"
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="bg-blue-500 hover:scale-102 hover:bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-2xl"
                                    >
                                        Next →
                                    </button>
                                </div>
                            </div>


                        </>
                    )}

                    {step === 4 && (
                        <>
                            <div>
                                <h2 className="text-xl font-bold mb-4">Step 4: Upload Verification Documents</h2>
                                <p className="text-gray-600 mb-4">Please upload the following required documents:</p>

                                {/* Registration Proof */}
                                <div className="mb-4">
                                    <label className="block mb-2 font-medium">Registration Proof (PDF/Image)</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileChange(e, "registrationProof")}
                                        className="w-full border border-black/20 rounded-2xl p-2 cursor-pointer"
                                        required
                                    />
                                    {formData.documents.registrationProof && (
                                        <p className="mt-1 text-sm text-green-600">
                                            ✅ {formData.documents.registrationProof.name} uploaded
                                        </p>
                                    )}
                                </div>

                                {/* ID Proof */}
                                <div className="mb-4">
                                    <label className="block mb-2 font-medium">ID Proof (PDF/Image)</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileChange(e, "idProof")}
                                        className="w-full border border-black/20 rounded-2xl p-2 cursor-pointer"
                                        required
                                    />
                                    {formData.documents.idProof && (
                                        <p className="mt-1 text-sm text-green-600">
                                            ✅ {formData.documents.idProof.name} uploaded
                                        </p>
                                    )}
                                </div>

                                {/* Authorization Letter */}
                                <div className="mb-4">
                                    <label className="block mb-2 font-medium">Authorization Letter (PDF/Image)</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileChange(e, "authorizationLetter")}
                                        className="w-full border border-black/20 rounded-2xl p-2 cursor-pointer"
                                        required
                                    />
                                    {formData.documents.authorizationLetter && (
                                        <p className="mt-1 text-sm text-green-600">
                                            ✅ {formData.documents.authorizationLetter.name} uploaded
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="bg-gray-400 hover:bg-gray-500 hover:scale-102 text-white px-6 py-2 rounded-2xl cursor-pointer"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:scale-102 hover:bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-2xl"
                                >
                                    Submit
                                </button>
                            </div>
                        </>
                    )}


                </form>
            </main>
        </div>
    )
}

export default Registration
