import { Check, Star } from "lucide-react";

export default function Subscriptions() {
  const packages = [
    {
      name: 'Basic Plan',
      price: 29.99,
      period: 'month',
      description: 'Perfect for individuals',
      features: [
        'Up to 10 items per month',
        'Standard pickup & delivery',
        'Basic cleaning services',
        'Email support',
      ],
      popular: false,
    },
    {
      name: 'Premium Plan',
      price: 59.99,
      period: 'month',
      description: 'Best for families',
      features: [
        'Up to 30 items per month',
        'Priority pickup & delivery',
        'All cleaning services',
        'Special care items',
        '24/7 phone support',
        '10% discount on extras',
      ],
      popular: true,
    },
    {
      name: 'Business Plan',
      price: 149.99,
      period: 'month',
      description: 'For businesses and large families',
      features: [
        'Unlimited items',
        'Same-day pickup & delivery',
        'All premium services',
        'Dedicated account manager',
        '24/7 priority support',
        '20% discount on extras',
        'Custom scheduling',
      ],
      popular: false,
    },
  ];

  const coupons = [
    { code: 'WELCOME20', discount: '20%', description: 'First month discount', expires: '2026-04-30' },
    { code: 'FAMILY15', discount: '15%', description: 'Family plan discount', expires: '2026-05-31' },
    { code: 'SPRING10', discount: '10%', description: 'Spring special', expires: '2026-06-30' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Subscription Packages</h1>
        <p className="text-gray-600">Choose the perfect plan for your laundry needs</p>
      </div>

      {/* Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl shadow-sm border-2 p-6 ${
              pkg.popular ? 'border-green-500' : 'border-gray-200'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                <span className="text-gray-500">/{pkg.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                pkg.popular
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>

      {/* Coupons & Offers */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Coupons & Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map((coupon, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-lg font-mono font-bold text-sm">
                  {coupon.code}
                </div>
                <div className="bg-orange-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                  {coupon.discount} OFF
                </div>
              </div>
              <p className="text-gray-800 font-medium mb-2">{coupon.description}</p>
              <p className="text-gray-600 text-sm">Valid until {coupon.expires}</p>
              <button className="mt-3 w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium text-sm">
                Apply Coupon
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
