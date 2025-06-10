import Issue from "../Components/Issue";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";

function GitHub() {
  const [activeNav, setActiveNav] = useState("issues");

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full px-2 sm:px-4 py-4">
        <h2 className="text-4xl font-bold text-github-gray mb-6 font-roboto-condensed tracking-tight px-2">
          GitHub Repository Analysis
        </h2>

        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm mb-6">
          <div className="flex flex-wrap">
            {["issues", "pull-requests", "commits", "traffic", "clones"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`relative py-3 px-4 text-sm font-medium transition-all duration-300
                  ${
                    activeNav === item
                      ? "text-github-blue bg-blue-50"
                      : "text-github-gray hover:text-github-blue hover:bg-gray-50"
                  }`}
                  onClick={() => handleNavClick(item)}
                >
                  {item
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  {activeNav === item && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-github-blue transform scale-x-100 transition-transform duration-300" />
                  )}
                </a>
              )
            )}
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Sidebar />
          </div>

          {/* Content Sections */}
          <div className="flex-1 space-y-4">
            <section
              id="overview"
              className="bg-white shadow-sm p-4 transform transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-2xl font-semibold text-github-gray mb-4 font-roboto-condensed border-b pb-3">
                Issue Overview
              </h3>
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <Issue />
              </div>
            </section>

            <section
              id="activity"
              className="bg-white shadow-sm p-4 transform transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-2xl font-semibold text-github-gray mb-4 font-roboto-condensed border-b pb-3">
                Issue Activity
              </h3>
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                {/* Add Issue Activity content */}
              </div>
            </section>

            <section
              id="team"
              className="bg-white shadow-sm p-4 transform transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-2xl font-semibold text-github-gray mb-4 font-roboto-condensed border-b pb-3">
                Team Distribution
              </h3>
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                {/* Add Team Distribution content */}
              </div>
            </section>

            <section
              id="library"
              className="bg-white shadow-sm p-4 transform transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-2xl font-semibold text-github-gray mb-4 font-roboto-condensed border-b pb-3">
                By Library Version
              </h3>
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                {/* Add Library Version content */}
              </div>
            </section>

            <section
              id="component"
              className="bg-white shadow-sm p-4 transform transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-2xl font-semibold text-github-gray mb-4 font-roboto-condensed border-b pb-3">
                Component Issue
              </h3>
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                {/* Add Component Issue content */}
              </div>
            </section>

            <section
              id="invalid"
              className="bg-white shadow-sm p-4 transform transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-2xl font-semibold text-github-gray mb-4 font-roboto-condensed border-b pb-3">
                Invalid Request
              </h3>
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                {/* Add Invalid Request content */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GitHub;
