import { FolderOpen, PlayCircle } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Cite, DocTable } from '../../components/document/Doc';
import { GithubIcon } from '../../components/icons';
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
import overviewImg from '../../assets/resources/lotusim-cooperative-exploration/training-deployment.svg';
import snapshotImg from '../../assets/resources/lotusim-cooperative-exploration/decision-snapshot.svg';
import baselinesImg from '../../assets/resources/lotusim-cooperative-exploration/baselines.svg';
import lotusimTopFinalImg from '../../assets/resources/lotusim-cooperative-exploration/lotusim-top-final.svg';
import lotusimTopNearestImg from '../../assets/resources/lotusim-cooperative-exploration/lotusim-top-nearest.svg';
import lotusimTrialsImg from '../../assets/resources/lotusim-cooperative-exploration/lotusim-trials.svg';

const resource = (resourcesData as Resource[]).find((entry) => entry.slug === 'lotusim-cooperative-exploration')!;
const project = getProject(resource.project);
const projectResourceCount = getProjectResources(resource.project).length;

const ASSETS = '/resources/lotusim-cooperative-exploration';
const DEMO_VIDEO = `${ASSETS}/demo/lotusim-demo.mp4`;
const VIDEO_LINK = { href: DEMO_VIDEO, label: 'Video (MP4)', icon: PlayCircle };
const LOTUSIM_REPO_LINK = { href: 'https://github.com/IRL-Crossing-CNRS/LOTUSim', label: 'Code', icon: GithubIcon };
const LINKS = [VIDEO_LINK, LOTUSIM_REPO_LINK];

// Time to 95% coverage, counted from the team's first decision.
const MISSION_STILLS = [
  { uavs: 3, seconds: 179 },
  { uavs: 4, seconds: 125 },
  { uavs: 5, seconds: 138 },
].map((still) => ({
  ...still,
  gif: `${ASSETS}/replays/replay-${still.uavs}-uavs.gif`,
}));

const NAV_ITEMS = [
  { id: 'demo', label: 'Video' },
  { id: 'abstract', label: 'Abstract' },
  { id: 'approach', label: 'How It Works' },
  { id: 'simulator-results', label: 'Results in Training' },
  { id: 'lotusim-results', label: 'Results in LOTUSim' },
  { id: 'larger-teams', label: 'Larger Teams' },
  { id: 'future-work', label: 'Future Work in LOTUSim' },
  { id: 'limitations', label: 'Limitations' },
  { id: 'references', label: 'References' },
];

