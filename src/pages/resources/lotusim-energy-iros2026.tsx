import { FileText, Presentation } from 'lucide-react';
import { GithubIcon, YoutubeIcon } from '../../components/icons';
import CitationBlock from '../../components/resource-detail/CitationBlock';
import Figure from '../../components/resource-detail/Figure';
import ResourceHero from '../../components/resource-detail/ResourceHero';
import Section from '../../components/resource-detail/Section';
import SidebarCard from '../../components/resource-detail/SidebarCard';
import SidebarLinks from '../../components/resource-detail/SidebarLinks';
import TableOfContents from '../../components/resource-detail/TableOfContents';
import { useRegisterSectionNav } from '../../context/SectionNavContext';
import resourcesData from '../../data/resources.json';
import { getProject, getProjectResources } from '../../lib/projects';
import type { Resource } from '../../types/resource';

import architectureImg from '../../assets/resources/lotusim-energy-iros2026/architecture.png';
import surfaceAgentsImg from '../../assets/resources/lotusim-energy-iros2026/surface-agents.jpg';
import aerialWindImg from '../../assets/resources/lotusim-energy-iros2026/aerial-wind-1.jpg';
import farmUnderwaterImg from '../../assets/resources/lotusim-energy-iros2026/farm-underwater-1.jpg';
import inspectionPathImg from '../../assets/resources/lotusim-energy-iros2026/inspection-path.jpg';
import aisPlotImg from '../../assets/resources/lotusim-energy-iros2026/ais-plot.jpg';
import faultDetectionImg from '../../assets/resources/lotusim-energy-iros2026/fault-detection-1.png';
import batteryMonitoringImg from '../../assets/resources/lotusim-energy-iros2026/battery-monitoring.jpg';
import vrElectricityImg from '../../assets/resources/lotusim-energy-iros2026/vr-electricity-1.jpg';

const resource = (resourcesData as Resource[]).find((p) => p.slug === 'lotusim-energy-iros2026')!;
const project = getProject(resource.project);
const projectResourceCount = getProjectResources(resource.project).length;

const VIDEO_URL = 'https://tinyurl.com/5ajb4thj';
const WORKSHOP_URL = 'https://sites.google.com/view/aquasim-v2/';

const NAV_ITEMS = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'environment', label: 'Environment Model' },
  { id: 'autonomy', label: 'Autonomous Offshore O&M' },
  { id: 'inspection', label: 'Inspection Scenario' },
  { id: 'interaction', label: 'Human-in-the-Loop' },
  { id: 'citation', label: 'Citation' },
];

const PLAIN_CITATION =
  'J. Grosset, M. Dubromel, H. Lechêne, Q. Arzel, and C. Buche, "LOTUSim-Energy: A Maritime Simulator for Human-Drone Interaction in Autonomous Offshore Operation & Maintenance," IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS) Workshop, 2026.';

const BIBTEX = [
  '@inproceedings{grosset2026lotusimenergy,',
  'title     = {{LOTUSim-Energy}: A Maritime Simulator for Human-Drone Interaction in Autonomous Offshore Operation \\& Maintenance},',
  'author    = {Grosset, Juliette and Dubromel, Marie and Lechene, Helene and Arzel, Quentin and Buche, Cedric},',
  'booktitle = {IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS) AQ²UASIM},',
  'year      = {2026},',
  'publisher = {IEEE}',
  '},'
].join('\n');

export default function LotuSimEnergyIros2026() {
  useRegisterSectionNav(NAV_ITEMS);

  const sidebarLinks = [
    { href: resource.pdfUrl, label: 'Paper (PDF)', icon: FileText },
    { href: VIDEO_URL, label: 'Video', icon: YoutubeIcon },
    { href: resource.repoUrl, label: 'Code', icon: GithubIcon },
    { href: WORKSHOP_URL, label: 'Workshop', icon: Presentation },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-16">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-16">
        <div className="max-w-3xl">
          <ResourceHero
            eyebrow="IEEE/RSJ IROS 2026 Workshop"
            title={resource.title}
            authors={resource.authors}
            affiliations={resource.affiliations ?? []}
            projectSlug={project.slug}
            projectName={project.name}
            resourceCount={projectResourceCount}
            pdfUrl={resource.pdfUrl}
            repoUrl={resource.repoUrl}
            videoUrl={VIDEO_URL}
            extraLinks={[{ href: WORKSHOP_URL, label: 'Workshop', icon: Presentation }]}
          />

          <Section id="abstract" title="Abstract" noDivider>
            <p>
              Offshore maintenance requires operations in the air, the surface, and the subsea domain,
              and includes human supervision. LOTUSim-Energy is a{' '}
              <strong className="font-semibold text-foreground">real-time maritime simulator</strong>{' '}
              designed for multi-domain human-drone interaction for offshore operation and
              maintenance. The platform unifies heterogeneous unmanned vehicles (UAVs, USVs, AUVs, ROVs)
              within a distributed architecture coupling environmental forcing (wind, waves, currents)
              and provides immersive user interfaces for supervision (desktop and virtual reality).
            </p>
            <p>
              A structured{' '}
              <strong className="font-semibold text-foreground">offshore task library</strong> enables
              repeatable evaluation of autonomy stacks under realistic metocean disturbances. The
              simulator supports realistic physics, energy-aware battery modeling, and fault-detection
              pipelines as modular validation tools. System-level performance is demonstrated on a
              multi-domain inspection scenario for monopile and transition piece structure, evaluating
              the reliability of an integrated waypoint-follower plugin and AIS-referenced trajectory
              tracking under real-time energy monitoring, as a step toward de-risking sea deployment.
            </p>
            <Figure
              src={farmUnderwaterImg}
              alt="Illustration of a wind turbine farm scenario, and BlueROV and LRAUV vehicles operating underwater."
              caption="Fig. 4 - A wind turbine farm scenario, with BlueROV and LRAUV agents operating underwater alongside surface and aerial assets."
            />
          </Section>

          <Section id="architecture" title="Architecture">
            <p>
              LOTUSim-Energy is a distributed, server/client simulation framework built on{' '}
              <strong className="font-semibold text-foreground">LOTUSim</strong>. Gazebo orchestrates
              asset management and simulation timing via a deterministic step scheduler, while three
              client modules handle physics (LOTUSim-Xdyn), agent interaction (ROS2), and rendering
              (Unity, optional and disable-able for large-scale training). At each timestep, Gazebo
              queries the three client classes through dedicated plugins and barrier-synchronises their
              results before advancing, supporting both real-time (RTF&nbsp;&asymp;&nbsp;1) and
              accelerated-time (RTF&nbsp;&gt;&nbsp;1) runs.
            </p>
            <p>
              For human-robot interaction, Unity provides desktop and VR operator interfaces,
              supports authority handover, and logs operator actions for repeatable studies. Two
              specialised roles are supported: an{' '}
              <strong className="font-semibold text-foreground">Embodied Operator</strong>, with
              physics-constrained manual control for mission rehearsal, and a{' '}
              <strong className="font-semibold text-foreground">Supervisor/Spectator</strong>, with a
              free-flight mode for oversight and dynamic waypoint placement.
            </p>
            <Figure
              src={architectureImg}
              alt="LOTUSim-Energy architecture diagram showing Gazebo orchestrating physics, agent interaction, and rendering client modules."
              caption="Fig. 1 - LOTUSim-Energy architecture: Gazebo's deterministic step scheduler barrier-synchronises the physics, agent-interaction, and rendering clients."
              light
            />
          </Section>

          <Section id="environment" title="Environment Model">
            <p>
              Surface vessel dynamics are simulated with{' '}
              <a
                href="https://gitlab.com/sirehna_naval_group/sirehna/xdyn"
                target="_blank"
                rel="noreferrer noopener"
                className="text-accent underline-offset-4 hover:underline"
              >
                Xdyn
              </a>
              , implementing Fossen's equations of motion with diffraction and Froude-Krylov
              forces and linear Airy wave theory. Aerial wind dynamics use Gazebo's wind plugin, letting
              all aerial drones respond consistently to a configurable, spatially and temporally varying
              wind field.
            </p>
            <p>
              Underwater currents follow an{' '}
              <strong className="font-semibold text-foreground">Ekman-inspired, three-layer model</strong>{' '}
              (a wind-driven surface spiral, a geostrophic interior unaffected by either boundary, and a
              bottom Ekman spiral shaped by frictional drag and bathymetry), implemented in a forked
              extension, LOTUSim-Xdyn, and calibrated day-to-day against Copernicus Marine
              Service metocean products to forecast physics-consistent subsurface currents.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Figure
                src={surfaceAgentsImg}
                alt="Surface vessel agents deployed in LOTUSim-Energy, affected by realistic wave and wind forcing."
                caption="Fig. 2 - Surface agents in LOTUSim-Energy, driven by realistic wave and wind forcing."
              />
              <Figure
                src={aerialWindImg}
                alt="X500 drone agents in LOTUSim-Energy, and the user interface for setting wind forces."
                caption="Fig. 3 - X500 drone agents, and the interface used to configure wind forces."
              />
            </div>
          </Section>

          <Section id="autonomy" title="Autonomous Offshore O&M">
            <p>
              LOTUSim-Energy ships with a pre-built Unity scene of a multi-turbine offshore wind farm,
              wired to the vehicle stack so users can spawn UAV/USV/ROV agents and rehearse O&amp;M
              primitives (launch/recovery, waypoint transit, station-keeping, blade-face inspection
              passes, subsea transects) while logging time and energy budgets. Two
              representative underwater agents are supported: a tethered{' '}
              <strong className="font-semibold text-foreground">BlueROV</strong> for close-range visual
              inspection and cathodic-protection checks, and a long-endurance{' '}
              <strong className="font-semibold text-foreground">LRAUV</strong> for wide-area surveys and
              cable or structure transects, alongside X500 aerial and WAMV surface vehicle models.
            </p>
            <p>
              A modular{' '}
              <strong className="font-semibold text-foreground">battery simulator plugin</strong> couples
              state-of-charge estimation to each vehicle's instantaneous propulsive effort rather than a
              constant power draw, publishing real-time voltage and charge for energy-aware mission
              planning. A YOLO-based vision pipeline detects structural anomalies (cracks and corrosion)
              from onboard cameras.
            </p>
            <Figure
              src={faultDetectionImg}
              alt="Structural faults such as corrosion and cracks detected underwater by a BlueROV and aerially by an X500 drone."
              caption="Fig. 7 - Corrosion and crack detection by BlueROV (underwater) and X500 (aerial) onboard vision."
            />
          </Section>

          <Section id="inspection" title="Inspection Scenario">
            <p>
              System-level performance is demonstrated on a{' '}
              <strong className="font-semibold text-foreground">multi-domain inspection path</strong>{' '}
              for a monopile and transition piece: a surface vessel follows a wide-area AIS-referenced
              trajectory for situational awareness, a BlueROV2 performs close-range underwater inspection
              of submerged structural components, and X500 drones conduct aerial inspection of the
              monopile and above-water structures.
            </p>
            <p>
              The USV waypoint follower is driven along a real AIS track of a small Class B vessel,
              illustrating AIS-referenced guidance under authentic GNSS noise and independently
              controlled disturbances rather than a controller-tracking benchmark.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Figure
                src={inspectionPathImg}
                alt="Cross-domain inspection path spanning surface, underwater, and aerial waypoint sequences."
                caption="Fig. 5 - Cross-domain inspection path for the monopile and transition-piece structure."
              />
              <Figure
                src={aisPlotImg}
                alt="Real AIS plot compared to the simulated plot for ten reference points."
                caption="Fig. 6 - Real AIS track compared against the simulated trajectory."
              />
            </div>
          </Section>

          <Section id="interaction" title="Human-in-the-Loop">
            <p>
              Operators interact through a dual-layer interface: monitoring AIS data for vessels
              transiting the mission zone, and, for inspection tasks, precision control of the onboard
              camera for structural assessment. The battery plugin tracks vehicle capacity and discharge
              in real time, letting operators adapt inspection intensity to preserve reserve for safe
              recovery. Leap Motion further lets operators control the embarked camera via hand
              gestures without a full VR headset, and the same desktop/VR interface drives an education
              mode with real-time wind and weather controls for stakeholder outreach.
            </p>
            <Figure
              src={batteryMonitoringImg}
              alt="Real-time monitoring of LRAUV battery capacity and discharge via the battery plugin."
              caption="Fig. 8 - Real-time LRAUV battery capacity and discharge, monitored via the plugin."
            />
            <Figure
              src={vrElectricityImg}
              alt="A user interacting through virtual reality, and electricity production monitored depending on wind strength."
              caption="Fig. 9 - VR interaction, and electricity production monitored as a function of wind strength."
            />
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
