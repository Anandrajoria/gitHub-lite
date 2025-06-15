import { useState, useEffect } from "react";
import "../Components/Sidebar.css";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    {
      id: "overview",
      label: "Issue Overview",
      icon: "📊",
      description: "GitHub Issues",
    },
    {
      id: "activity",
      label: "Issue Activity",
      icon: "📈",
      description: "GitHub Issues by Quarter",
    },
    {
      id: "team",
      label: "Team Distribution",
      icon: "👥",
      description: "Issue Type Distribution Over Time",
    },
    {
      id: "library",
      label: "By Library Version",
      icon: "📚",
      description: "Library Version Analysis",
    },
    {
      id: "component",
      label: "Component Issue",
      icon: "🔧",
      description: "Component-wise Issues",
    },
    {
      id: "invalid",
      label: "Invalid Request",
      icon: "⚠️",
      description: "Invalid Request Analysis",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Get all section elements
      const sectionElements = sections.map((section) =>
        document.getElementById(section.id)
      );

      // Find the current section based on scroll position
      let currentSection = sections[0].id;
      sectionElements.forEach((element, index) => {
        if (element && element.offsetTop <= scrollPosition + 100) {
          currentSection = sections[index].id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`sidebar-item ${
              activeSection === section.id ? "active" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{section.icon}</span>
              <span className="text-sm font-medium">{section.label}</span>
              {activeSection === section.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-github-blue animate-pulse" />
              )}
            </div>
            <span className="text-xs text-gray-500 pl-8">
              {section.description}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
