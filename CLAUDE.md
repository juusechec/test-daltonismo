# CLAUDE.md

Guidance for Claude Code when working with this Ishihara color blindness test application.

## Project Overview

A web-based Ishihara plate test for detecting color blindness (protanopia/deuteranopia).

## File Structure

- `index.html` - Main HTML structure with 3 screens (start, test, results)
- `style.css` - CSS styling with animations and responsive design
- `script.js` - Frontend UI logic (navigation, answer input, results display)
- `logic.js` - Test logic (plate config, answer analysis, diagnosis calculation)
- `test-*.webp` - Ishihara plate images in `assets/images/`
- `config.yaml` - LiteLLM configuration for local LLM integration
- `run.bat` - Setup instructions for running with local LLM

## Development Tasks

### Run the Application

Open `index.html` in a browser. No build process required - it's a vanilla JS application.

### Adding New Plates

Edit `logic.js` `platesConfig` array:
```javascript
{ id: 13, img: 'test-13.webp', normal: 123, alt: [], type: 'vanishing' }
```

Types:
- `vanishing` - Plate appears to normal vision but invisible to color blind
- `transformation` - Different numbers visible to different vision types
- `diagnostic` - Helps distinguish protan vs deutan
- `control` - Verification plate

### Modifying Diagnosis Logic

Edit `analyzeUserAnswers()` and `getDiagnosisId()` in `logic.js`.

## Key Patterns

- Module exports: `platesConfig`, `analyzeUserAnswers`, `DIAGNOSIS_MESSAGES`
- Screen navigation via CSS class toggling (`active` class)
- User answers stored in `userAnswers` array during test
