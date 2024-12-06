document.addEventListener('DOMContentLoaded', function() {
    const wavesContainer = document.getElementById('waves-container');
    const waveColors = ['#7265FF', '#5A45FF', '#4225F4']; // Inverser l'ordre des couleurs
    const numberOfWaves = 4;

    function createWaveSVG(color, opacity) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 2880 320');
        svg.style.position = 'absolute';
        svg.style.bottom = '0';
        svg.style.left = '0';
        svg.style.width = '200%';
        svg.style.height = '100%';

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('fill', color);
        path.setAttribute('fill-opacity', opacity);
        path.setAttribute('d', 'M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z M1440,192L1488,197.3C1536,203,1632,213,1728,229.3C1824,245,1920,267,2016,250.7C2112,235,2208,181,2304,181.3C2400,181,2496,235,2592,234.7C2688,235,2784,181,2832,154.7L2880,128L2880,320L2832,320C2784,320,2688,320,2592,320C2496,320,2400,320,2304,320C2208,320,2112,320,2016,320C1920,320,1824,320,1728,320C1632,320,1536,320,1488,320L1440,320Z');

        svg.appendChild(path);
        return svg;
    }

    function createWave(index) {
        const wave = document.createElement('div');
        wave.classList.add('wave');
        wave.style.zIndex = index;
        wave.style.opacity = (1 - index * 0.2).toString();
        wave.style.animationDuration = `${20 + index * 4}s`;

        const svg = createWaveSVG(waveColors[index % waveColors.length], 1 - index * 0.2);
        wave.appendChild(svg);

        return wave;
    }

    for (let i = 0; i < numberOfWaves; i++) {
        const wave = createWave(i);
        wavesContainer.appendChild(wave);
    }
});