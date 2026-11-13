import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
  {
    id: 2,
    date: '2026-10-18',
    meetingType: 'testimony',
    presiding: 'Bishop Anderson',
    conducting: 'Brother Martinez',
    announcements: ['Missionary preparation class at 5:00 p.m.'],
    openingHymn: { number: 100, title: 'Nearer, My God, to Thee' },
    openingPrayer: 'Sister Garcia',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 196, title: 'Jesus, Once of Humble Birth' },
    speakers: [],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Brother Wilson'
  },
  {
    id: 3,
    date: '2026-10-25',
    meetingType: 'stake',
    presiding: 'President Thompson',
    conducting: 'Bishop Anderson',
    announcements: ['Stake conference begins at 10:00 a.m.'],
    openingHymn: { number: 6, title: 'Redeemer of Israel' },
    openingPrayer: 'Sister Lee',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 0, title: 'No sacrament meeting' },
    speakers: [
      { name: 'President Thompson', topic: 'Strengthening our homes', type: 'speaker' }
    ],
    closingHymn: { number: 293, title: 'Each Life That Touches Ours for Good' },
    closingPrayer: 'Brother Clark'
  },
  {
    id: 4,
    date: '2026-11-01',
    meetingType: 'regular',
    presiding: 'Bishop Anderson',
    conducting: 'Brother Martinez',
    announcements: ['Fast offering envelopes are available in the foyer.'],
    openingHymn: { number: 66, title: 'Rejoice, the Lord Is King!' },
    openingPrayer: 'Sister Nelson',
    wardBusiness: [{ description: 'Welcome new members to the ward' }],
    stakeBusiness: false,
    sacramentHymn: { number: 174, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Brother Young', topic: 'The power of prayer', type: 'speaker' },
      { name: 'Sister Perez', topic: 'Finding peace through Christ', type: 'speaker' }
    ],
    closingHymn: { number: 70, title: 'Sing Praise to Him' },
    closingPrayer: 'Brother Hall'
  },
  {
    id: 5,
    date: '2026-11-08',
    meetingType: 'general',
    presiding: 'Area Seventy Roberts',
    conducting: 'Bishop Anderson',
    announcements: ['Combined meeting for all local wards.'],
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Sister Rivera',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 0, title: 'No sacrament meeting' },
    speakers: [
      { name: 'Area Seventy Roberts', topic: 'Discipleship in daily life', type: 'speaker' },
      { name: 'Ward Choir', topic: 'I Know That My Redeemer Lives', type: 'musical-number' }
    ],
    closingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
    closingPrayer: 'Brother King'
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}
