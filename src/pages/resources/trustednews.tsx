import { ExternalLink } from 'lucide-react';
import CitationBlock from '../../components/resource-detail/CitationBlock';
import ResourceHero from '../../components/resource-detail/ResourceHero';
import Section from '../../components/resource-detail/Section';
import SidebarCard from '../../components/resource-detail/SidebarCard';
import SidebarLinks from '../../components/resource-detail/SidebarLinks';
import TableOfContents from '../../components/resource-detail/TableOfContents';
import { useRegisterSectionNav } from '../../context/SectionNavContext';
import resourcesData from '../../data/resources.json';
import type { Resource } from '../../types/resource';

const resource = (resourcesData as Resource[]).find((p) => p.slug === 'trustednews')!;

const SITE_URL = 'https://trustednews.fr/';

const PARTNERS = ['IRISA', 'LIP6', 'ENSTA Ouest-France', 'Airbus Defense and Space'];

const NAV_ITEMS = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'questions', label: 'Research questions' },
  { id: 'consortium', label: 'Consortium' },
  { id: 'citation', label: 'Citation' },
];

const PLAIN_CITATION = 'TrustedNews (ANR-25-ASM2-0003-01), 2026-2028.';

const BIBTEX = [
  '@misc{trustednews2026,',
  'title        = {TrustedNews: Trustworthy AI for the written Press},',
  'author       = {{IRL Crossing (Paul {\\\'E}gr{\\\'e}, coordinator)} and {IRISA} and {LIP6} and {ENSTA Ouest-France} and {Airbus Defense and Space}},',
  'year         = {2026},',
  'note         = {ANR-25-ASM2-0003-01, 2026--2028},',
  'howpublished = {\\url{https://trustednews.fr/}}',
  '}',
].join('\n');

export default function TrustedNews() {
  useRegisterSectionNav(NAV_ITEMS);

  const sidebarLinks = [{ href: SITE_URL, label: 'Project website', icon: ExternalLink }];

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-16">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-16">
        <div className="max-w-3xl">
          <ResourceHero
            eyebrow="ANR Research Project · 2026-2028"
            title={resource.title}
            authors={resource.authors}
            affiliations={[]}
            extraLinks={[{ href: SITE_URL, label: 'Project website', icon: ExternalLink }]}
          />

          <Section id="abstract" title="Abstract" noDivider>
            <p>
              TrustedNews is a research project on{' '}
              <strong className="font-semibold text-foreground">
                trustworthy AI for the written press
              </strong>
              , funded by AID and operated by ANR. The consortium links five partner institutions
              and involves AI research scientists and digital media practitioners working on the
              analysis of informational quality in press documents. We use neuro-symbolic methods
              to answer these questions, comparing corpora coming from different press groups and
              sources. We take advantage of the large data bank of the SIPA-Ouest France group,
              and rely on the expertise of journalists to define analytics with humans in the
              loop.
            </p>
          </Section>

          <Section id="questions" title="Research questions">
            <ul className="list-disc space-y-2 pl-5">
              <li>How objective or subjective is a press report?</li>
              <li>How vague or precise is it?</li>
              <li>Was the document AI generated?</li>
              <li>Which parts of a document are particularly checkworthy?</li>
              <li>Should the text be qualified as fake news and on what basis?</li>
              <li>
                Is the text driven by a specific agenda or framing, such as propagandist motives,
                or is the intention to transparently inform?
              </li>
              <li>How can the press make responsible use of generative AI?</li>
            </ul>
          </Section>

          <Section id="consortium" title="Consortium">
            <p>
              TrustedNews is coordinated by{' '}
              <strong className="font-semibold text-foreground">
                IRL Crossing (Paul Égré, coordinator)
              </strong>{' '}
              and brings together four partner institutions:{' '}
              {PARTNERS.map((partner, index) => (
                <span key={partner}>
                  <strong className="font-semibold text-foreground">{partner}</strong>
                  {index < PARTNERS.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </p>
          </Section>

          <Section id="citation" title="Citation">
            <CitationBlock plain={PLAIN_CITATION} bibtex={BIBTEX} />
          </Section>
        </div>

        <aside className="hidden lg:sticky lg:top-24 lg:block lg:space-y-6">
          <SidebarCard title="Links">
            <SidebarLinks links={sidebarLinks} />
          </SidebarCard>
          <SidebarCard title="Tags">
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </SidebarCard>
          <SidebarCard title="Table of Contents">
            <TableOfContents items={NAV_ITEMS} />
          </SidebarCard>
        </aside>
      </div>
    </div>
  );
}
