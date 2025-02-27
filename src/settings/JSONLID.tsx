import React from 'react';

interface JSONLDProps {
  data: object;
}

const JSONLD: React.FC<JSONLDProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JSONLD;
