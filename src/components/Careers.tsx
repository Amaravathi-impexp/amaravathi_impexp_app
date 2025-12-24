import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Briefcase, TrendingUp, Users, Coffee, Heart, Zap, MapPin, Clock } from 'lucide-react';

interface CareersProps {
  onClose: () => void;
  onHomeClick?: () => void;
  onAboutClick?: () => void;
  onCareersClick?: () => void;
  onContactClick?: () => void;
  onSignInClick?: () => void;
}

export function Careers({ onClose, onHomeClick, onAboutClick, onCareersClick, onContactClick, onSignInClick }: CareersProps) {
  const jobOpenings = [
    {
      title: 'Senior Logistics Coordinator',
      location: 'Mumbai, India',
      type: 'Full-time',
      department: 'Operations',
      description: 'Lead logistics operations and coordinate shipments across Asia Pacific region.'
    },
    {
      title: 'Fleet Operations Manager',
      location: 'Singapore',
      type: 'Full-time',
      department: 'Operations',
      description: 'Manage and optimize fleet operations, ensuring efficient vessel utilization.'
    },
    {
      title: 'Software Engineer',
      location: 'Bangalore, India',
      type: 'Full-time',
      department: 'Technology',
      description: 'Develop and maintain our cutting-edge logistics tracking and management systems.'
    },
    {
      title: 'Customer Success Manager',
      location: 'Dubai, UAE',
      type: 'Full-time',
      department: 'Sales',
      description: 'Build strong relationships with clients and ensure exceptional service delivery.'
    },
    {
      title: 'Data Analyst',
      location: 'Remote',
      type: 'Full-time',
      department: 'Analytics',
      description: 'Analyze logistics data to drive insights and improve operational efficiency.'
    },
    {
      title: 'Maritime Operations Specialist',
      location: 'Rotterdam, Netherlands',
      type: 'Full-time',
      department: 'Operations',
      description: 'Coordinate vessel schedules and port operations across European routes.'
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Continuous learning opportunities and clear advancement paths'
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs'
    },
    {
      icon: Coffee,
      title: 'Work-Life Balance',
      description: 'Flexible working hours and remote work options'
    },
    {
      icon: Users,
      title: 'Global Team',
      description: 'Work with diverse, talented professionals worldwide'
    },
    {
      icon: Zap,
      title: 'Innovation Focus',
      description: 'Access to latest technology and tools in the industry'
    },
    {
      icon: Briefcase,
      title: 'Competitive Package',
      description: 'Market-leading salary and performance bonuses'
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation 
        onSignInClick={onSignInClick}
        onHomeClick={onHomeClick}
        onAboutClick={onAboutClick}
        onCareersClick={onCareersClick}
        onContactClick={onContactClick}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl mb-6">Join Our Team</h1>
            <p className="text-xl max-w-3xl">
              Build your career with a global leader in shipping and logistics. Be part of a team that's 
              connecting the world.
            </p>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl text-center mb-12">Why Work With Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                    <benefit.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl text-center mb-12">Open Positions</h2>
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.department}</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      Apply Now
                    </button>
                  </div>
                  <p className="text-gray-600">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl mb-6">Our Culture</h2>
                <p className="text-gray-600 mb-4">
                  At Amaravathi, we believe in creating an environment where innovation thrives and every 
                  team member can reach their full potential. Our culture is built on collaboration, 
                  respect, and a shared commitment to excellence.
                </p>
                <p className="text-gray-600 mb-4">
                  We celebrate diversity and encourage fresh perspectives. Whether you're working from 
                  one of our global offices or remotely, you'll be part of a supportive community that 
                  values your contributions.
                </p>
                <p className="text-gray-600">
                  Join us in shaping the future of global logistics while building a rewarding career 
                  that makes a real impact.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-blue-600 text-3xl mb-2">2,500+</div>
                  <div className="text-gray-600">Global Employees</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-blue-600 text-3xl mb-2">45+</div>
                  <div className="text-gray-600">Nationalities</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-blue-600 text-3xl mb-2">98%</div>
                  <div className="text-gray-600">Employee Satisfaction</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-blue-600 text-3xl mb-2">15+</div>
                  <div className="text-gray-600">Training Programs</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl mb-6">Don't See the Right Role?</h2>
            <p className="text-xl mb-8">
              Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors">
              Submit Your Resume
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}