// Numbered in order of first citation on the page.
const REFERENCES: { id: number; text: string; href?: string; link?: string; internal?: string }[] = [
  {
    id: 1,
    text: 'B. Yamauchi, “A frontier-based approach for autonomous exploration,” in Proc. IEEE International Symposium on Computational Intelligence in Robotics and Automation (CIRA), 1997, pp. 146–151.',
    href: 'https://doi.org/10.1109/CIRA.1997.613851',
    link: 'doi:10.1109/CIRA.1997.613851',
  },
  {
    id: 2,
    text: 'B. Zhou, H. Xu and S. Shen, “RACER: Rapid collaborative exploration with a decentralized multi-UAV system,” IEEE Transactions on Robotics, vol. 39, no. 3, pp. 1816–1835, 2023.',
    href: 'https://doi.org/10.1109/TRO.2023.3236945',
    link: 'doi:10.1109/TRO.2023.3236945',
  },
  {
    id: 3,
    text: 'X. Yan, M. Zhang, Y. Fang, Y. Sun, J. Ma, Y. Gong, B. Zhou and J. Mei, “C²-Explorer: Contiguity-driven task allocation with connectivity-aware task representation for decentralized multi-UAV exploration,” 2026.',
    href: 'https://arxiv.org/abs/2603.07699',
    link: 'arXiv:2603.07699',
  },
  {
    id: 4,
    text: 'P. Song and H. Yang, “FA-MARL: Frontier assignment with multi-agent reinforcement learning for efficient decentralized multi-robot exploration,” in Proc. 20th IEEE International Conference on Control and Automation (ICCA), 2026, p. 1722.',
    href: 'https://doi.org/10.1109/ICCA69928.2026.11618240',
    link: 'doi:10.1109/ICCA69928.2026.11618240',
  },
  {
    id: 5,
    text: 'C. Yu, A. Velu, E. Vinitsky, J. Gao, Y. Wang, A. Bayen and Y. Wu, “The surprising effectiveness of PPO in cooperative multi-agent games,” 2021.',
    href: 'https://arxiv.org/abs/2103.01955',
    link: 'arXiv:2103.01955',
  },
  {
    id: 6,
    text: 'C. Buche, J. Grosset, H. Lechêne, M. Dubromel, P. Havez-Bodivit, M. Neo and J. Prodhon, “LOTUSim: Multi-domain simulator for marine robotics,” in Proc. IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2026.',
    internal: '/resources/lotusim-iros2026',
    link: 'Project page',
  },
  {
    id: 7,
    text: 'D. S. Chaplot, D. Gandhi, A. Gupta and R. Salakhutdinov, “Object goal navigation using goal-oriented semantic exploration,” in Advances in Neural Information Processing Systems (NeurIPS), 2020.',
    href: 'https://arxiv.org/abs/2007.00643',
    link: 'arXiv:2007.00643',
  },
  {
    id: 8,
    text: 'O. Bagoren, S. Isaacson, S. Sundar, Y.-C. Sun, A. Sheppard, H. Ma, A. Shariff, R. Vasudevan and K. A. Skinner, “SurfSLAM: Sim-to-real underwater stereo reconstruction for real-time SLAM,” 2026.',
    href: 'https://arxiv.org/abs/2601.10814',
    link: 'arXiv:2601.10814',
  },
  {
    id: 9,
    text: 'R. Tanaka and A. Harada, “UnitySensors: Robot sensor simulation for Unity,” Field-Robotics-Japan, software, Apache License 2.0.',
    href: 'https://github.com/Field-Robotics-Japan/UnitySensors',
    link: 'github.com/Field-Robotics-Japan/UnitySensors',
  },
];

