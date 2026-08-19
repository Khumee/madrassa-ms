// Supported exam types and their display-name templates per locale. "%s" is
// replaced with the exam year, digit-formatted for that locale.
const EXAM_TYPES = ['mid_year', 'annual', 'quarterly', 'monthly'];

const NAME_TEMPLATES = {
    mid_year: {
        ar: 'الامتحان النصف سنوي لعام %sم',
        ur: 'نصف سالانہ امتحان سن %s',
        en: 'Mid-Year Examination %s'
    },
    annual: {
        ar: 'الامتحان السنوي لعام %sم',
        ur: 'سالانہ امتحان سن %s',
        en: 'Annual Examination %s'
    },
    quarterly: {
        ar: 'الامتحان الربع سنوي لعام %sم',
        ur: 'سہ ماہی امتحان سن %s',
        en: 'Quarterly Examination %s'
    },
    monthly: {
        ar: 'الامتحان الشهري لعام %sم',
        ur: 'ماہانہ امتحان سن %s',
        en: 'Monthly Examination %s'
    }
};

const EASTERN_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

function formatYear(year, locale) {
    const str = String(year);
    if (locale === 'ar' || locale === 'ur') {
        return str.replace(/[0-9]/g, d => EASTERN_DIGITS[d]);
    }
    return str;
}

// Compute an exam's display name for the CURRENT viewer's locale, so the
// same exam shows in Arabic, Urdu, or English wording depending on whoever
// is looking right now - not whichever language was active when it was
// created. Exams without a recognized exam_type/exam_year (including all
// exams created before this feature existed) fall back to their stored,
// free-text name unchanged.
function examDisplayName(exam, locale) {
    if (!exam) return '';
    if (!exam.exam_type || !exam.exam_year || !NAME_TEMPLATES[exam.exam_type]) return exam.name;
    const template = NAME_TEMPLATES[exam.exam_type][locale] || NAME_TEMPLATES[exam.exam_type].en;
    return template.replace('%s', formatYear(exam.exam_year, locale));
}

module.exports = { EXAM_TYPES, NAME_TEMPLATES, examDisplayName };
