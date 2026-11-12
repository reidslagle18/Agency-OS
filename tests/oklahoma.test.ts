import {it,expect,vi,afterEach} from 'vitest';
import {oklahomaProspects} from '../src/oklahoma';
import {companySchema,score} from '../src/model';
import handler from '../api/research';
afterEach(()=>vi.unstubAllEnvs());
it('loads nine real sourced Oklahoma candidates without fabricated qualification',()=>{const companies=oklahomaProspects();expect(companies).toHaveLength(9);for(const c of companies){expect(companySchema.safeParse(c).success).toBe(true);expect(c.state).toBe('OK');expect(c.sourceUrl.startsWith('https://')).toBe(true);expect(c.license).toBe('');expect(c.email).toBe('');expect(c.stage).toBe('Research');expect(score(c).total).toBeNull();}});
it('fails closed for live search without credentials',async()=>{vi.stubEnv('OPENAI_API_KEY','');let code=0;const r={setHeader:vi.fn(),status(n:number){code=n;return r;},json:vi.fn()};await handler({method:'POST',headers:{},body:{exclude:[]}},r);expect(code).toBe(503);expect(r.json).toHaveBeenCalledWith(expect.objectContaining({error:expect.stringContaining('starter list')}));});
it('blocks live search without a workspace token',async()=>{vi.stubEnv('OPENAI_API_KEY','test');vi.stubEnv('AGENCY_ACCESS_TOKEN','test-workspace-password-123456789');let code=0;const r={setHeader:vi.fn(),status(n:number){code=n;return r;},json:vi.fn()};await handler({method:'POST',headers:{},body:{exclude:[]}},r);expect(code).toBe(401);});
