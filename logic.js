export const platesConfig = [
    { id: 1, img: 'test-01.webp', normal: 7, alt: [], type: 'vanishing' },
    { id: 2, img: 'test-02.webp', normal: 6, alt: [], type: 'vanishing' },
    { id: 3, img: 'test-03.webp', normal: 26, protan: 6, deutan: 2, type: 'diagnostic' },
    { id: 4, img: 'test-04.webp', normal: 15, alt: [], type: 'vanishing' },
    { id: 5, img: 'test-05.webp', normal: 6, alt: [], type: 'vanishing' },
    { id: 6, img: 'test-06.webp', normal: 73, alt: [], type: 'vanishing' },
    { id: 7, img: 'test-07.webp', normal: 5, dalt: 2, type: 'transformation' },
    { id: 8, img: 'test-08.webp', normal: 16, alt: [], type: 'vanishing' },
    { id: 9, img: 'test-09.webp', normal: 45, alt: [], type: 'vanishing' },
    { id: 10, img: 'test-10.webp', normal: 12, common: 12, type: 'control' },
    { id: 11, img: 'test-11.webp', normal: 29, dalt: 70, type: 'transformation' },
    { id: 12, img: 'test-12.webp', normal: 8, dalt: 3, type: 'transformation' }
];

export function analyzeUserAnswers(userAnswers) {
    let normalScore = 0;
    let protanScore = 0;
    let deutanScore = 0;
    let daltScore = 0; 
    let controlFailed = false;

    userAnswers.forEach((ans, idx) => {
        const plate = platesConfig[idx];
        const isCorrect = ans === plate.normal;
        
        if (isCorrect) normalScore++;

        if (plate.type === 'diagnostic') {
            if (ans === plate.protan) protanScore += 2;
            if (ans === plate.deutan) deutanScore += 2;
        } else if (plate.type === 'transformation') {
            if (ans === plate.dalt) daltScore++;
        } else if (plate.type === 'control') {
            if (ans !== plate.normal) controlFailed = true;
        }
    });

    return {
        normalScore,
        protanScore,
        deutanScore,
        daltScore,
        controlFailed,
        diagnosisId: getDiagnosisId(normalScore, protanScore, deutanScore, controlFailed)
    };
}

function getDiagnosisId(normal, protan, deutan, controlFail) {
    if (controlFail && normal < 5) return 'INCONCLUSIVE';
    if (normal >= 10) return 'NORMAL';
    if (protan > deutan) return 'PROTAN';
    if (deutan > protan) return 'DEUTAN';
    if (normal < 10) return 'GENERAL_DEFICIENCY';
    return 'NORMAL';
}

export const DIAGNOSIS_MESSAGES = {
    'INCONCLUSIVE': {
        title: "Resultado Inconcluso",
        text: "No has superado la lámina de control o los aciertos son muy bajos. Esto podría deberse a una visión muy reducida o una deficiencia severa (Acromatopsia).",
        status: "dalt"
    },
    'NORMAL': {
        title: "Visión Normal",
        text: "¡Felicidades! Tu percepción del color parece ser normal. Has identificado correctamente la mayoría de las láminas.",
        status: "normal"
    },
    'PROTAN': {
        title: "Posible Protanopia / Protanomalía",
        text: "Tus respuestas sugieren una deficiencia en la percepción del color ROJO. Es común confundir rojos con grises o verdes oscuros.",
        status: "dalt"
    },
    'DEUTAN': {
        title: "Posible Deuteranopia / Deuteranomalía",
        text: "Tus respuestas sugieren una deficiencia en la percepción del color VERDE. Es el tipo más común de daltonismo.",
        status: "dalt"
    },
    'GENERAL_DEFICIENCY': {
        title: "Deficiencia de Color Detectada",
        text: "Has fallado varias láminas, lo que indica una dificultad para distinguir ciertos matices cromáticos (Daltonismo Rojo-Verde).",
        status: "dalt"
    }
};
