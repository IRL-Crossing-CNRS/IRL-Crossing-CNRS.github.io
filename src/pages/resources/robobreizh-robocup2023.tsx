import { ExternalLink, FileText } from 'lucide-react';
import { GithubIcon } from '../../components/icons';
import CitationBlock from '../../components/resource-detail/CitationBlock';
import ResourceHero from '../../components/resource-detail/ResourceHero';
import Section from '../../components/resource-detail/Section';
import SidebarCard from '../../components/resource-detail/SidebarCard';
import SidebarLinks from '../../components/resource-detail/SidebarLinks';
import TableOfContents from '../../components/resource-detail/TableOfContents';
import { useRegisterSectionNav } from '../../context/SectionNavContext';
import resourcesData from '../../data/resources.json';
import type { Resource } from '../../types/resource';

const resource = (resourcesData as Resource[]).find((p) => p.slug === 'robobreizh-robocup2023')!;

const TEAM_URL = 'https://web.enib.fr/~robobreizh/src/en/links_en.html';
const VIDEO_URL = 'https://www.youtube.com/watch?v=g230jmHO40M';

const NAV_ITEMS = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'team', label: 'RoboBreizh' },
  { id: 'citation', label: 'Citation' },
];

const PLAIN_CITATION =
  'C. Buche, M. Neau, T. Ung, L. Li, S. Wang, and C. Le Bono, "RoboCup@Home SSPL Champion 2023: RoboBreizh, a Fully Embedded Approach," in RoboCup 2023: Robot World Cup XXVI, Lecture Notes in Computer Science, Springer, 2024, pp. 374-385.';

const BIBTEX = [
  '@incollection{buche2023robobreizh,',
  'title     = {{RoboCup@Home} {SSPL} Champion 2023: {RoboBreizh}, a Fully Embedded Approach},',
  'author    = {Buche, Cedric and Neau, Maelic and Ung, Thomas and Li, Louis and Wang, Sinuo and Le Bono, Cedric},',
  'booktitle = {RoboCup 2023: Robot World Cup XXVI},',
  'series    = {Lecture Notes in Computer Science},',
  'pages     = {374--385},',
  'year      = {2023},',
  'publisher = {Springer}',
  '}'
].join('\n');

export default function RoboBreizhRoboCup2023() {
  useRegisterSectionNav(NAV_ITEMS);

  const sidebarLinks = [
    { href: resource.resourceUrl, label: 'Paper (DOI)', icon: FileText },
    { href: VIDEO_URL, label: 'Video', icon: ExternalLink },
    { href: resource.repoUrl, label: 'Code', icon: GithubIcon },
    { href: TEAM_URL, label: 'Team page', icon: ExternalLink },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-16">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-16">
        <div className="max-w-3xl">
          <ResourceHero
            eyebrow="RoboCup@Home SSPL 2023"
            title={resource.title}
            authors={resource.authors}
            affiliations={resource.affiliations ?? []}
            repoUrl={resource.repoUrl}
            videoUrl={VIDEO_URL}
            extraLinks={[{ href: resource.resourceUrl!, label: 'Paper (DOI)', icon: FileText }]}
          />

          <Section id="abstract" title="Abstract" noDivider>
            <p>
              This paper presents the approach employed by the team RoboBreizh to win the
              championship in the 2023 RoboCup@Home Social Standard Platform League (SSPL).
              RoboBreizh decided to limit itself to an{' '}
              <strong className="font-semibold text-foreground">
                entirely embedded system with no connection to the internet and external devices
              </strong>
              . This article describes the design of embedded solutions including the global
              architecture, perception, navigation, interaction, reasoning and digital twin.
            </p>
          </Section>

          <Section id="team" title="RoboBreizh">
            <p>
              RoboBreizh is a French RoboCup@Home team based at{' '}
              <strong className="font-semibold text-foreground">CROSSING IRL 2010, CNRS</strong>.
              Competing with the Pepper robot platform, the team focuses on{' '}
              <strong className="font-semibold text-foreground">embedded artificial intelligence</strong>
              , running perception, navigation, interaction and reasoning fully onboard rather than
              relying on cloud-connected services.
            </p>
            <p>
              RoboBreizh won the RoboCup@Home SSPL world championship in{' '}
              <strong className="font-semibold text-foreground">2022 and 2023</strong>.
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
