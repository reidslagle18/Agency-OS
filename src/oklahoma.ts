import {newCompany,type Company} from './model';
export const OMMA_VERIFY='https://oklahoma.gov/omma/businesses/omma-verify.html';
export const researchDate='2026-11-12T17:30:00.000Z';
// Real public businesses researched from their own websites. Not fabricated examples,
// license verifications, or claims that these businesses need rebranding.
const sources:{name:string,url:string,category:Company['category'],excerpt:string}[]=[
 {name:'Sunday Extracts',url:'https://sundayextracts.com/',category:'Processor',excerpt:'Sunday Extracts is an Oklahoma extraction company and a 100% Oklahoma-owned family business.'},
 {name:'Resonant Cultivation',url:'https://resonantcultivation.com/',category:'Cultivator',excerpt:'Resonant Cultivation is a modestly sized, family run garden that transforms our core values into practice.'},
 {name:'Native Veteran',url:'https://nativeveteran.com/about/',category:'Cultivator',excerpt:'Native Veteran is a water only, living soil, medical cannabis grower and solvent-less processor in the state of Oklahoma.'},
 {name:'Biscuits',url:'https://www.getbakedbiscuits.com/',category:'Cultivator',excerpt:'Founded in 2019 on Native Oklahoma land'},
 {name:'Arcadia Brands',url:'https://www.arcadiabrands.com/',category:'Processor',excerpt:'Arcadia Brands was founded in Arcadia, Oklahoma'},
 {name:'Medicine Man Cannabis',url:'https://www.medicinemancannabis.com/',category:'Other',excerpt:"A premium cannabis brand that's #Homegrown here in Oklahoma"},
 {name:'Fumo Oklahoma',url:'https://fumooklahoma.com/',category:'Other',excerpt:"oklahoma's premeir cannabis lifestyle brand EST:2020"},
 {name:'Mosaic+',url:'https://www.mosaicdispensary.com/resonant-cultivation',category:'Dispensary',excerpt:'Resonant Cultivation is Mosaic\'s in-house cannabis operation.'},
 {name:'Purple Haze',url:'https://www.purplehazeok.com/about-1',category:'Dispensary',excerpt:'With dispensary locations in Weatherford, Kingfisher, and soon Oklahoma City'}
];
export function oklahomaProspects():Company[]{return sources.map(s=>({...newCompany(),name:s.name,website:new URL(s.url).origin,state:'OK',category:s.category,sourceUrl:s.url,sourceLabel:'Company website / Oklahoma research',retrievedAt:researchDate,licenseStatus:'Not independently verified',nextAction:'Verify OMMA license and review brand materials',notes:`Discovered from the company’s own public website on November 12, 2026. Source statement: ${s.excerpt}\n\nThis is a research candidate, not a qualified lead or a claim of poor branding. Category reflects website description; the legal license entity may differ. Verify current licensing through ${OMMA_VERIFY}. Resonant Cultivation and Mosaic describe a shared operation; treat them as related accounts, not independent opportunities.`}));}
