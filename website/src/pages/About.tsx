import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../usePageTitle";

export default function About() {
  usePageTitle("About — Tiranga");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PageHeader eyebrow="About" title="Our Vision" />
      <div className="space-y-5 leading-relaxed text-foreground/85">
        <p>
          At Tiranga, we envision creating a gateway for the youth—the leaders of tomorrow—to truly
          understand and engage with diplomacy and international affairs through academic simulations. In a
          world where global challenges are becoming increasingly complex, we believe it is important for the
          young minds of this generation to be equipped not only with knowledge, but with the ability to think
          critically, communicate effectively, and lead with perspective.
        </p>
        <p>
          Guided by our motto, <em className="text-primary">"By the youth, for the youth."</em> Tiranga is
          built on the belief that the most powerful ideas emerge when young individuals are given the platform
          to express, challenge, and refine their thoughts. We aim to create an environment where students are
          not just passive participants, but active contributors to meaningful dialogue and debate.
        </p>
        <p>
          We strive to bridge the gap between learning and application—allowing delegates to step into the
          shoes of global leaders, navigate real-world issues, and develop essential skills in diplomacy,
          negotiation, and public speaking. Every discussion, every committee, and every interaction is
          designed to foster confidence, awareness, and a deeper understanding of the world around us.
        </p>
        <p>
          This is why Tiranga stands as a truly youth-led conference—where we do not just
          participate, but also take the initiative to organise, lead, and shape the experience ourselves.
        </p>
      </div>
    </div>
  );
}
