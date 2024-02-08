import React from 'react';

function CatchyText() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '740px', margin: '0 auto' }}>
            <p style={{ fontSize: 'clamp(12px, 3vw, 24px)', fontFamily: 'Arial', fontWeight: 'bold', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.2em', whiteSpace: 'pre-wrap', margin: '0 20px' }}>
                Humor cures <a href="/path1" style={{ fontSize: '10px' }}>(<span style={{ fontSize: '8px', verticalAlign: 'super' }}>1</span>, <span style={{ fontSize: '8px', verticalAlign: 'super' }}>2</span>, <span style={{ fontSize: '8px', verticalAlign: 'super' }}>3</span>, <span style={{ fontSize: '8px', verticalAlign: 'super' }}>4</span>)</a>, thus we combine it with scholarly substance, turning chuckles into channels for knowledge.
            </p>
        </div>
    );
}

export default CatchyText;