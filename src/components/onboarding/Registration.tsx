import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Building, MapPin, Phone, Utensils } from 'lucide-react';

export default function RegistrationPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    interface FormDataType {
        username: string;
        email: string;
        password: string;
        password2: string;
        business_name: string;
        business_type: string;
        business_address: string;
        phone_number: string;
        first_name: string;
        last_name: string;
        service_types: string[];
    }

    const [formData, setFormData] = useState<FormDataType>({
        username: '',
        email: '',
        password: '',
        password2: '',
        business_name: '',
        business_type: 'restaurant',
        business_address: '',
        phone_number: '',
        first_name: '',
        last_name: '',
        service_types: []
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setFormData((prev: FormDataType) => ({
            ...prev,
            [name]: value
        }));
    };

    type ServiceType = 'presence' | 'qr' | 'messaging';

    const handleServiceTypeChange = (service: ServiceType): void => {
        setFormData((prev: FormDataType) => ({
            ...prev,
            service_types: prev.service_types.includes(service)
                ? prev.service_types.filter((s: string) => s !== service)
                : [...prev.service_types, service]
        }));
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Join Our Platform</h1>
                    <p className="text-gray-600 text-lg">Create your account and start growing your business</p>
                </div>

                {/* Registration Form */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
                    <div className="space-y-6">

                        {/* Personal Information Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <User className="w-5 h-5 text-orange-500" />
                                Personal Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="John"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Username</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="business_owner"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="owner@business.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword2 ? "text" : "password"}
                                            name="password2"
                                            value={formData.password2}
                                            onChange={handleInputChange}
                                            className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword2(!showPassword2)}
                                            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword2 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Information Section */}
                        <div className="space-y-4 pt-6 border-t border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <Building className="w-5 h-5 text-blue-500" />
                                Business Information
                            </h2>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Business Name</label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="business_name"
                                        value={formData.business_name}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="My Business"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Business Type</label>
                                <select
                                    name="business_type"
                                    value={formData.business_type}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                >
                                    <option value="restaurant">Restaurant</option>
                                    <option value="cafe">Cafe</option>
                                    <option value="bar">Bar</option>
                                    <option value="food_truck">Food Truck</option>
                                    <option value="catering">Catering</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Business Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="business_address"
                                        value={formData.business_address}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="123 Main St, Memphis, TN"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="901-555-0123"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Service Types Section */}
                        <div className="space-y-4 pt-6 border-t border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Service Types</h2>
                            <p className="text-sm text-gray-600">Select the services you want to offer</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { id: 'presence' as ServiceType, label: 'Online Presence', desc: 'Digital storefront' },
                                    { id: 'qr' as ServiceType, label: 'QR Menu', desc: 'Contactless ordering' },
                                    { id: 'messaging' as ServiceType, label: 'Customer Messaging', desc: 'Direct communication' }
                                ].map((service) => (
                                    <div
                                        key={service.id}
                                        onClick={() => handleServiceTypeChange(service.id)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${formData.service_types.includes(service.id)
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-200 bg-white/50 hover:border-orange-200'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-4 h-4 rounded-full border-2 ${formData.service_types.includes(service.id)
                                                ? 'border-orange-500 bg-orange-500'
                                                : 'border-gray-300'
                                                }`}>
                                                {formData.service_types.includes(service.id) && (
                                                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{service.label}</p>
                                                <p className="text-xs text-gray-600">{service.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-orange-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Create My Account
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="text-center pt-4">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                                    Sign in here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}