function Term({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

function Subheading({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 text-xl font-semibold tracking-tight text-foreground">{children}</h3>;
}

export default function LotusimCooperativeExploration() {
  useRegisterSectionNav(NAV_ITEMS);
  const [teamSize, setTeamSize] = useState(3);
  const replay = MISSION_STILLS.find((still) => still.uavs === teamSize)!;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-16">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-16">
        <div className="max-w-3xl">
          <ResourceHero
            eyebrow="Project overview"
            title={resource.title}
            authors={resource.authors}
            affiliations={resource.affiliations ?? []}
            projectSlug={project.slug}
            projectName={project.name}
            resourceCount={projectResourceCount}
            extraLinks={LINKS}
          />

          <Section id="demo" title="Video" noDivider>
            <figure>
              <video
                controls
                playsInline
                preload="none"
                poster={`${ASSETS}/demo/lotusim-demo.jpg`}
                width={1920}
                height={1080}
                className="h-auto w-full rounded-xl border border-border bg-black"
                aria-label="LOTUSim exploration recording with map inset at twice normal speed"
              >
                <source src={DEMO_VIDEO} type="video/mp4" />
                <a href={DEMO_VIDEO}>Download the LOTUSim demonstration</a>
              </video>
              <figcaption className="mt-3 text-sm text-muted">
                Exploration in LOTUSim at 2× speed, with the exploration map shown in the inset.{' '}
                <a href={DEMO_VIDEO} download className="text-accent hover:underline">
                  Download video
                </a>
              </figcaption>
            </figure>
          </Section>

          <Section id="abstract" title="Abstract">
            <p>
              A team of UAVs exploring an unknown area has to keep deciding{' '}
              <Term>where each vehicle should go next</Term>. Classical frontier methods make that choice with a fixed
              rule, such as &ldquo;go to the nearest unexplored edge&rdquo;, which is cheap but sends vehicles back and
              forth over space that is already mapped <Cite refs={[1]} />. Dedicated multi-UAV systems such as RACER{' '}
              <Cite refs={[2]} /> and C²-Explorer <Cite refs={[3]} /> coordinate decentralized teams by dividing the
              space and allocating exploration tasks between vehicles. This project adapts FA-MARL{' '}
              <Cite refs={[4]} /> from 2D ground robots to <Term>3D multi-UAV exploration</Term>: the classical mapping
              and planning pipeline stays, and a policy trained with multi-agent reinforcement learning (MAPPO{' '}
              <Cite refs={[5]} />) only decides how each UAV trades travel distance against new information.
            </p>
            <p>
              The policy is trained in a lightweight 3D simulator and then runs{' '}
              <Term>unchanged inside{' '}
                <Link to="/resources/lotusim-iros2026" className="text-accent underline-offset-4 hover:underline">
                  LOTUSim
                </Link>
              </Term>{' '}
              <Cite refs={[6]} />, with Unity ray sensing and PX4 software-in-the-loop multirotors. Over 10 LOTUSim missions per method, it maps a minefield scenario{' '}
              <Term>about 2.1 times faster</Term> on average than classical baselines, and it also works with four and five UAVs
              without retraining. All results come from simulation.
            </p>
            <Figure
              src={overviewImg}
              light
              alt="Diagram of the pipeline. Top: training in a voxel simulator, where a shared actor picks a weight for each UAV, frontier selection and 3D A-star turn it into a route, and rewards feed a MAPPO update. Bottom: deployment in LOTUSim, where Unity raycasts feed a Python ROS 2 node that maps, runs the trained actor and sends waypoints to PX4."
              caption="Fig. 1 - Training in a lightweight voxel simulator (top) and deployment of the same trained policy in LOTUSim with Unity sensing, ROS 2 and PX4 flight control (bottom)."
            />
          </Section>

          <Section id="approach" title="How It Works">
            <p>
              A <Term>frontier</Term> is the edge between mapped free space and unknown space <Cite refs={[1]} />; flying
              there always reveals something new. Every few seconds, each UAV scans with a 360° LiDAR, the UAVs merge what they have seen into
              one shared 3D map, and frontiers are extracted from it as candidate targets.
            </p>
            <p>
              The learned part is deliberately small: the policy outputs{' '}
              <Term>one number per UAV, a weight between 0 and 1</Term>. A high weight favours nearby frontiers; a low
              weight favours frontiers surrounded by a lot of unknown space, even if they are further away. The UAV scores
              every candidate with that weight, picks the best one and plans a collision-free route to it. Because the
              policy never steers the vehicle directly, each decision stays easy to explain, and the same classical
              pipeline can be compared directly with simple rules such as nearest-frontier.
            </p>
            <p>
              All UAVs share one policy, trained with MAPPO for about 16 hours on one GPU workstation. A reward
              encourages fast team coverage and penalises rescanning known space or chasing the same region as a teammate.
            </p>
            <Figure
              src={snapshotImg}
              light
              alt="Top-down view of a partially explored map with three UAVs, their flown paths, chosen targets and planned routes toward three different unexplored regions."
              caption="Fig. 2 - One decision of the final model on an unseen map: the three UAVs pick targets in three different unexplored regions (stars) and plan routes to them."
            />
          </Section>

          <Section id="simulator-results" title="Results in the Training Simulator">
            <p>
              Before LOTUSim, the final model was tested in the <Term>lightweight training simulator</Term> on 20 maps it
              had never seen, one mission per map, against two classical rules that use exactly the
              same mapping and planner: <Term>nearest-frontier</Term>, where every UAV goes to its closest frontier, and{' '}
              <Term>Voronoi assignment</Term>, where each UAV only takes frontiers closer to it than to any teammate. The
              metric is the time for the team to map 95% of the reachable free space.
            </p>
            <StatGrid
              stats={[
                {
                  value: '175 s',
                  label:
                    'Mean time to 95% over 20 unseen maps in the training simulator; baselines 585 s nearest-frontier, 583 s Voronoi',
                },
                { value: '20 / 20', label: 'Unseen maps on which the final model finished first' },
                { value: '~60%', label: 'Less total flight distance than either baseline' },
              ]}
            />
            <Figure
              src={baselinesImg}
              light
              alt="Two bar charts. Mean time to map 95 percent: nearest frontier 585 seconds, Voronoi 583 seconds, final model 175 seconds. Mean team flight distance: nearest frontier 2,508 metres, Voronoi 2,450 metres, final model 972 metres."
              caption="Fig. 3 - Training simulator, not LOTUSim: averages over 20 unseen test maps. Left: time to map 95% of the reachable free space. Right: total distance flown by the team."
            />
          </Section>

          <Section id="lotusim-results" title="Results in LOTUSim">
            <p>
              In LOTUSim, a raycast sensor added to each UAV in Unity sends its ranges over ROS 2 to the exploration
              planner, which builds the maps, runs the trained policy and sends routes to{' '}
              <Term>PX4 software-in-the-loop multirotors</Term> simulated in Gazebo. The trained policy file is loaded
              unchanged.
            </p>
            <p>
              The test scenario places three PX4 X500 multirotors over open water in LOTUSim&rsquo;s offshore wind-farm
              scene, with <Term>60 floating mines</Term> at different heights in a 125&nbsp;m × 125&nbsp;m area. Each
              method — the final model, nearest-frontier and Voronoi — flew{' '}
              <Term>10 missions in LOTUSim from the same start positions</Term>. Each mission is timed from the
              team&rsquo;s first decision until 95% of the reachable free space is mapped. The numbers below are{' '}
              <Term>means over those 10 missions</Term>. The gap seen in training holds: even the slowest of the final
              model&rsquo;s 10 missions (269&nbsp;s) was faster than the fastest baseline mission (357&nbsp;s).
            </p>
            <StatGrid
              stats={[
                {
                  value: '211 s',
                  label:
                    'Mean time to 95% over the final model’s 10 LOTUSim missions (SD 23.5 s); baselines 433 s nearest-frontier, 439 s Voronoi',
                },
                { value: '~2.1×', label: 'Faster than either baseline, comparing the 10-mission means' },
                {
                  value: '~41%',
                  label: 'Less team flight distance than either baseline (10-mission means: 1,024 m vs 1,747 m and 1,736 m)',
                },
              ]}
            />
            <Figure
              src={lotusimTrialsImg}
              light
              alt="Dot plot of the time to 95 percent coverage for every LOTUSim mission, ten per method. Final model: dots between about 190 and 269 seconds, mean 211 seconds. Nearest frontier: mean 433 seconds. Voronoi: mean 439 seconds."
              caption="Fig. 4 - All 30 LOTUSim missions (10 per method, three UAVs). Each dot is one mission and the black bar is the 10-mission mean quoted above."
            />
            <p>
              The paths below come from <Term>one mission per method</Term>, the first of each method&rsquo;s 10, so
              the time and distance in each plot title belong to that mission only and differ from the 10-mission means
              above.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Figure
                src={lotusimTopFinalImg}
                light
                alt="Top-down paths of three UAVs under the final model in its first LOTUSim mission: each sweeps its own part of the minefield; 95 percent in 192 seconds after 971 metres."
                caption="Fig. 5a - Final model, mission 1 of 10 (“MAPPO run 013” in the plot title): 95% coverage in 192 s with 971 m flown. Each UAV sweeps its own part of the field."
              />
              <Figure
                src={lotusimTopNearestImg}
                light
                alt="Top-down paths of three UAVs under nearest frontier in its first LOTUSim mission: the paths wind back and forth and overlap; 95 percent in 442 seconds after 1,700 metres."
                caption="Fig. 5b - Nearest-frontier, mission 1 of 10: 95% coverage in 442 s with 1,700 m flown. The UAVs keep doubling back through space that is already mapped."
              />
            </div>
          </Section>

          <Section id="larger-teams" title="Larger Teams Without Retraining">
            <p>
              The policy sees its teammates through a single map of their positions, so it does not depend on how many
              there are. The same policy, trained with three UAVs, was also flown in LOTUSim with{' '}
              <Term>four and five UAVs</Term>, and the larger teams split the field between them without retraining.
              Each team size was flown in <Term>one separate LOTUSim mission</Term>, not part of the 10-mission
              comparison above, so the times shown are single-mission results, not means. They show that the policy
              carries over, not exactly how much each extra UAV helps.
            </p>
            <figure>
              <div className="mb-3 flex gap-2" role="group" aria-label="Choose a mission replay">
                {MISSION_STILLS.map(({ uavs }) => (
                  <button
                    key={uavs}
                    type="button"
                    aria-pressed={uavs === teamSize}
                    onClick={() => setTeamSize(uavs)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-colors duration-200 ${
                      uavs === teamSize ? 'border-accent text-accent' : 'border-border text-foreground hover:border-accent'
                    }`}
                  >
                    {uavs} UAVs
                  </button>
                ))}
              </div>
              <a href={replay.gif} target="_blank" rel="noreferrer noopener" aria-label={`Open the ${teamSize}-UAV mission replay`}>
                <img
                  src={replay.gif}
                  loading="lazy"
                  alt={`Looping replay of the recorded LOTUSim mission with ${teamSize} UAVs`}
                  className="mx-auto max-h-[560px] w-auto max-w-full rounded-xl border border-border bg-white object-contain"
                />
              </a>
              <p className="mt-1 text-center text-xs text-muted">
                {teamSize} UAVs · single mission · 95% coverage in {replay.seconds} s
              </p>
              <figcaption className="mt-3 text-sm text-muted">
                Fig. 6 - Accelerated 3D replay reconstructed from the recorded LOTUSim mission for each team size, one
                mission each with three, four and five UAVs (a data replay, not a camera recording). Explored space is coloured by the UAV that sensed it; black
                blocks are detected mines.
              </figcaption>
            </figure>
          </Section>

          <Section id="future-work" title="Future Work in LOTUSim">
            <p>
              This work shows that a learned policy can make mission-level decisions inside LOTUSim, not only drive a
              vehicle. Four directions would build on that: training the policy inside LOTUSim itself, two new missions
              in LOTUSim&rsquo;s aerial and underwater scenes, and a more realistic, reusable set of sensors that these
              and other missions could share.
            </p>
            <Subheading>Training inside LOTUSim</Subheading>
            <p>
              The policy is currently trained in a lightweight voxel simulator and only meets LOTUSim at deployment. The
              two worlds differ in ways that matter: LOTUSim has Unity raycasts against real colliders instead of exact
              voxel rays, PX4 multirotor dynamics instead of constant-speed motion, and UAVs that decide one at a time
              instead of all together. Some effects, such as mine surfaces that only partly fill a voxel, appear only in
              LOTUSim. Training in LOTUSim, where the policy is deployed, would let it learn these effects directly
              instead of meeting them for the first time at test time.
            </p>
            <p>
              Reinforcement learning needs many episodes, so LOTUSim would run <Term>headless</Term> (Unity in batch
              mode, since raycast sensing does not need rendering) and collect experience from{' '}
              <Term>several environments in parallel</Term>. Parallel environments can be run in two ways (Table 1).
            </p>
            <DocTable
              id="tab-parallel"
              number={1}
              caption="Two ways to run parallel training environments in LOTUSim."
              head={['', 'One instance, tiled environments', 'Several instances, one environment each']}
              rows={[
                ['Setup', 'One LOTUSim with several 3-UAV arenas placed far apart in the same world', 'Several headless LOTUSim instances, each running the deployment scenario'],
                ['Resetting one environment', 'Respawn its mines and reposition its PX4 vehicles while the others keep flying', "Reload that instance's world; the others are unaffected"],
                ['Changes to LOTUSim', 'Arena offsets, per-environment reset, keeping sensors from seeing other arenas', 'Few; each instance matches the deployment setup'],
                ['Failures', 'A crash or stuck vehicle stops every environment', 'Only one environment stops'],
                ['CPU use', 'Limited by mostly single-threaded physics and the Unity main loop', 'Each instance runs on its own cores'],
                ['Memory and startup', 'Low: Unity, Gazebo and the scene load once', 'Higher: every instance loads everything'],
                ['Scaling', 'One machine', 'Across machines or a cluster'],
              ]}
            />
            <p>
              Which option suits LOTUSim, or a combination of both, is still to be researched.
            </p>
            <Subheading>Object-goal exploration</Subheading>
            <p>
              In object-goal navigation <Cite refs={[7]} />, an agent is given a target
              object, explores an unseen area, recognises the object with its onboard camera and moves to it. Chaplot et
              al. learn where to look next on a semantic map built from the camera images, an approach that won the 2020
              Habitat object-goal navigation challenge in indoor house scenes. Moving this idea into LOTUSim&rsquo;s
              maritime and aerial scenes, for example &ldquo;find the drifting boat&rdquo; or &ldquo;find the mine closest
              to the turbine&rdquo;, would turn exploration from mapping everything into a goal-driven, vision-based
              mission, across aerial, surface and underwater vehicles.
            </p>
            <Subheading>Underwater 3D mapping</Subheading>
            <p>
              SurfSLAM <Cite refs={[8]} /> builds an accurate 3D map of a shipwreck in
              real time with a BlueROV2. Camera depth usually fails underwater because of murky water, poor lighting and
              plain surfaces; SurfSLAM addresses this by training a stereo depth network on simulated underwater images
              and fine-tuning it on real footage. LOTUSim already simulates underwater vehicles and scenes, so it could
              supply simulated training images of this kind. Combining such a mapping pipeline with this exploration
              policy would let an underwater vehicle decide where to look next while it builds the map.
            </p>
            <Subheading>More realistic, reusable sensors</Subheading>
            <p>
              The LiDAR used in this work was written from scratch for the exploration task: an ideal sensor that
              returns exact ranges in a custom message only this pipeline reads.{' '}
              UnitySensors <Cite refs={[9]} /> is an open-source Unity
              package that simulates LiDARs modelled on real Velodyne and Livox units, RGB and RGB-D cameras, an IMU and
              GNSS, and publishes them as standard ROS messages through the same bridge LOTUSim already uses. It would
              bring sensing closer to real hardware, give every LOTUSim mission a shared sensor library instead of
              custom sensors, and provide RGB-D cameras for vision-based missions such as object-goal exploration.
            </p>
          </Section>

          <Section id="limitations" title="Limitations">
            <ul className="list-disc space-y-3 pl-5 marker:text-muted">
              <li>
                <Term>Trained outside LOTUSim.</Term> The policy learns in a simplified voxel world, so some LOTUSim effects
                only appear at deployment. For example, mine surfaces cut through voxels, so partly filled voxels can be
                mapped as obstacles and leave frontiers that cannot be resolved. A training simulator that matches LOTUSim
                more closely, or training inside LOTUSim, is the main improvement to make.
              </li>
              <li>
                <Term>One scenario.</Term> In LOTUSim the policy has been tested on one environment, the minefield, from
                one start position. Offline, it was trained with one map size, obstacle density and team size.
              </li>
              <li>
                <Term>Fixed input size.</Term> The policy reads a fixed 125&nbsp;m × 125&nbsp;m × 24&nbsp;m volume; larger
                areas need tiling or retraining.
              </li>
              <li>
                <Term>Simulation only.</Term> PX4 flies software-in-the-loop vehicles and Unity renders the sensing; no
                physical UAV has flown.
              </li>
            </ul>
          </Section>

          <Section id="references" title="References">
            <ol className="space-y-3 text-left text-sm leading-relaxed">
              {REFERENCES.map(({ id, text, href, link, internal }) => (
                <li key={id} id={`ref-${id}`} className="grid scroll-mt-32 grid-cols-[2.25rem_1fr]">
                  <span className="tabular-nums">[{id}]</span>
                  <span>
                    {text}{' '}
                    {internal ? (
                      <Link to={internal} className="text-accent hover:underline">
                        {link}
                      </Link>
                    ) : (
                      <a href={href} target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
                        {link}
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </Section>
        </div>

        <aside className="hidden lg:sticky lg:top-24 lg:block lg:space-y-6">
          <SidebarCard title="Links">
            <SidebarLinks links={LINKS} />
            {/* A page on this site: opens in the same tab through the router, unlike the external links above. */}
            <Link
              to={`/projects/${project.slug}`}
              className="mt-2 flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <FolderOpen size={14} />
              {project.name} project
            </Link>
          </SidebarCard>
          <SidebarCard title="Tags">
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted">
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
