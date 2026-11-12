import 'fake-indexeddb/auto';
import {describe,it,expect,vi} from 'vitest';
import {newCompany,companySchema,score,outreach,invalidateResearch,type Company} from '../src/model';
import {allCompanies,saveCompanies,removeCompany,deduplicate} from '../src/db';
import {parseCsv,exportCsv,backup,restore} from '../src/csv';
import {mapLicense,NY_SOURCE} from '../src/discovery';
const fixture=():Company=>({...newCompany(),name:'Fictional test company',state:'NY'});
const evidence=()=>({id:'test-evidence',area:'Website' as const,sourceUrl:'https://example.com',excerpt:'Fictional test excerpt about a product catalog.',observedAt:new Date().toISOString(),severity:4,verified:true});
describe('Persistent database',()=>{
 it('creates, reads, updates and deletes records',async()=>{const c=fixture();await saveCompanies([c]);expect((await allCompanies()).find(x=>x.id===c.id)?.name).toBe(c.name);await saveCompanies([{...c,stage:'Proposal',notes:'Updated'}]);expect((await allCompanies()).find(x=>x.id===c.id)?.stage).toBe('Proposal');await removeCompany(c.id);expect((await allCompanies()).some(x=>x.id===c.id)).toBe(false);});
 it('validates a batch before writing anything',async()=>{const c=fixture();await expect(saveCompanies([c,{...fixture(),name:''}])).rejects.toThrow();expect((await allCompanies()).some(x=>x.id===c.id)).toBe(false);});
 it('deduplicates within imports and against saved records',()=>{const c=fixture();expect(deduplicate([c,{...c,id:'another'}],[]).unique).toHaveLength(1);expect(deduplicate([{...c,id:'new'}],[c]).skipped).toBe(1);});
 it('uses license identity when available',()=>{const c={...fixture(),license:'OCM-TEST'};expect(deduplicate([{...c,name:'Renamed company'}],[c]).skipped).toBe(1);});
});
describe('CSV and backup',()=>{
 it('handles quoted commas, multiline notes and Unicode',()=>{const c={...fixture(),name:'Fictional, test café',notes:'First line\nSecond line'};const p=parseCsv(exportCsv([c]));expect(p.errors).toHaveLength(0);expect(p.records[0].name).toBe(c.name);expect(p.records[0].notes).toBe(c.notes);});
 it('requires a name header',()=>expect(()=>parseCsv('website\nhttps://example.com')).toThrow('name column'));
 it('reports invalid rows while retaining valid ones',()=>{const p=parseCsv('name,email\nGood,\nBad,not-an-email');expect(p.records).toHaveLength(1);expect(p.errors[0]).toContain('Row 3');});
 it('rejects executable URLs',()=>expect(companySchema.safeParse({...fixture(),website:'javascript:alert(1)'}).success).toBe(false));
 it('escapes spreadsheet formulas on export',()=>expect(exportCsv([{...fixture(),name:'=HYPERLINK("bad")'}])).toContain("'="));
 it('preserves complete research in full backups',()=>{const c={...fixture(),evidence:[evidence()],draft:'Test draft'};expect(restore(backup([c]))).toEqual([c]);});
 it('rejects unsupported backup versions and invalid records',()=>{expect(()=>restore('{"version":2,"companies":[]}')).toThrow();expect(()=>restore('{"version":1,"companies":[{}]}')).toThrow();});
});
describe('Evidence and outreach',()=>{
 it('keeps unknown prospects unscored',()=>expect(score(fixture()).total).toBeNull());
 it('ignores unverified evidence',()=>expect(score({...fixture(),evidence:[{...evidence(),verified:false}]}).total).toBeNull());
 it('calculates a transparent score and coverage',()=>expect(score({...fixture(),fit:5,evidence:[evidence()]})).toEqual({total:88,need:48,fit:40,coverage:1}));
 it('does not inflate need by repeating evidence in one area',()=>{const c={...fixture(),evidence:[evidence(),{...evidence(),id:'second',severity:1}]};expect(score(c).need).toBe(48);});
 it('blocks drafting without verified evidence or with do not contact',()=>{expect(()=>outreach(fixture())).toThrow();expect(()=>outreach({...fixture(),evidence:[evidence()],doNotContact:true})).toThrow('do not contact');});
 it('grounds an editable draft in the supplied excerpt',()=>{const c={...fixture(),evidence:[evidence()]};expect(outreach(c)).toContain(evidence().excerpt);expect(outreach(c)).toContain(evidence().sourceUrl);});
 it('invalidates findings and approval after research changes',()=>{const c=invalidateResearch({...fixture(),draft:'Old draft',draftApproved:true,analysisAt:'old'});expect(c.draftApproved).toBe(false);expect(c.draft).toBe('');expect(c.findings).toEqual([]);});
});
describe('Official discovery mapping',()=>{
 it('preserves real API field names and provenance',()=>{const c=mapLicense({entity_name:'Fictional test entity',dba:'Fictional test trade name',license_type:'Adult-Use Retail Dispensary License',license_number:'TEST-ONLY',license_status:'Active',city:'Test city'});expect(c?.name).toBe('Fictional test trade name');expect(c?.category).toBe('Dispensary');expect(c?.sourceUrl).toBe(NY_SOURCE);expect(c?.licenseStatus).toBe('Active');expect(c?.email).toBe('');});
 it('rejects records without names',()=>expect(mapLicense({license_number:'test'})).toBeNull());
});
