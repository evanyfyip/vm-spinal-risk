import React from 'react';

const BoldNumbers = ({ constructedString }) => {
  // Function to wrap numbers with <strong> tags
  const wrapNumbersInBold = (string) => {
    return string.replace(/(\$?\d+(?:,\d+)*(?:\.\d+)?%?)/g, (match) => {
        return `<strong>${match}</strong>`;
    });
  };

  // Function to render the modified string as HTML
  const renderHTML = (htmlString) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  // Call the wrapNumbersInBold function
  const modifiedString = wrapNumbersInBold(constructedString);

  // Render the modified string as HTML
  return <div>{renderHTML(modifiedString)}</div>;
};

export default BoldNumbers;