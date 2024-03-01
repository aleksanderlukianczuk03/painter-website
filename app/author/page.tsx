import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Author Page"
};


export default function Author() {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
        {/* <img src="\logo-immunifai.png" alt="Profile Photo" style={{ borderRadius: '50%', width: '200px', height: '200px' }} /> */}
        <h1 style={{ fontWeight: 'bold' }}>Alex Luk</h1>
        <p style={{ margin: '20px 50px', maxWidth: '600px' }}>Health writer at Immunifai. Alex holds a diploma in the fundamentals of dietetics. Alex shares his knowledge based on research in an easy and accessible way.</p>
      </div>
    </div>
  );
};
