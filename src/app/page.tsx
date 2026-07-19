import Image from "next/image";
import {
  Header,
  HeroSection,
  HorizontalContentBlock,
  TitleBlock,
  SuperBlock
} from '@/components';

export default function Home() {
  const navigationItems = [
    { label: '3D Navigation', href: '#navigation', isActive: false },
    { label: 'Search', href: '#search', isActive: false },
    { label: 'Find Places', href: '#places', isActive: false },
    { label: 'For Snowboarders', href: '#snowboarders', isActive: false },
  ];

  return (
    <div className="min-h-screen">
      <Header navigation={navigationItems} />

      {/* Hero Section */}
      <HeroSection
        backgroundImage="/images/hero-snowboarder.jpg"
        title="BONVO.SKI"
        subtitle="3d Ski resort maps and services"
      />

      {/* Main Content */}
      <main>
        {/* 3D Navigation Section */}
        <SuperBlock>
          <section id="navigation">
            <TitleBlock
              title="3D Navigation"
              subtitle="Navigate ski resorts like never before"
            />
          </section>

          <HorizontalContentBlock
            leftContent={
              <div className="relative w-full max-w-sm aspect-square">
                <Image
                  src="/images/search-hero.jpg"
                  alt="3D Navigation illustration"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            }
            rightContent={
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3">Map Styles</h3>
                  <p className="text-body text-gray-700">
                    Easy navigation on a map that makes the most sense for you!
                    Spot the closest landmarks to know where you are.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3">Live Navigation</h3>
                  <p className="text-body text-gray-700">
                    Live navigation lets you know where you are, and where you&apos;re facing!
                    It can also track your route so you can see where you&apos;re moving.
                  </p>
                </div>
              </div>
            }
          />
        </SuperBlock>

        {/* Search Section */}
        <SuperBlock>
          <section id="search">
            <TitleBlock
              title="Search"
              subtitle="Find exactly what you're looking for"
            />
          </section>

          <HorizontalContentBlock
            leftContent={
              <div className="relative w-full max-w-sm aspect-square">
                <Image
                  src="/images/ski-lift.jpg"
                  alt="Search illustration"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            }
            rightContent={
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3">Lifts</h3>
                  <p className="text-body text-gray-700">
                    Clear and easy search for the lifts! Understand where are the
                    stations and where they lead.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3">Slopes</h3>
                  <p className="text-body text-gray-700">
                    Find the slope your friends ride and get there quickly!
                  </p>
                </div>
              </div>
            }
          />
        </SuperBlock>

        {/* Find Places Section */}
        <SuperBlock>
          <section id="places">
            <TitleBlock
              title="Find Places"
              subtitle="Discover the best spots on the mountain"
            />
          </section>

          <HorizontalContentBlock
            leftContent={
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="relative aspect-square">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">🍽️</span>
                  </div>
                </div>
                <div className="relative aspect-square">
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">🚻</span>
                  </div>
                </div>
                <div className="relative aspect-square">
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">🎉</span>
                  </div>
                </div>
                <div className="relative aspect-square">
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">🎿</span>
                  </div>
                </div>
              </div>
            }
            rightContent={
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3">Restaurants</h3>
                  <p className="text-body text-gray-700">
                    Spot the closest restaurants, hüttes and cafés for a mid-day break!
                    You will find high quality photos and great description of what to expect.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3">Events</h3>
                  <p className="text-body text-gray-700">
                    Find the best places to hang out during the day! Want to party?
                    Join the best parties and register easily.
                  </p>
                </div>
              </div>
            }
          />
        </SuperBlock>

        {/* For Snowboarders Section */}
        <SuperBlock>
          <TitleBlock
            title="For Snowboarders"
            subtitle="Specialized features for snowboard enthusiasts"
          />

          <HorizontalContentBlock
            leftContent={
              <div className="relative w-full max-w-sm aspect-square">
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-6xl">🏂</span>
                </div>
              </div>
            }
            rightContent={
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3">Slope Recommendations</h3>
                  <p className="text-body text-gray-700">
                    Is slope recommended for snowboarders? First time rider? No more accidents
                    on red slopes or black diamonds. Choose the slope that fits your skillset
                    and is approved by Bonvo!
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3">Elevation Diagrams</h3>
                  <p className="text-body text-gray-700">
                    Understand the slope you want to go! Never get to a ski slope that is flat
                    or has uphill parts. Choose the right slope to keep snowboarding comfortable and cool.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3">Flat & Uphill Detection</h3>
                  <p className="text-body text-gray-700">
                    Find if the slope has a lot of flat parts if you&apos;re on a snowboard!
                    Review slopes that are not suiting you, to keep you boarding the best slopes.
                  </p>
                </div>
              </div>
            }
          />
        </SuperBlock>

        {/* Final Call to Action */}
        <SuperBlock>
          <div className="relative w-full py-32 text-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4">
              <h2 className="text-title text-black mb-6">
                Ready to Navigate Ski Resorts in 3D?
              </h2>
              <p className="text-body-large text-gray-700 mb-8 max-w-2xl mx-auto">
                Experience the future of ski resort navigation with Bonvo Ski.
                Find your perfect slopes, discover amazing places, and make the most of your mountain adventure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Get Started
                </button>
                <button className="border border-black text-black px-8 py-3 rounded-lg font-medium hover:bg-black hover:text-white transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </SuperBlock>
      </main>
    </div>
  );
}
