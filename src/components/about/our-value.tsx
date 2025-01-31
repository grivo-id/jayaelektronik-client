type Props = {
  lang: Function;
};

export default function OurValue({ lang }: Props) {
  return (
    <>
      <span className="font-medium tracking-wide text-2xl text-gray-600">
        {lang('value-title')}
      </span>
      <div className="flex flex-col gap-2">
        <span>
          Our customers are at the heart of everything we do. We strive to
          understand their needs, exceed their expectations, and build lasting
          relationships by delivering exceptional service and high-quality
          products.
        </span>
        <span>
          We believe in doing business the right way. Honesty, fairness, and
          transparency are the cornerstones of our operations, ensuring trust
          and credibility with our customers, partners, and employees.
        </span>
        <span>
          We are passionate about staying ahead of the curve. By embracing
          innovation and continuously improving our offerings, we ensure our
          customers have access to the latest and most reliable technology
          solutions.
        </span>
        <span>
          As a proud member of the Papua community, we are dedicated to giving
          back. Through initiatives like technology education programs and
          community support, we aim to empower individuals and contribute to the
          region’s growth.
        </span>
        <span>
          We care about the environment and future generations. By promoting
          energy-efficient products and adopting sustainable practices, we aim
          to minimize our environmental impact and contribute to a greener
          future.
        </span>
        <span>
          Our team is our greatest asset. We foster a culture of collaboration,
          respect, and inclusivity, where every employee is valued and empowered
          to contribute to our shared success.
        </span>
      </div>
    </>
  );
}
