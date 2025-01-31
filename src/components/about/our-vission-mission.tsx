type Props = {
  lang: Function;
};

export default function OurVissionMission({ lang }: Props) {
  return (
    <>
      <span className="font-medium tracking-wide text-2xl text-gray-600">
        {lang('visionmission-title')}
      </span>
      <div className="flex flex-col gap-2">
        <span>
          Our mission at JayaElektronik is to deliver exceptional customer
          experiences by offering high-quality products, competitive pricing,
          and personalized service that meets the unique needs of our community.
          We are committed to making the latest electronic products and
          technologies accessible to everyone in Papua, regardless of their
          location or budget. Through partnerships with the world’s leading
          electronics brands, we ensure our customers have access to the most
          reliable and innovative products on the market.
        </span>
        <span>
          We also believe in giving back to the community by providing
          technology education, training, and support to individuals and
          businesses. Sustainability is at the core of our operations, and we
          promote environmentally responsible practices by offering
          energy-efficient products and implementing sustainable business
          processes. Above all, we are dedicated to continuous innovation,
          staying ahead of industry trends, and improving our offerings to
          ensure our customers always have access to the best technology
          solutions.
        </span>
      </div>
    </>
  );
}
