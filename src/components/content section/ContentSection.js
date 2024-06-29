// ../../components/content section/ContentSection
import React from 'react';

const ContentSection = React.forwardRef(({ section, index }, ref) => {
  return (
    <div>
      <h2 className="text-3xl">{section}</h2>
      <div ref={ref} className="min-h-screen flex items-center justify-center bg-gray-200 my-2"></div>
    </div>
  );
});

export default ContentSection;