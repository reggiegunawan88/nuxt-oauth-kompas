// Onboarding Event Tracker
export const onboardingEventList = {
  /* Download page */
  clickSendLink: {
    event: 'app_sendlink',
    eventName: 'app_sendlink',
    eventCategory: 'Onboarding',
    eventAction: 'Click button "kirim tautan"',
  },
  successSendWaLink: {
    event: 'app_success',
    eventName: 'app_success',
    eventCategory: 'Onboarding',
    eventAction: 'WA berhasil terkirim',
  },
  failedSendWaLink: {
    event: 'app_sendfailed',
    eventName: 'app_sendfailed',
    eventCategory: 'Onboarding',
    eventAction: 'Error gagal kirim tautan',
  },
  skipPage: {
    event: 'app_skip',
    eventName: 'app_skip',
    eventCategory: 'Onboarding',
    eventAction: 'Click button "nanti saja"',
  },

  /* Thank you page (subscription) */
  subsContinueReading: {
    event: 'tysubber_next',
    eventName: 'tysubber_next',
    eventCategory: 'Onboarding',
    eventAction: 'Click button "lanjut baca"',
  },
  clickArticleSubs: {
    event: 'tysubber_recommender',
    eventName: 'tysubber_recommender',
    eventCategory: 'Onboarding',
    eventAction: 'Click card artikel rekomendasi',
  },

  /* Thank you page (register only) */
  regonContinueReading: {
    event: 'tyregon_next',
    eventName: 'tyregon_next',
    eventCategory: 'Onboarding',
    eventAction: 'Click button "lanjut baca"',
  },
  regonTurvis: {
    event: 'tyregon_turvis',
    eventName: 'tyregon_turvis',
    eventCategory: 'Onboarding',
    eventAction: 'Click area rubrik Tutur Visual',
  },
  regonVideo: {
    event: 'tyregon_video',
    eventName: 'tyregon_video',
    eventCategory: 'Onboarding',
    eventAction: 'Click area rubrik Video',
  },
  regonInfografik: {
    event: 'tyregon_infografik',
    eventName: 'tyregon_infografik',
    eventCategory: 'Onboarding',
    eventAction: 'Click area rubrik Infografik',
  },
  regonRiset: {
    event: 'tyregon_riset',
    eventName: 'tyregon_riset',
    eventCategory: 'Onboarding',
    eventAction: 'Click area rubrik Riset',
  }
}
