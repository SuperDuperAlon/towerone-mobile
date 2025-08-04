export const Strings = {
  // Common
  common: {
    submit: 'שלח',
    cancel: 'ביטול',
    save: 'שמור',
    edit: 'ערוך',
    delete: 'מחק',
    loading: 'טוען...',
    error: 'שגיאה',
    success: 'הצלחה',
    required: 'שדה חובה',
  },
  
  // Home Screen
  home: {
    greeting: 'שלום',
    apartment: 'דירה',
    reportIssue: 'דיווח תקלה',
    guests: 'אורחים',
    committeeMessages: 'הודעות הוועד',
    userDetails: 'פרטי משתמש',
  },
  
  // Report Issue Screen
  reportIssue: {
    title: 'דיווח תקלה',
    issueTitle: 'נושא התקלה',
    issueTitlePlaceholder: 'הכנס את נושא התקלה',
    issueDetails: 'פרטים נוספים',
    issueDetailsPlaceholder: 'תאר את התקלה בפירוט',
    attachImage: '📷 צרף תמונה',
    sendReport: 'שלח דיווח',
    fillAllFields: 'אנא מלא את כל השדות הנדרשים',
    reportSentSuccess: 'הדיווח נשלח בהצלחה',
    allIssues: 'כל הדיווחים',
    noIssues: 'אין דיווחים עדיין',
    status: 'סטטוס',
  },
  
  // Guests Screen
  guests: {
    myGuestsTitle: 'האורחים שלי',
    noGuests: 'אין אורחים להצגה.',
    visitDateLabel: 'תאריך ביקור',
    addGuestTitle: 'הוסף אורח חדש',
    editGuestTitle: 'ערוך אורח',
    nameRequired: 'יש להזין שם אורח',
    visitDateRequired: 'יש להזין תאריך ביקור',
    visitDateInvalid: 'פורמט תאריך לא תקין (YYYY-MM-DD)',
    guestAddedTitle: 'אורח נוסף',
    guestAddedMessage: 'האורח נוסף בהצלחה!',
    addGuestErrorTitle: 'שגיאה',
    addGuestErrorMessage: 'אירעה שגיאה בהוספת האורח',
  },
  
  // Validation Messages
  validation: {
    required: 'שדה זה הוא חובה',
    minLength: (min: number) => `מינימום ${min} תווים`,
    maxLength: (max: number) => `מקסימום ${max} תווים`,
    invalidEmail: 'כתובת אימייל לא תקינה',
    invalidPhone: 'מספר טלפון לא תקין',
  },
} as const;

export type StringKey = keyof typeof Strings; 