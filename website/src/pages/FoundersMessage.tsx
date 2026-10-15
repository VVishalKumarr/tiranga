import { usePageTitle } from "../usePageTitle";

export default function FoundersMessage() {
  usePageTitle("Founder's Message — The Sudharshan Summit");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Founder's Message</p>
        <h1 className="mt-3 font-serif text-5xl text-foreground">Mr. Ahaan Mahajan</h1>
        <p className="mt-2 text-sm text-muted-foreground">Founder, The Sudharshan Summit</p>
      </header>
      <div className="grid gap-10 md:grid-cols-[1fr_280px] md:items-start">
        <div className="order-2 space-y-5 leading-relaxed text-foreground/85 md:order-1">
          <p>
            We are often called the youth. Some may call us children. Some may even dismiss us entirely. Yet
            one truth remains undeniable: we are the future—not only of our nation, but of the world we all
            share.
          </p>
          <p>
            Too often, the world tells us what to think, what is right, and what is wrong, without first
            choosing to hear our voices. But perhaps the world isn't beyond saving. Perhaps we are simply
            following the path that has been laid before us.
          </p>
          <p>
            That belief is what inspired the name <span className="text-primary">The Sudharshan Summit</span>.
          </p>
          <p>
            The Sudharshan Chakra is widely recognised as a symbol of order and diplomacy. But beyond the symbol
            lies the one who wields it—Lord Vishnu. Among the Trimurti, Brahma creates, Shiva destroys, and
            Vishnu preserves. Rather than creating something new or destroying what exists, Vishnu chooses to
            protect and preserve.
          </p>
          <p>I believe that is the responsibility our generation inherits.</p>
          <p>
            In the years to come, we will lead our communities, our institutions, and our nations. We cannot
            rewrite the past, but we can preserve what is worth protecting while rebuilding what has been
            weakened. Our future will not simply be defined by innovation, but by our ability to safeguard the
            values that hold society together.
          </p>
          <p>
            You may wonder why our summit is named after the Sudharshan Chakra rather than Vishnu himself. The
            answer is simple: the Sudharshan Chakra represents diplomacy.
          </p>
          <p>
            Diplomacy is the foundation of every meaningful relationship. It strengthens friendships, enables
            communities to coexist, bridges differences, and prevents conflict. Without diplomacy, understanding
            gives way to division, and progress becomes impossible.
          </p>
          <p>That is why our vision has always been clear.</p>
          <p className="font-serif text-2xl text-primary">Preserving Diplomacy.</p>
        </div>
        <div className="order-1 mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-primary/25 shadow-[0_0_40px_-15px_oklch(0.83_0.13_88_/_40%)] md:order-2">
          <img
            src="/images/ahaan-mahajan.jpg"
            alt="Mr. Ahaan Mahajan, Founder of The Sudharshan Summit"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
