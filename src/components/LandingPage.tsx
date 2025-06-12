import React from 'react';
import { ArrowRight, CheckCircle, MapPin, MessageSquare, Eye, Smartphone, Star, Heart, Calendar, QrCode, Users, TrendingUp, Store, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  const handleTakeTour = () => {
    // For now, scroll to how it works section
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-blue-200 to-yellow-100">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div>
              <div className="mb-8">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                  <span className="font-serif text-yellow-600">Market</span>{' '}
                  <span className="text-blue-800">Memphis</span>
                </h1>
                <p className="text-2xl text-gray-700 font-light leading-relaxed">
                  "Complete marketing platform for Memphis businesses."
                </p>
              </div>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Built for Memphis restaurants, retail shops, and tour companies by Memphians. 
                Social media management, guest targeting, customer messaging, and local discovery - all in one simple platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={handleGetStarted}
                  className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                  <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={handleTakeTour}
                  className="bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
                >
                  Take the Tour
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right side - Hero image placeholder */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-lg p-6 mb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Music className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Blues City Tours</h3>
                      <p className="text-gray-600 text-sm">Downtown Memphis</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>📍 123 Beale St, Memphis, TN</p>
                    <p>🕒 Tours daily 10 AM - 8 PM</p>
                    <p>📞 (901) 555-0123</p>
                  </div>
                </div>
                <div className="text-white text-center">
                  <p className="text-sm opacity-80">Sample business profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Types Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Memphis Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you serve food, sell products, or show off our city, we've got the tools to help you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Restaurants */}
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Restaurants & Food</h3>
              <p className="text-gray-600 mb-4">BBQ joints, soul food, fine dining, food trucks, cafes, and everything in between.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Menu promotions</li>
                <li>• Event announcements</li>
                <li>• Tourist targeting</li>
                <li>• Loyalty programs</li>
              </ul>
            </div>

            {/* Retail */}
            <div className="text-center p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl border border-yellow-200">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Store className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Retail & Shopping</h3>
              <p className="text-gray-600 mb-4">Boutiques, gift shops, record stores, art galleries, and local retailers.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Product showcases</li>
                <li>• Sale announcements</li>
                <li>• Visitor discovery</li>
                <li>• Customer rewards</li>
              </ul>
            </div>

            {/* Tours */}
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tours & Experiences</h3>
              <p className="text-gray-600 mb-4">Music tours, historical walks, ghost tours, river cruises, and unique experiences.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Tour bookings</li>
                <li>• Schedule updates</li>
                <li>• Guest experiences</li>
                <li>• Group packages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything Your Business Needs to Grow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four powerful marketing services that work together to help Memphis businesses 
              connect with their community and grow their customer base.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Social Media Management */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Social Media Management</h3>
              <p className="text-gray-600 mb-4">Automated posting, content calendar, and social media presence across all platforms.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Scheduled posts</li>
                <li>• Content creation</li>
                <li>• Multi-platform posting</li>
                <li>• Performance analytics</li>
              </ul>
            </div>

            {/* Guest Targeting */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 border border-yellow-200">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Guest Targeting</h3>
              <p className="text-gray-600 mb-4">Reach visitors staying in short-term rentals with strategic QR code placements.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• QR code placements</li>
                <li>• Tourist targeting</li>
                <li>• Neighborhood focus</li>
                <li>• Bid management</li>
              </ul>
            </div>

            {/* Experience Packages */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Experience Packages</h3>
              <p className="text-gray-600 mb-4">Get featured in curated guest itineraries and experience bundles.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Curated experiences</li>
                <li>• Guest itineraries</li>
                <li>• Flexible discounts</li>
                <li>• Revenue tracking</li>
              </ul>
            </div>

            {/* Customer Messaging */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Messaging</h3>
              <p className="text-gray-600 mb-4">SMS, email campaigns, and automated customer communications.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• SMS & email campaigns</li>
                <li>• Contact management</li>
                <li>• Automated workflows</li>
                <li>• Performance tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* What mktmem Does Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Features */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Everything you need to connect with your community
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Manage your online presence</h3>
                    <p className="text-gray-600">Social media, business listings, photos, and hours - all in one place that's easy to update</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Reach tourists and visitors</h3>
                    <p className="text-gray-600">Get discovered by guests staying in short-term rentals throughout Memphis</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Message customers directly</h3>
                    <p className="text-gray-600">Send specials, reminders, and updates via text or email to folks who want to hear from you</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Smartphone className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Manage it all from your phone</h3>
                    <p className="text-gray-600">No computer needed - update your info, send messages, check stats on the go</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Phone mockup */}
            <div className="relative">
              <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl max-w-sm mx-auto">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900">Your Marketing Dashboard</h4>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Social Posts</span>
                      <span className="text-lg font-bold text-blue-700">24</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">New Customers</span>
                      <span className="text-lg font-bold text-yellow-700">47</span>
                    </div>
                    <div className="w-full bg-yellow-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium">
                    Send Campaign
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Memphis Needs This Section */}
      <div className="py-20 bg-gradient-to-r from-blue-800 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <blockquote className="text-2xl lg:text-3xl text-white font-light leading-relaxed mb-8 italic">
              "We built this because Memphis deserves tools made for us, not imported from somewhere else. 
              We keep it simple, we keep it local, and we keep your business in your own hands."
            </blockquote>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex items-center space-x-1 mb-3 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white mb-3">"I signed up in 10 minutes and got my first campaign out that same day."</p>
                <p className="text-blue-200 text-sm">- Sarah, Midtown Boutique</p>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex items-center space-x-1 mb-3 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white mb-3">"Finally, marketing tools that actually work for local businesses like mine."</p>
                <p className="text-blue-200 text-sm">- Marcus, Soul Food Kitchen</p>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex items-center space-x-1 mb-3 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white mb-3">"Our ghost tours are booked solid thanks to the tourist targeting feature."</p>
                <p className="text-blue-200 text-sm">- Jennifer, Memphis Ghost Tours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to get your Memphis business connected with your community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose your services</h3>
              <p className="text-gray-600 leading-relaxed">
                Pick from social media management, guest targeting, experience packages, and customer messaging. 
                Start with one or combine them all.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Set up your profile</h3>
              <p className="text-gray-600 leading-relaxed">
                Tell us about your business, upload photos, set your preferences. 
                Our setup wizard makes it quick and easy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Start growing your business</h3>
              <p className="text-gray-600 leading-relaxed">
                Watch as new customers discover you, your social media grows, and your community engagement increases.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Now
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Simple, Fair Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the services that fit your needs. Start free, add services as you grow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Social Media Management */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Social Media</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">$199<span className="text-lg font-normal text-gray-600">/mo</span></p>
              <p className="text-gray-600 text-sm mb-4">Complete social media management</p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li>• Automated posting</li>
                <li>• Content calendar</li>
                <li>• Multi-platform</li>
                <li>• Analytics</li>
              </ul>
              <button 
                onClick={handleGetStarted}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Guest Targeting */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Guest Targeting</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">Pay<span className="text-lg font-normal text-gray-600"> per bid</span></p>
              <p className="text-gray-600 text-sm mb-4">QR placements in rentals</p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li>• Strategic placements</li>
                <li>• Tourist targeting</li>
                <li>• Bid management</li>
                <li>• Performance tracking</li>
              </ul>
              <button 
                onClick={handleGetStarted}
                className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Experience Packages */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Experience Packages</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">Free<span className="text-lg font-normal text-gray-600"> to join</span></p>
              <p className="text-gray-600 text-sm mb-4">Commission on bookings only</p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li>• Curated experiences</li>
                <li>• Guest itineraries</li>
                <li>• Flexible discounts</li>
                <li>• No monthly fees</li>
              </ul>
              <button 
                onClick={handleGetStarted}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Customer Messaging */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Customer Messaging</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">$99<span className="text-lg font-normal text-gray-600">/mo</span></p>
              <p className="text-gray-600 text-sm mb-4">Plus usage fees</p>
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li>• SMS & email campaigns</li>
                <li>• Contact management</li>
                <li>• Automated workflows</li>
                <li>• Analytics</li>
              </ul>
              <button 
                onClick={handleGetStarted}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Complete Marketing Package</h3>
              <p className="text-blue-100 text-lg mb-6">
                Get all four services together and save. Perfect for businesses ready to grow fast.
              </p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <span className="text-3xl font-bold">$399/month</span>
                <span className="text-blue-200 line-through">$497/month</span>
                <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">Save $98</span>
              </div>
              <button 
                onClick={handleGetStarted}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Complete Package
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                <span className="font-serif text-yellow-400">Market</span>{' '}
                <span className="text-blue-400">Memphis</span>
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Complete marketing platform for Memphis restaurants, retail shops, and tour companies. 
                Built with love in the Bluff City.
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Made for Memphis by Memphians. © 2025 Market Memphis.</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Social Media Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guest Targeting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Experience Packages</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Customer Messaging</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;