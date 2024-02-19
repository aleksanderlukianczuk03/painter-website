import React from 'react';

function CatchyText() {
    return (
        
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '740px', margin: '30px auto' }}>
        <div>
            <h1 style={{ fontSize: 'clamp(68px, 8vw, 52px)', fontFamily: 'Inter, sans-serif', fontWeight: 800, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.2em', whiteSpace: 'pre-wrap', margin: '10px 10px' }}>
            Science with a
                <br />
                <span style={{ color: '#42bd41' }}>smile</span>
            </h1>
        </div>
        <div style={{ marginTop: '10px', marginBottom: '30px' }}>
    <p style={{ fontSize: 'clamp(24px, 5vw, 20px)', fontFamily: 'Inter, sans-serif', fontWeight: 500, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.2em', whiteSpace: 'pre-wrap', margin: '10px 10px', color: '#333' }}>
        At Immunifai, humor lightens the 
        <br />
        science of health.
        <br />
    </p>
</div>
    </div>
    );
}

export default CatchyText;