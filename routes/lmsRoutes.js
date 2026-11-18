const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const DOWNLOADS_DIR = path.join(__dirname, '..', 'lms', 'downloads');
const NOTES_PDF = path.join(DOWNLOADS_DIR, 'Tawzeeh-Lecture-Notes.pdf');
const SLIDES_PDF = path.join(DOWNLOADS_DIR, 'Tawzeeh-Slides.pdf');

// Ensure downloads folder exists
if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

// Download Lecture Notes PDF (Matn + Urdu Translation + Notes)
router.get('/api/lms/tarjeeh/pdf/notes', async (req, res) => {
  try {
    if (!fs.existsSync(NOTES_PDF) || req.query.regenerate === 'true') {
      const { generateTawzeehPDFs } = require('../scripts/generate_tarjeeh_pdfs');
      await generateTawzeehPDFs();
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Tawzeeh-Lecture-Notes-Complete.pdf"');
    res.sendFile(NOTES_PDF);
  } catch (err) {
    console.error('Error serving Notes PDF:', err);
    res.status(500).send('Error generating server-side PDF: ' + err.message);
  }
});

// Download Slides PDF (Visual Slides with Examples)
router.get('/api/lms/tarjeeh/pdf/slides', async (req, res) => {
  try {
    if (!fs.existsSync(SLIDES_PDF) || req.query.regenerate === 'true') {
      const { generateTawzeehPDFs } = require('../scripts/generate_tarjeeh_pdfs');
      await generateTawzeehPDFs();
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Tawzeeh-Slides-Visual-Deck.pdf"');
    res.sendFile(SLIDES_PDF);
  } catch (err) {
    console.error('Error serving Slides PDF:', err);
    res.status(500).send('Error generating server-side PDF: ' + err.message);
  }
});

module.exports = router;
