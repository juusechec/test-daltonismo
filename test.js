import assert from 'node:assert';
import { analyzeUserAnswers, platesConfig } from './logic.js';

console.log("🚀 Iniciando pruebas unitarias...");

// Escenario 1: Visión Normal Perfecta
const perfectAnswers = platesConfig.map(p => p.normal);
const resNormal = analyzeUserAnswers(perfectAnswers);
assert.strictEqual(resNormal.diagnosisId, 'NORMAL', "Debería detectar visión normal con todas correctas.");
console.log("✅ Test 1: Visión Normal Perfecta - PASÓ");

// Escenario 2: Protanopia (Falla láminas de color, ve el 6 en la lámina 3)
// Simulamos fallos en vanishing plates y respuesta '6' en la #3 (id 3 is index 2)
const protanAnswers = platesConfig.map((p, i) => {
    if (p.type === 'vanishing') return null; // No ve nada
    if (p.id === 3) return 6; // Ve el 6 (protan)
    if (p.id === 10) return 12; // Ve la de control
    return null;
});
const resProtan = analyzeUserAnswers(protanAnswers);
assert.strictEqual(resProtan.diagnosisId, 'PROTAN', "Debería detectar Protanopia.");
console.log("✅ Test 2: Protanopia - PASÓ");

// Escenario 3: Deuteranopia (Ve el 2 en la lámina 3)
const deutanAnswers = platesConfig.map((p, i) => {
    if (p.type === 'vanishing') return null;
    if (p.id === 3) return 2; // Ve el 2 (deutan)
    if (p.id === 10) return 12;
    return null;
});
const resDeutan = analyzeUserAnswers(deutanAnswers);
assert.strictEqual(resDeutan.diagnosisId, 'DEUTAN', "Debería detectar Deuteranopia.");
console.log("✅ Test 3: Deuteranopia - PASÓ");

// Escenario 4: Acromatopsia / Control Fallado
const failedControl = platesConfig.map(p => null);
const resFail = analyzeUserAnswers(failedControl);
assert.strictEqual(resFail.diagnosisId, 'INCONCLUSIVE', "Debería ser inconcluso si falla el control.");
console.log("✅ Test 4: Control Fallado - PASÓ");

console.log("\n✨ ¡Todas las pruebas han sido superadas con éxito!");
