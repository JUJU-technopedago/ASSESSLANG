const levelMapping = {
    "A1 en cours d'acquisition": 1,
    "A1 acquis": 2,
    "A2 en cours d'acquisition": 3,
    "A2 acquis": 4,
    "B1 en cours d'acquisition": 5,
    "B1 acquis": 6,
    "B2 en cours d'acquisition": 7,
    "B2 acquis": 8,
    "C1 en cours d'acquisition": 9,
    "C1 acquis": 10,
    "C2 en cours d'acquisition": 11,
    "C2 acquis": 12
};

const COLORS = {
    active: '#848484',
    inactive: '#848484',
    polygon: 'rgba(52, 152, 219, 0.5)'
};

const INTERSECTION_POINTS = [
    // Branch 0 (Compréhension Orale) - Points North-Westwards
    [
        { x: 430.96, y: 460.14 }, { x: 412.28, y: 449.36 }, { x: 393.59, y: 438.57 },
        { x: 374.91, y: 427.78 }, { x: 356.23, y: 416.99 }, { x: 337.54, y: 406.20 },
        { x: 318.86, y: 395.42 }, { x: 300.18, y: 384.63 }, { x: 281.49, y: 373.85 },
        { x: 262.81, y: 363.06 }, { x: 244.13, y: 352.27 }, { x: 225.44, y: 341.48 }
    ],
    // Branch 1 (Compréhension Écrite) - Points North-Eastwards
    [
        { x: 569.03, y: 460.14 }, { x: 587.71, y: 449.36 }, { x: 606.40, y: 438.57 },
        { x: 625.08, y: 427.78 }, { x: 643.77, y: 416.99 }, { x: 662.45, y: 406.20 },
        { x: 681.13, y: 395.42 }, { x: 699.81, y: 384.63 }, { x: 718.50, y: 373.85 },
        { x: 737.18, y: 363.06 }, { x: 755.86, y: 352.27 }, { x: 774.55, y: 341.48 }
    ],
    // Branch 2 (Production Écrite) - Points South-Eastwards
    [
        { x: 569.03, y: 539.86 }, { x: 587.71, y: 550.64 }, { x: 606.40, y: 561.43 },
        { x: 625.08, y: 572.21 }, { x: 643.77, y: 583.00 }, { x: 662.45, y: 593.79 },
        { x: 681.13, y: 604.58 }, { x: 699.81, y: 615.36 }, { x: 718.50, y: 626.15 },
        { x: 737.18, y: 636.94 }, { x: 755.86, y: 647.72 }, { x: 774.55, y: 658.51 }
    ],
    // Branch 3 (Production Orale) - Points South-Westwards
    [
        { x: 430.96, y: 539.86 }, { x: 412.28, y: 550.64 }, { x: 393.59, y: 561.43 },
        { x: 374.91, y: 572.21 }, { x: 356.23, y: 583.00 }, { x: 337.54, y: 593.79 },
        { x: 318.86, y: 604.58 }, { x: 300.18, y: 615.36 }, { x: 281.49, y: 626.15 },
        { x: 262.81, y: 636.94 }, { x: 244.13, y: 647.72 }, { x: 225.44, y: 658.51 }
    ],
    // Branch 4 (Lexique) - Points Northwards
    [
        { x: 500, y: 420.28700 }, { x: 500, y: 398.71323 }, { x: 500, y: 377.13945 }, { x: 500, y: 355.56568 },
        { x: 500, y: 333.99191 }, { x: 500, y: 312.41814 }, { x: 500, y: 290.84436 }, { x: 500, y: 269.27059 },
        { x: 500, y: 247.69682 }, { x: 500, y: 226.12305 }, { x: 500, y: 204.54927 }, { x: 500, y: 182.97550 }
    ],
    // Branch 5 (Structure de la Langue) - Points Southwards
    [
        { x: 500, y: 579.71300 }, { x: 500, y: 601.28677 }, { x: 500, y: 622.86055 }, { x: 500, y: 644.43432 },
        { x: 500, y: 666.00809 }, { x: 500, y: 687.58186 }, { x: 500, y: 709.15564 }, { x: 500, y: 730.72941 },
        { x: 500, y: 752.30318 }, { x: 500, y: 773.87695 }, { x: 500, y: 795.45073 }, { x: 500, y: 817.02448 }
    ]
];

const CENTER_X = 500;
const CENTER_Y = 500;
const BRANCHES = 6;
const LEVELS = 12;

async function updateSVG(levels) {
    const svg = document.querySelector('#svg-container svg');
    if (!svg) {
        console.error('SVG element not found');
        return;
    }

    const skillLevels = [
        levelMapping[levels.skill1] || 0, // Compréhension Orale
        levelMapping[levels.skill2] || 0, // Compréhension Écrite
        levelMapping[levels.skill3] || 0, // Production Écrite
        levelMapping[levels.skill4] || 0, // Production Orale
        levelMapping[levels.skill5] || 0, // Lexique
        levelMapping[levels.skill6] || 0  // Structure de la Langue
    ];

    const points = [];
    for (let branch = 0; branch < BRANCHES; branch++) {
        const level = skillLevels[branch];
        if (level > 0) {
            const point = INTERSECTION_POINTS[branch][level - 1];
            points.push(`${point.x},${point.y}`);
        } else {
            points.push(`${CENTER_X},${CENTER_Y}`);
        }
    }

    const connectedPoints = [
        points[0],
        points[4],
        points[1],
        points[2],
        points[5],
        points[3],
        points[0]
    ];

    let polygon = svg.querySelector('#skill-polygon');
    if (!polygon) {
        polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('id', 'skill-polygon');
        svg.querySelector('g').appendChild(polygon);
    }

    polygon.setAttribute('points', connectedPoints.join(' '));
    polygon.setAttribute('fill', COLORS.polygon);
    polygon.setAttribute('fill-opacity', '0.5');
    polygon.setAttribute('stroke', '#3498db');
    polygon.setAttribute('stroke-width', '2');
    polygon.setAttribute('stroke-linejoin', 'round');
    polygon.setAttribute('stroke-linecap', 'round');
}
