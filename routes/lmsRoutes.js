const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const DOWNLOADS_DIR = path.join(__dirname, '..', 'lms', 'downloads');
const MASTER_PDF = path.join(DOWNLOADS_DIR, 'Tawzeeh-Complete-Topic.pdf');
const NOTES_PDF = path.join(DOWNLOADS_DIR, 'Tawzeeh-Lecture-Notes.pdf');
const SLIDES_PDF = path.join(DOWNLOADS_DIR, 'Tawzeeh-Slides.pdf');

const BURHAN_MASTER_PDF = path.join(DOWNLOADS_DIR, 'Burhan-Tatbiq-Complete-Topic.pdf');
const BURHAN_NOTES_PDF = path.join(DOWNLOADS_DIR, 'Burhan-Tatbiq-Lecture-Notes.pdf');
const BURHAN_SLIDES_PDF = path.join(DOWNLOADS_DIR, 'Burhan-Tatbiq-Slides.pdf');

const AQEEDAH_MASTER_PDF = path.join(DOWNLOADS_DIR, 'Aqeedah-Complete-Topic.pdf');
const AQEEDAH_NOTES_PDF = path.join(DOWNLOADS_DIR, 'Aqeedah-Lecture-Notes.pdf');
const AQEEDAH_SLIDES_PDF = path.join(DOWNLOADS_DIR, 'Aqeedah-Slides.pdf');

// Ensure downloads folder exists
if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

// Download Complete Master Topic PDF (All-in-One File)
router.get('/api/lms/tarjeeh/pdf/master', async (req, res) => {
  try {
    if (!fs.existsSync(MASTER_PDF) || req.query.regenerate === 'true') {
      const { generateTawzeehPDFs } = require('../scripts/generate_tarjeeh_pdfs');
      await generateTawzeehPDFs();
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Tawzeeh-Complete-Study-Guide.pdf"');
    res.sendFile(MASTER_PDF);
  } catch (err) {
    console.error('Error serving Master PDF:', err);
    res.status(500).send('Error generating server-side PDF: ' + err.message);
  }
});

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

// ==========================================
// Burhan-Tatbiq (Sharh al-Aqaid) PDF Routes
// ==========================================

// Download Complete Master Topic PDF for Burhan-Tatbiq
router.get('/api/lms/burhan-tatbiq/pdf/master', async (req, res) => {
  try {
    if (!fs.existsSync(BURHAN_MASTER_PDF) || req.query.regenerate === 'true') {
      const { generateBurhanTatbiqPDFs } = require('../scripts/generate_burhan_tatbiq_pdfs');
      await generateBurhanTatbiqPDFs();
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Burhan-Tatbiq-Complete-Topic.pdf"');
    res.sendFile(BURHAN_MASTER_PDF);
  } catch (err) {
    console.error('Error serving Burhan Master PDF:', err);
    res.status(500).send('Error generating server-side PDF: ' + err.message);
  }
});

// Download Lecture Notes PDF for Burhan-Tatbiq
router.get('/api/lms/burhan-tatbiq/pdf/notes', async (req, res) => {
  try {
    if (!fs.existsSync(BURHAN_NOTES_PDF) || req.query.regenerate === 'true') {
      const { generateBurhanTatbiqPDFs } = require('../scripts/generate_burhan_tatbiq_pdfs');
      await generateBurhanTatbiqPDFs();
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Burhan-Tatbiq-Lecture-Notes.pdf"');
    res.sendFile(BURHAN_NOTES_PDF);
  } catch (err) {
    console.error('Error serving Burhan Notes PDF:', err);
    res.status(500).send('Error generating server-side PDF: ' + err.message);
  }
});

// Download Slides PDF for Burhan-Tatbiq
router.get('/api/lms/burhan-tatbiq/pdf/slides', async (req, res) => {
  try {
    if (!fs.existsSync(BURHAN_SLIDES_PDF) || req.query.regenerate === 'true') {
      const { generateBurhanTatbiqPDFs } = require('../scripts/generate_burhan_tatbiq_pdfs');
      await generateBurhanTatbiqPDFs();
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Burhan-Tatbiq-Slides.pdf"');
    res.sendFile(BURHAN_SLIDES_PDF);
  } catch (err) {
    console.error('Error serving Burhan Slides PDF:', err);
    res.status(500).send('Error generating server-side PDF: ' + err.message);
  }
});

// ==========================================
// Aqeedah (Session 3: Iman-e-Mufassal) PDF Routes
// ==========================================

// Download Complete Master Topic PDF for Aqeedah
router.get('/api/lms/aqeedah/pdf/master', async (req, res) => {
  try {
    if (!fs.existsSync(AQEEDAH_MASTER_PDF) || req.query.regenerate === 'true') {
      const { generateAqeedahPDFs } = require('../scripts/generate_aqeedah_pdfs');
      await generateAqeedahPDFs();
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Aqeedah-Complete-Topic.pdf"');
    res.sendFile(AQEEDAH_MASTER_PDF);
  } catch (err) {
    console.error('Error serving Aqeedah Master PDF:', err);
    res.status(500).send('Error generating server-side PDF: ' + err.message);
  }
});

// Download Lecture Notes PDF for Aqeedah
router.get('/api/lms/aqeedah/pdf/notes', async (req, res) => {
  try {
    if (!fs.existsSync(AQEEDAH_NOTES_PDF) || req.query.regenerate === 'true') {
      const { generateAqeedahPDFs } = require('../scripts/generate_aqeedah_pdfs');
      await generateAqeedahPDFs();
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Aqeedah-Lecture-Notes.pdf"');
    res.sendFile(AQEEDAH_NOTES_PDF);
  } catch (err) {
    console.error('Error serving Aqeedah Notes PDF:', err);
    res.status(500).send('Error generating server-side PDF: ' + err.message);
  }
});

// Download Slides PDF for Aqeedah
router.get('/api/lms/aqeedah/pdf/slides', async (req, res) => {
  try {
    if (!fs.existsSync(AQEEDAH_SLIDES_PDF) || req.query.regenerate === 'true') {
      const { generateAqeedahPDFs } = require('../scripts/generate_aqeedah_pdfs');
      await generateAqeedahPDFs();
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Aqeedah-Slides.pdf"');
    res.sendFile(AQEEDAH_SLIDES_PDF);
  } catch (err) {
    console.error('Error serving Aqeedah Slides PDF:', err);
    res.status(500).send('Error generating server-side PDF: ' + err.message);
  }
});

module.exports = router;
