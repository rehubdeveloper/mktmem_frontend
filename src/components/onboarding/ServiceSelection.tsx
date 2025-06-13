import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, QrCode, MapPin, MessageSquare, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ServiceSelection: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, setSelectedServiceType } = useApp();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    {
      id: 'presence',
      name: 'Presence Marketing',
      description: 'Automated social media posting and content management',
      price: '$199/month',
      icon: Calendar,
      features: [
        'Scheduled social media posts',
        'Content calendar management',
        'Metricool integration',
        'AI-powered caption writing'
      ]
    },
    {
      id: 'qr',
      name: 'QR Code Placement',
      description: 'Place QR codes in short-term rentals to attract guests',
      price: 'Pay per placement',
      icon: QrCode,
      features: [
        'Competitive bidding system',
        'Target specific neighborhoods',
        'Real-time placement tracking',
        'Performance analytics'
      ]
    },
    {
      id: 'itinerary',
      name: 'Itinerary Inclusion',
      description: 'Get featured in curated guest experience bundles',
      price: 'Free (discount-based)',
      icon: MapPin,
      features: [
        'Curated experience packages',
        'Flexible discount settings',
        'Guest booking integration',
        'Revenue tracking'
      ]
    },
    {
      id: 'messaging',
      name: 'Messaging Center',
      description: 'SMS, email campaigns, and customer communications',
      price: '$99/month + usage',
      icon: MessageSquare,
      features: [
        'SMS & email campaigns',
        'Contact management',
        'Automated workflows',
        'Performance analytics'
      ]
    }
  ];

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContinue = () => {
    if (selectedServices.length === 0) return;

    const updatedUser = {
      ...user!,
      services: selectedServices.map(id => ({
        id: id as any,
        name: services.find(s => s.id === id)?.name || '',
        active: false,
      }))
    };
    setSelectedServiceType(selectedServices);
    setUser(updatedUser);
    navigate('/onboarding/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Marketing Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the services that best fit your restaurant's growth goals.
            You can always add or modify services later.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`relative bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 ${isSelected
                  ? 'ring-2 ring-orange-500 shadow-xl'
                  : 'shadow-lg hover:shadow-xl'
                  }`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full p-2">
                    <Check className="w-4 h-4" />
                  </div>
                )}

                <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6">
                  <Icon className="w-8 h-8 text-orange-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <p className="text-lg font-bold text-orange-600 mb-6">
                  {service.price}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 text-sm">
                      <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={selectedServices.length === 0}
            className={`px-12 py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${selectedServices.length > 0
              ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            Continue to Setup ({selectedServices.length} selected)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection;