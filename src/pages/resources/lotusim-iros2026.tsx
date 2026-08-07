import { FileText, PlayCircle } from 'lucide-react';
import { GithubIcon, ArxivIcon } from '../../components/icons';
import CitationBlock from '../../components/resource-detail/CitationBlock';
import Figure from '../../components/resource-detail/Figure';
import ResourceHero from '../../components/resource-detail/ResourceHero';
import Section from '../../components/resource-detail/Section';
import SidebarCard from '../../components/resource-detail/SidebarCard';
import SidebarLinks from '../../components/resource-detail/SidebarLinks';
import StatGrid from '../../components/resource-detail/StatGrid';
import TableOfContents from '../../components/resource-detail/TableOfContents';
import { useRegisterSectionNav } from '../../context/SectionNavContext';
import resourcesData from '../../data/resources.json';
import { getProject, getProjectResources } from '../../lib/projects';
import type { Resource } from '../../types/resource';

import architectureImg from '../../assets/resources/lotusim-iros2026/architecture.png';
import natureInterfaceImg from '../../assets/resources/lotusim-iros2026/natural-interface.jpg';
import overviewImg from '../../assets/resources/lotusim-iros2026/overview.jpg';
import rtfImg from '../../assets/resources/lotusim-iros2026/rtf-vs-agents.png';
import simToRealImg from '../../assets/resources/lotusim-iros2026/sim-to-real-testpool.png';
import vrInteractionImg from '../../assets/resources/lotusim-iros2026/vr-interaction.jpg';

const resource = (resourcesData as Resource[]).find((p) => p.slug === 'lotusim-iros2026')!;
const project = getProject(resource.project);
const projectResourceCount = getProjectResources(resource.project).length;

const VIDEO_ID = 'iXDz8ZqSpq4';
const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;

const NAV_ITEMS = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'architecture', label: 'System Architecture' },
  { id: 'underwater-currents', label: 'Underwater Current Model' },
  { id: 'performance', label: 'Real-Time Performance' },
  { id: 'immersive-interaction', label: 'Immersive Interaction' },
  { id: 'sim-to-real', label: 'Sim-to-Real Validation' },
  { id: 'video', label: 'Video' },
  { id: 'citation', label: 'Citation' },
];

const PLAIN_CITATION =
  'C. Buche, J. Grosset, H. Lechêne, M. Dubromel, P. Havez-Bodivit, M. Neo, and J. Prodhon, "LOTUSim: Multi-Domain Simulator for Marine Robotics," in Proc. IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2026.';

const BIBTEX = [
  '@inproceedings{LOTUSim26iros,',
  'title     = {{LOTUSim}: Multi-Domain Simulator for Marine Robotics},',
  'author    = {Buche, Cedric and Grosset, Juliette and Lechene, Helene and Dubromel, Marie and Havez-Bodivit, Pierig and Neo, Malcom and Prodhon, Julien},',
  'booktitle = {2026 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)},',
  'year      = {2026},',
  'publisher = {IEEE}',
  '},'
].join('\n');

export default function LotuSimIros2026() {
  useRegisterSectionNav(NAV_ITEMS);

  const sidebarLinks = [
    { href: resource.pdfUrl, label: 'Paper (PDF)', icon: FileText },
    { href: resource.arxivUrl, label: 'arXiv', icon: ArxivIcon },
    { href: VIDEO_URL, label: 'Video', icon: PlayCircle },
    { href: resource.repoUrl, label: 'Code', icon: GithubIcon },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-16">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-16">
        <div className="max-w-3xl">
          <ResourceHero
            eyebrow="IEEE/RSJ IROS 2026"
            title={resource.title}
            authors={resource.authors}
            affiliations={resource.affiliations ?? []}
            projectSlug={project.slug}
            projectName={project.name}
            resourceCount={projectResourceCount}
            pdfUrl={resource.pdfUrl}
            repoUrl={resource.repoUrl}
            arxivUrl={resource.arxivUrl}
            videoUrl={VIDEO_URL}
          />


          <Section id="abstract" title="Abstract" noDivider>
            <p>
              Simulation is <strong className="font-semibold text-foreground">essential</strong> for
              maritime robotics, supporting operator training, mission rehearsal, and
              human&ndash;vehicle interaction in environments where real-world testing is
              <strong className="font-semibold text-foreground"> costly or hazardous</strong>. Existing
              simulators focus primarily on autonomy systems and often lack human-in-the-loop
              interaction and realistic environmental physics. This paper introduces LOTUSim, an{' '}
              <strong className="font-semibold text-foreground">open-source, real-time maritime simulator</strong>{' '}
              supporting multi-user interaction across aerial, surface, and underwater robotic systems
              for coordinated naval-style operations.
            </p>
            <p>
              The first contribution of this work is{' '}
              <strong className="font-semibold text-foreground">enabling real-time interactive performance</strong>{' '}
              for users while ensuring scalability to large fleets operating within a shared interactive
              simulation environment. Validation demonstrates robust human-in-the-loop performance,
              maintaining strict real-time execution and high visual fidelity while scaling to large
              heterogeneous maritime drone swarms. The second contribution is a{' '}
              <strong className="font-semibold text-foreground">computationally efficient, Ekman-inspired layered underwater current model</strong>{' '}
              that captures wind-driven, depth-dependent flow dynamics with sufficient physical fidelity
              for large-scale simulations. Validation against ocean reanalysis data demonstrates
              substantially improved accuracy compared to commonly used stochastic Gauss&ndash;Markov
              current models. These results confirm LOTUSim&rsquo;s suitability as a simulation platform
              for operator-in-the-loop maritime robotics research.
            </p>
            <Figure
              src={overviewImg}
              alt="LOTUSim rendering a heterogeneous fleet of aerial drones, a surface vessel, and underwater vehicles in a shared naval-style scenario."
              caption="Fig. 1 - LOTUSim, an open multi-domain simulator: aerial, surface, and underwater assets sharing a single simulation environment."
            />
          </Section>

          <Section id="architecture" title="System Architecture">
            <p>
              LOTUSim leverages{' '}
              <strong className="font-semibold text-foreground">ROS2, Gazebo, and Unity</strong> as a
              distributed, server-client simulation framework. Gazebo orchestrates assets and physics,
              ROS2 handles multi-agent communication and integration with real drones, and Unity serves
              as the primary visualisation and interaction engine - chosen over engines with
              superior photorealism for its{' '}
              <strong className="font-semibold text-foreground">extensibility and native support for immersive interfaces</strong>{' '}
              such as VR and Leap Motion.
            </p>
            <p>
              The core module interfaces with three client types - physics computation,
              rendering, and agent interaction - each supporting different communication
              protocols, including ROS2, WebSocket, and TCP/IP. For surface ships and underwater
              drones, LOTUSim connects to{' '}
              <a
                href="https://gitlab.com/sirehna_naval_group/sirehna/xdyn"
                target="_blank"
                rel="noreferrer noopener"
                className="text-accent underline-offset-4 hover:underline"
              >
                Xdyn
              </a>
              , a lightweight ship-dynamics engine, via a dedicated extension,{' '}
              <a
                href="https://github.com/naval-group/LOTUSim-Xdyn"
                target="_blank"
                rel="noreferrer noopener"
                className="text-accent underline-offset-4 hover:underline"
              >
                LOTUSim-Xdyn
              </a>
              . Shared missions are{' '}
              <strong className="font-semibold text-foreground">synchronised across operators in real time</strong>{' '}
              through Photon Unity Networking (PUN2) over a cloud-relay architecture.
            </p>
            <Figure
              src={architectureImg}
              alt="System architecture diagram of LOTUSim showing the rendering, physics server, core, multi-user support, and external entity modules connected via ROS2 and WebSocket."
              caption="Fig. 2 - LOTUSim's core orchestrates physics, rendering, and sensing through Gazebo, while Unity handles visualisation and PUN2 synchronises world state across concurrent operators."
              light
            />
          </Section>

          <Section id="underwater-currents" title="Underwater Current Model">
            <p>
              Most existing maritime simulators represent ocean currents with a constant unidirectional
              force or a stochastic Gauss&ndash;Markov process - efficient, but{' '}
              <strong className="font-semibold text-foreground">insufficient for naval operations</strong>{' '}
              where depth-dependent, wind-driven currents strongly affect vehicle behaviour and sensor
              performance. LOTUSim instead divides the water column into{' '}
              <strong className="font-semibold text-foreground">three vertical zones</strong> inspired by
              classical Ekman theory: a wind-driven spiral at the surface, a geostrophic interior
              largely unaffected by surface or bottom friction, and a bottom Ekman spiral shaped by the
              seabed.
            </p>
            <p>
              The model was{' '}
              <strong className="font-semibold text-foreground">validated against Copernicus in-situ ocean reanalysis data</strong>{' '}
              off the coast of Brest, France, across five days, four daily time samples, and depths from
              0.5&nbsp;m to 1,000&nbsp;m, then compared to the Gauss&ndash;Markov baseline used in
              simulators such as UUVSim and DAVE.
            </p>
            <StatGrid
              stats={[
                {
                  value: '40–85%',
                  label: 'Lower current-prediction error (MAE/RMSE) than Gauss–Markov, depending on depth',
                },
                { value: '3 layers', label: 'Surface, geostrophic, and bottom Ekman zones' },
                { value: '2,800 pts', label: 'Copernicus measurement points used for validation' },
              ]}
            />
          </Section>

          <Section id="performance" title="Real-Time Performance">
            <p>
              LOTUSim's interactivity is evaluated on four metrics that directly impact human
              perception and control precision: visual frame rate, physics update rate,{' '}
              <strong className="font-semibold text-foreground">real-time factor (RTF)</strong>, and
              behaviour under large-scale heterogeneous scenarios. On a single high-end workstation
              (RTX&nbsp;4090&nbsp;Laptop, ROS2&nbsp;Humble), LOTUSim keeps the physics update rate
              within the 200&nbsp;ms perceptual-responsiveness threshold while{' '}
              <strong className="font-semibold text-foreground">scaling up to 750 Long-Range Autonomous Underwater Vehicles or 450 BlueROVs</strong>.
            </p>
            <Figure
              src={rtfImg}
              alt="Line chart of real-time factor versus number of agents at a 30 millisecond control loop, for LOTUSim BlueROV and LOTUSim LRAUV, both staying above real time."
              caption="Fig. 5 - Real-time factor (RTF) as a function of fleet size at a 30 ms control loop. A single agent exceeds RTF 20 - headroom that can be traded for accelerated, faster-than-real-time AI training - while RTF stays above 1 as the swarm grows."
              light
            />
            <StatGrid
              stats={[
                { value: '750 / 450', label: 'Max LRAUVs / BlueROVs at responsive HITL update rate' },
                { value: 'FPS > 140', label: 'Sustained visual rendering rate across configurations' },
                { value: 'RTF ≥ 1', label: 'Maintained under a mixed 90-drone, 45-LRAUV, 45-BlueROV scenario' },
              ]}
            />
          </Section>

          <Section id="immersive-interaction" title="Immersive Interaction">
            <p>
              Beyond conventional keyboard and screen control, LOTUSim integrates sensors that capture{' '}
              <strong className="font-semibold text-foreground">human intent, motion, and cognitive state</strong>:
              a 6-DOF virtual-reality headset for immersive first-person operation, Leap Motion for
              gesture-based hand and finger tracking, and a non-immersive eye tracker for attention and
              fatigue monitoring. Onboard, a comparable sensor suite - LiDAR, radar, IMU,
              magnetometer, depth sensor, and RGB camera - publishes to standard ROS2 topics for
              autonomous perception.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Figure
                src={vrInteractionImg}
                alt="An operator wearing a VR headset while monitoring aerial and underwater assets on two large screens."
                caption="Fig. 3a - An operator monitoring aerial and underwater assets through LOTUSim's VR interface."
              />
              <Figure
                src={natureInterfaceImg}
                alt="An operator using hand gestures to control a surface vessel shown on screen."
                caption="Fig. 3b - Gesture-based vessel control via Leap Motion hand tracking."
              />
            </div>
          </Section>

          <Section id="sim-to-real" title="Sim-to-Real Validation">
            <p>
              Prior work transferred a{' '}
              <strong className="font-semibold text-foreground">fault-tolerant control strategy</strong>{' '}
              for the BlueROV2 Heavy from LOTUSim to a physical platform: the controller was first
              designed and evaluated in simulation, then validated in real-world pool trials, where it
              dynamically adapted motor commands in response to faults without relying on explicit fault
              diagnosis - confirming that{' '}
              <strong className="font-semibold text-foreground">behaviour learned in LOTUSim transfers to the real vehicle</strong>.
            </p>
            <Figure
              src={simToRealImg}
              alt="A BlueROV2 underwater vehicle floating in a test pool, held by a mounting arm."
              caption="Fig. 4 - Sim-to-real transfer for the BlueROV2 Heavy: the fault-tolerant controller validated in LOTUSim, tested here in the pool."
            />
          </Section>

          <Section id="video" title="Video">
            <p>
              A recorded demonstration of LOTUSim's human-in-the-loop sensing and multi-domain
              simulation, referenced in the paper.
            </p>
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${VIDEO_ID}`}
                  title="LOTUSim demonstration video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
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
