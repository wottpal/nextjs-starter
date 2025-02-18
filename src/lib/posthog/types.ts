export enum PosthogEvent {
  PAGEVIEW = '$pageview',
  PAGELEAVE = '$pageleave',
}

// List of URL parameters used for tracking marketing campaigns and referrals
export const TRACKING_PARAMS = [
  'utm_source', // Identifies which site sent the traffic
  'utm_medium', // Marketing medium (e.g., cpc, email, social)
  'utm_campaign', // Specific campaign name
  'utm_content', // Used to differentiate similar content/ads
  'utm_term', // Identifies search terms paid for
  'gad_source', // Google AdWords click identifier
  'gclid', // Google click identifier
  'fbclid', // Facebook click identifier
  'msclkid', // Microsoft Advertising click identifier
  'dclid', // DoubleClick click identifier
  'ref', // Referrer parameter
  'source', // Generic source parameter
  'affiliate', // Affiliate tracking
  'campaign_id', // Campaign ID
  'referral', // Referral code
  'referrer', // Referral code
]
