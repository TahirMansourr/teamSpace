"use client";
import Link from "next/link";
import {
  FiArrowRight,
  FiUsers,
  FiMessageCircle,
  FiTrello,
} from "react-icons/fi";
import "../public/styles/meshBackground.css";
const Page = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="dots-background" aria-hidden="true">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `-${Math.random() * 20}s`,
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 py-20">
        <div className="text-center animate-fadeIn">
          <span className="text-sm font-semibold tracking-widest text-blue-600 mb-4 block animate-slideUp">
            WELCOME TO THE FUTURE OF COLLABORATION
          </span>
          <h1 className="text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 animate-gradient">
              TeamWorkSpace
            </span>
          </h1>
          <p className="text-2xl text-gray-600 mb-8 font-light leading-relaxed max-w-3xl mx-auto animate-slideUp">
            Your team's central hub for communication, project management, and
            seamless collaboration.
          </p>
        </div>
        <div className="flex justify-center gap-8 animate-slideUp">
          <Link href="/myDashboard">
            <button
              className="group flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium 
              shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg"
            >
              Start Collaborating
              <FiArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </Link>
        </div>
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-8
                transform transition-all duration-300 hover:-translate-y-2
                animate-fadeIn shadow-lg hover:shadow-xl"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <feature.icon className="text-4xl mb-6 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: FiUsers,
    title: "Team Collaboration",
    description:
      "Real-time collaboration with your team members, instant updates, and seamless communication.",
  },
  {
    icon: FiMessageCircle,
    title: "Smart Chat System",
    description:
      "Built-in chat functionality with thread support and file sharing capabilities.",
  },
  {
    icon: FiTrello,
    title: "Project Management",
    description:
      "Powerful project tracking with customizable workflows and task management.",
  },
];

export default Page;
