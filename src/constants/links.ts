export const TERM_USE_LINK = 'https://twitter.com'

export const PRIVACY_POLICY_LINK = 'https://twitter.com'

export const LITEPAPER_LINK = 'https://twitter.com'

export const COMMUNIT_ITEMS = [
  {
    type: 'link',
    label: 'Twitter',
    key: 'twitter',
    icon: '/community/twitter.svg',
    action: 'https://twitter.com',
  },
  {
    type: 'link',
    label: 'Telegram',
    key: 'telegram',
    icon: '/community/telegram.svg',
    action: 'https://twitter.com',
  },
  {
    type: 'link',
    key: 'discord',
    label: 'Discord',
    icon: '/community/discord.svg',
    action: 'https://twitter.com',
  },
]

export const DOCUMENT_ITEMS = [
  {
    type: 'link',
    key: 'term',
    label: 'Term of Use',
    icon: '',
    action: TERM_USE_LINK,
  },
  {
    type: 'link',
    key: 'privacy',
    label: 'Privacy Policy',
    icon: '',
    action: PRIVACY_POLICY_LINK,
  },
  {
    type: 'link',
    key: 'Litepaper',
    label: 'Litepaper',
    icon: '',
    action: LITEPAPER_LINK,
  },
]
