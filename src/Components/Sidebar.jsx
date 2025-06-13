import { useState, useEffect } from "react";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Issue Overview", icon: "📊" },
    { id: "activity", label: "Issue Activity", icon: "📈" },
    { id: "team", label: "Team Distribution", icon: "👥" },
    { id: "library", label: "By Library Version", icon: "📚" },
    { id: "component", label: "Component Issue", icon: "🔧" },
    { id: "invalid", label: "Invalid Request", icon: "⚠️" },
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
    <div className="sticky top-4">
      <nav className="bg-white shadow-sm">
        <div className="divide-y divide-gray-100">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-3 py-2.5 transition-all duration-300 flex items-center gap-3
                ${
                  activeSection === section.id
                    ? "bg-blue-50 text-github-blue font-medium"
                    : "text-github-gray hover:bg-gray-50 hover:text-github-blue"
                }`}
            >
              <span className="text-lg">{section.icon}</span>
              <span className="text-sm">{section.label}</span>
              {activeSection === section.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-github-blue animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
