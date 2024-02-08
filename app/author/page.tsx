import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Author Page"
};


export default function Author() {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="\logo-immunifai.png" alt="Profile Photo" style={{ borderRadius: '50%', width: '200px', height: '200px' }} />
        <h1 style={{ fontWeight: 'bold' }}>Alex Luk</h1>
        <p style={{ margin: '0 50px', maxWidth: '600px' }}>This is the author page for Alex Luk. Dr. Jill Seladi-Schulman is currently a freelance medical writer and was previously a project setup manager for clinical trials. She specializes in microbiology and infectious disease, having written her dissertation on influenza virus morphology. Dr. Seladi-Schulman has publications in peer-reviewed journals. She also has had her work featured on the cover of the Journal of Virology.</p>
      </div>
    </div>
  );
};
