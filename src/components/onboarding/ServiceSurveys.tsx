import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Upload, Calendar, QrCode, MapPin, MessageSquare, Sparkles, Users, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SurveyResponse {
  [key: string]: any;
}

const ServiceSurveys: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, updateService } = useApp();
  const [currentSurvey, setCurrentSurvey] = useState(0);
  const [surveyResponses, setSurveyResponses] = useState<Record<string, SurveyResponse>>({});

  const surveys = user?.services || [];

  const updateResponse = (serviceId: string, key: string, value: any) => {
    setSurveyResponses(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [key]: value
      }
    }));
  };

  const renderPresenceSurvey = () => {
    const serviceId = 'presence';
    const responses = surveyResponses[serviceId] || {};

    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-3 mb-8">
          <Calendar className="w-8 h-8 text-orange-600" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Presence Marketing Setup</h2>
            <p className="text-gray-600">Help us understand your brand and content preferences</p>
          </div>
        </div>

        {/* Brand Personality */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            What's your restaurant's personality?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'Funny & Playful', 'Classy & Elegant', 'Bold & Edgy', 'Family-Friendly',
              'Trendy & Hip', 'Traditional & Authentic', 'Cozy & Intimate', 'Energetic & Vibrant'
            ].map(personality => (
              <label key={personality} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-orange-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-orange-600"
                  checked={responses.personalities?.includes(personality) || false}
                  onChange={(e) => {
                    const current = responses.personalities || [];
                    const updated = e.target.checked 
                      ? [...current, personality]
                      : current.filter((p: string) => p !== personality);
                    updateResponse(serviceId, 'personalities', updated);
                  }}
                />
                <span className="text-sm font-medium">{personality}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Content Types */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            What kinds of content do you already have?
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { type: 'Food Photos', desc: 'High-quality dish photography' },
              { type: 'Behind-the-Scenes', desc: 'Kitchen, prep, cooking process' },
              { type: 'Customer Stories', desc: 'Reviews, testimonials, experiences' },
              { type: 'Event Coverage', desc: 'Special events, celebrations' },
              { type: 'Staff Highlights', desc: 'Team members, chef spotlights' },
              { type: 'Restaurant Ambiance', desc: 'Interior, atmosphere shots' }
            ].map(content => (
              <label key={content.type} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-orange-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-orange-600 mt-1"
                  checked={responses.contentTypes?.includes(content.type) || false}
                  onChange={(e) => {
                    const current = responses.contentTypes || [];
                    const updated = e.target.checked 
                      ? [...current, content.type]
                      : current.filter((t: string) => t !== content.type);
                    updateResponse(serviceId, 'contentTypes', updated);
                  }}
                />
                <div>
                  <span className="font-medium text-gray-900">{content.type}</span>
                  <p className="text-sm text-gray-600">{content.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Marketing Goals */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            What are your main marketing goals?
          </label>
          <div className="space-y-3">
            {[
              { goal: 'Stay visible and top-of-mind', desc: 'Regular posting to maintain brand awareness' },
              { goal: 'Boost catering and large orders', desc: 'Promote catering services and group dining' },
              { goal: 'Increase weekday visits', desc: 'Drive traffic during slower periods' },
              { goal: 'Attract new customer demographics', desc: 'Reach different age groups or interests' },
              { goal: 'Promote special events and offers', desc: 'Highlight promotions and special occasions' },
              { goal: 'Build community engagement', desc: 'Create conversations and loyal following' }
            ].map(item => (
              <label key={item.goal} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-orange-50 cursor-pointer">
                <input 
                  type="radio" 
                  name="primaryGoal"
                  className="text-orange-600 mt-1"
                  checked={responses.primaryGoal === item.goal}
                  onChange={() => updateResponse(serviceId, 'primaryGoal', item.goal)}
                />
                <div>
                  <span className="font-medium text-gray-900">{item.goal}</span>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Posting Preferences */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred Post Types
            </label>
            <div className="space-y-2">
              {[
                'Product-focused (food photos)',
                'Customer stories & reviews',
                'Vibe-driven (atmosphere, music)',
                'Educational (cooking tips, ingredients)',
                'Promotional (deals, specials)'
              ].map(type => (
                <label key={type} className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    className="rounded text-orange-600"
                    checked={responses.postTypes?.includes(type) || false}
                    onChange={(e) => {
                      const current = responses.postTypes || [];
                      const updated = e.target.checked 
                        ? [...current, type]
                        : current.filter((t: string) => t !== type);
                      updateResponse(serviceId, 'postTypes', updated);
                    }}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Posting Frequency
            </label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={responses.postingFrequency || ''}
              onChange={(e) => updateResponse(serviceId, 'postingFrequency', e.target.value)}
            >
              <option value="">Select frequency</option>
              <option value="daily">Daily (7 posts/week)</option>
              <option value="5x-week">5x per week</option>
              <option value="3x-week">3x per week</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>

        {/* Brand Assets Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Brand Assets</h3>
          <p className="text-gray-600 mb-4">
            Upload your logo, menu photos, and brand guidelines to maintain consistency
          </p>
          <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
            Choose Files
          </button>
        </div>
      </div>
    );
  };

  const renderQRSurvey = () => {
    const serviceId = 'qr';
    const responses = surveyResponses[serviceId] || {};

    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-3 mb-8">
          <QrCode className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">QR Placement Setup</h2>
            <p className="text-gray-600">Configure your short-term rental marketing strategy</p>
          </div>
        </div>

        {/* Ideal Customer Profile */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            What kind of customers are ideal for your restaurant?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Tourists & Visitors', 'Young Professionals', 'Families with Kids',
              'Date Night Couples', 'Business Travelers', 'College Students',
              'Food Enthusiasts', 'Budget-Conscious', 'Upscale Diners',
              'Late Night Crowd', 'Health-Conscious', 'Local Regulars'
            ].map(customer => (
              <label key={customer} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-blue-600"
                  checked={responses.idealCustomers?.includes(customer) || false}
                  onChange={(e) => {
                    const current = responses.idealCustomers || [];
                    const updated = e.target.checked 
                      ? [...current, customer]
                      : current.filter((c: string) => c !== customer);
                    updateResponse(serviceId, 'idealCustomers', updated);
                  }}
                />
                <span className="text-sm font-medium">{customer}</span>
              </label>
            ))}
          </div>
        </div>

        {/* STR Unit Preferences */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            What types of rental units should we prioritize?
          </label>
          <div className="space-y-3">
            {[
              { type: 'Downtown condos & lofts', desc: 'High foot traffic, business travelers, tourists' },
              { type: 'Family-sized suburban homes', desc: 'Families, longer stays, group dining' },
              { type: 'Trendy neighborhood apartments', desc: 'Young professionals, food scene explorers' },
              { type: 'Luxury properties', desc: 'Upscale guests, special occasion dining' },
              { type: 'Budget-friendly units', desc: 'Cost-conscious travelers, casual dining' }
            ].map(unit => (
              <label key={unit.type} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-blue-600 mt-1"
                  checked={responses.unitTypes?.includes(unit.type) || false}
                  onChange={(e) => {
                    const current = responses.unitTypes || [];
                    const updated = e.target.checked 
                      ? [...current, unit.type]
                      : current.filter((t: string) => t !== unit.type);
                    updateResponse(serviceId, 'unitTypes', updated);
                  }}
                />
                <div>
                  <span className="font-medium text-gray-900">{unit.type}</span>
                  <p className="text-sm text-gray-600">{unit.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Bidding Strategy */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Monthly Budget Range
            </label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={responses.monthlyBudget || ''}
              onChange={(e) => updateResponse(serviceId, 'monthlyBudget', e.target.value)}
            >
              <option value="">Select budget range</option>
              <option value="200-500">$200 - $500</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000-2000">$1,000 - $2,000</option>
              <option value="2000+">$2,000+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Bidding Preference
            </label>
            <div className="space-y-2">
              {[
                { value: 'manual', label: 'Manual bidding - I want to review each placement' },
                { value: 'assisted', label: 'Smart assist - Auto-bid within my budget' },
                { value: 'automatic', label: 'Fully automatic - Optimize for best ROI' }
              ].map(option => (
                <label key={option.value} className="flex items-start space-x-3">
                  <input 
                    type="radio" 
                    name="biddingStrategy"
                    className="text-blue-600 mt-1"
                    checked={responses.biddingStrategy === option.value}
                    onChange={() => updateResponse(serviceId, 'biddingStrategy', option.value)}
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Blackout Periods */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Any periods you'd prefer NOT to run QR campaigns?
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="e.g., During our annual closure in January, or when we're fully booked for private events..."
            value={responses.blackoutPeriods || ''}
            onChange={(e) => updateResponse(serviceId, 'blackoutPeriods', e.target.value)}
          />
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">🎯 Smart Bidding Assistant</h3>
          <p className="text-blue-700 mb-4">
            Our AI analyzes guest patterns, unit performance, and your budget to optimize bids automatically.
          </p>
          <label className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              className="rounded text-blue-600"
              checked={responses.enableSmartBidding || false}
              onChange={(e) => updateResponse(serviceId, 'enableSmartBidding', e.target.checked)}
            />
            <span className="text-blue-800 font-medium">Enable smart bidding (recommended)</span>
          </label>
        </div>
      </div>
    );
  };

  const renderItinerarySurvey = () => {
    const serviceId = 'itinerary';
    const responses = surveyResponses[serviceId] || {};

    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-3 mb-8">
          <MapPin className="w-8 h-8 text-green-600" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Itinerary Inclusion Setup</h2>
            <p className="text-gray-600">Configure your guest experience offerings</p>
          </div>
        </div>

        {/* Meal Types */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Which meal types do you offer?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              'Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Late Night'
            ].map(meal => (
              <label key={meal} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-green-600"
                  checked={responses.mealTypes?.includes(meal) || false}
                  onChange={(e) => {
                    const current = responses.mealTypes || [];
                    const updated = e.target.checked 
                      ? [...current, meal]
                      : current.filter((m: string) => m !== meal);
                    updateResponse(serviceId, 'mealTypes', updated);
                  }}
                />
                <span className="text-sm font-medium">{meal}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Restaurant Vibe */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            What's your restaurant's vibe and atmosphere?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Romantic & Intimate', 'Casual & Relaxed', 'Lively & Energetic',
              'Family-Friendly', 'Upscale & Sophisticated', 'Trendy & Instagram-worthy',
              'Traditional & Authentic', 'Music & Entertainment', 'Quiet & Peaceful'
            ].map(vibe => (
              <label key={vibe} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-green-600"
                  checked={responses.vibes?.includes(vibe) || false}
                  onChange={(e) => {
                    const current = responses.vibes || [];
                    const updated = e.target.checked 
                      ? [...current, vibe]
                      : current.filter((v: string) => v !== vibe);
                    updateResponse(serviceId, 'vibes', updated);
                  }}
                />
                <span className="text-sm font-medium">{vibe}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Special Features */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Do you offer any of these special features?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Live Music', 'Game Nights', 'Trivia Events', 'Happy Hour',
              'Outdoor Seating', 'Private Dining', 'Catering Services', 'Delivery/Takeout',
              'Wine Tastings', 'Cooking Classes', 'Special Dietary Options', 'Group Events'
            ].map(feature => (
              <label key={feature} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-green-600"
                  checked={responses.specialFeatures?.includes(feature) || false}
                  onChange={(e) => {
                    const current = responses.specialFeatures || [];
                    const updated = e.target.checked 
                      ? [...current, feature]
                      : current.filter((f: string) => f !== feature);
                    updateResponse(serviceId, 'specialFeatures', updated);
                  }}
                />
                <span className="text-sm font-medium">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Discount and Limits */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Default Discount Percentage
            </label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={responses.defaultDiscount || ''}
              onChange={(e) => updateResponse(serviceId, 'defaultDiscount', e.target.value)}
            >
              <option value="">Select discount</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
              <option value="25">25%</option>
              <option value="30">30%</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Maximum Weekly Redemptions
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g., 50"
              value={responses.maxRedemptions || ''}
              onChange={(e) => updateResponse(serviceId, 'maxRedemptions', e.target.value)}
            />
          </div>
        </div>

        {/* Guest Description */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            How would you describe your restaurant to guests?
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows={4}
            placeholder="Write a brief description that will appear in guest itineraries (e.g., 'Authentic Mexican cuisine in a vibrant downtown setting with live mariachi music on weekends...')"
            value={responses.guestDescription || ''}
            onChange={(e) => updateResponse(serviceId, 'guestDescription', e.target.value)}
          />
          <div className="flex items-center mt-2">
            <button className="flex items-center space-x-2 text-green-600 text-sm hover:text-green-700">
              <Sparkles className="w-4 h-4" />
              <span>Generate with AI</span>
            </button>
          </div>
        </div>

        {/* Bad Fit Itineraries */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            What kinds of itineraries would be a bad fit for your brand?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Loud Party Groups', 'Very Budget-Focused', 'Fast Food Seekers',
              'Extremely Formal Events', 'Large Corporate Groups', 'Late Night Partying'
            ].map(badFit => (
              <label key={badFit} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-red-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-red-600"
                  checked={responses.badFitItineraries?.includes(badFit) || false}
                  onChange={(e) => {
                    const current = responses.badFitItineraries || [];
                    const updated = e.target.checked 
                      ? [...current, badFit]
                      : current.filter((b: string) => b !== badFit);
                    updateResponse(serviceId, 'badFitItineraries', updated);
                  }}
                />
                <span className="text-sm font-medium">{badFit}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMessagingSurvey = () => {
    const serviceId = 'messaging';
    const responses = surveyResponses[serviceId] || {};

    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-3 mb-8">
          <MessageSquare className="w-8 h-8 text-purple-600" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Messaging Center Setup</h2>
            <p className="text-gray-600">Configure your customer communication preferences</p>
          </div>
        </div>

        {/* Communication Channels */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Which communication channels do you want to use?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { channel: 'SMS', desc: 'Text messages for time-sensitive offers and reminders', icon: '📱' },
              { channel: 'Email', desc: 'Newsletters, promotions, and detailed communications', icon: '📧' },
              { channel: 'Social DMs', desc: 'Direct messages on Facebook and Instagram', icon: '💬' }
            ].map(item => (
              <label key={item.channel} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-purple-600 mt-1"
                  checked={responses.channels?.includes(item.channel) || false}
                  onChange={(e) => {
                    const current = responses.channels || [];
                    const updated = e.target.checked 
                      ? [...current, item.channel]
                      : current.filter((c: string) => c !== item.channel);
                    updateResponse(serviceId, 'channels', updated);
                  }}
                />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium text-gray-900">{item.channel}</span>
                  </div>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            How do you typically categorize your customers?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'New Customers', 'Regular Customers', 'VIP Customers',
              'Catering Clients', 'Event Bookers', 'Delivery Users',
              'Dine-in Preferred', 'Weekend Visitors', 'Lunch Crowd',
              'Happy Hour Regulars', 'Special Occasion Diners', 'Group Diners'
            ].map(segment => (
              <label key={segment} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-purple-600"
                  checked={responses.customerSegments?.includes(segment) || false}
                  onChange={(e) => {
                    const current = responses.customerSegments || [];
                    const updated = e.target.checked 
                      ? [...current, segment]
                      : current.filter((s: string) => s !== segment);
                    updateResponse(serviceId, 'customerSegments', updated);
                  }}
                />
                <span className="text-sm font-medium">{segment}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Message Types */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            What types of messages do you want to send?
          </label>
          <div className="space-y-3">
            {[
              { type: 'Welcome messages for new customers', desc: 'Introduce your restaurant and special offers' },
              { type: 'Promotional campaigns', desc: 'Special deals, discounts, and limited-time offers' },
              { type: 'Event announcements', desc: 'Live music, special events, holiday hours' },
              { type: 'Loyalty rewards', desc: 'Birthday offers, milestone rewards, VIP perks' },
              { type: 'Reservation reminders', desc: 'Confirm bookings and reduce no-shows' },
              { type: 'Feedback requests', desc: 'Ask for reviews and gather customer insights' }
            ].map(item => (
              <label key={item.type} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-purple-600 mt-1"
                  checked={responses.messageTypes?.includes(item.type) || false}
                  onChange={(e) => {
                    const current = responses.messageTypes || [];
                    const updated = e.target.checked 
                      ? [...current, item.type]
                      : current.filter((t: string) => t !== item.type);
                    updateResponse(serviceId, 'messageTypes', updated);
                  }}
                />
                <div>
                  <span className="font-medium text-gray-900">{item.type}</span>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Automation Preferences */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Automation Level
            </label>
            <div className="space-y-2">
              {[
                { value: 'manual', label: 'Manual only - I want to approve every message' },
                { value: 'semi', label: 'Semi-automated - Auto-send welcome & birthday messages' },
                { value: 'full', label: 'Fully automated - Smart campaigns based on customer behavior' }
              ].map(option => (
                <label key={option.value} className="flex items-start space-x-3">
                  <input 
                    type="radio" 
                    name="automationLevel"
                    className="text-purple-600 mt-1"
                    checked={responses.automationLevel === option.value}
                    onChange={() => updateResponse(serviceId, 'automationLevel', option.value)}
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Messaging Frequency
            </label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={responses.frequency || ''}
              onChange={(e) => updateResponse(serviceId, 'frequency', e.target.value)}
            >
              <option value="">Select frequency</option>
              <option value="weekly">Weekly campaigns</option>
              <option value="biweekly">Bi-weekly campaigns</option>
              <option value="monthly">Monthly campaigns</option>
              <option value="event-based">Event-based only</option>
            </select>
          </div>
        </div>

        {/* Contact Collection */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            How do you currently collect customer contact information?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Point of sale system', 'Reservation platform', 'Loyalty program signup',
              'Email newsletter signup', 'Social media followers', 'Event registrations',
              'Catering inquiries', 'Online ordering', 'In-store signup forms',
              'Contest entries', 'Feedback forms', 'Website contact forms'
            ].map(method => (
              <label key={method} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-purple-600"
                  checked={responses.collectionMethods?.includes(method) || false}
                  onChange={(e) => {
                    const current = responses.collectionMethods || [];
                    const updated = e.target.checked 
                      ? [...current, method]
                      : current.filter((m: string) => m !== method);
                    updateResponse(serviceId, 'collectionMethods', updated);
                  }}
                />
                <span className="text-sm font-medium">{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Compliance Preferences */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">📋 Compliance & Best Practices</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                className="rounded text-purple-600"
                checked={responses.doubleOptIn || false}
                onChange={(e) => updateResponse(serviceId, 'doubleOptIn', e.target.checked)}
              />
              <span className="text-purple-800 font-medium">Enable double opt-in for email subscriptions</span>
            </label>
            <label className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                className="rounded text-purple-600"
                checked={responses.autoUnsubscribe || false}
                onChange={(e) => updateResponse(serviceId, 'autoUnsubscribe', e.target.checked)}
              />
              <span className="text-purple-800 font-medium">Automatically handle unsubscribe requests</span>
            </label>
            <label className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                className="rounded text-purple-600"
                checked={responses.gdprCompliant || false}
                onChange={(e) => updateResponse(serviceId, 'gdprCompliant', e.target.checked)}
              />
              <span className="text-purple-800 font-medium">Enable GDPR compliance features</span>
            </label>
          </div>
        </div>
      </div>
    );
  };

  const getCurrentSurveyComponent = () => {
    const serviceId = surveys[currentSurvey]?.id;
    switch (serviceId) {
      case 'presence':
        return renderPresenceSurvey();
      case 'qr':
        return renderQRSurvey();
      case 'itinerary':
        return renderItinerarySurvey();
      case 'messaging':
        return renderMessagingSurvey();
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentSurvey < surveys.length - 1) {
      setCurrentSurvey(currentSurvey + 1);
    } else {
      // Complete onboarding and save all survey responses
      const updatedUser = {
        ...user!,
        onboardingComplete: true
      };
      
      // Update each service with its survey responses
      Object.keys(surveyResponses).forEach(serviceId => {
        updateService(serviceId, surveyResponses[serviceId]);
      });
      
      setUser(updatedUser);
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentSurvey > 0) {
      setCurrentSurvey(currentSurvey - 1);
    }
  };

  if (!surveys.length) {
    navigate('/onboarding');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">
              Step {currentSurvey + 1} of {surveys.length}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {Math.round(((currentSurvey + 1) / surveys.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSurvey + 1) / surveys.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Survey Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {getCurrentSurveyComponent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentSurvey === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentSurvey === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-orange-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
          >
            <span>
              {currentSurvey === surveys.length - 1 ? 'Complete Setup' : 'Next'}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSurveys;