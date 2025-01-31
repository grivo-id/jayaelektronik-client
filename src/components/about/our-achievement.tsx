type Props = {
  lang: Function;
};

export default function OurAchievement({ lang }: Props) {
  return (
    <>
      <span className="font-medium tracking-wide text-2xl text-gray-600">
        {lang('achievement-title')}
      </span>

      <div className="flex flex-col gap-2">
        <span>
          At JayaElektronik, we take immense pride in our journey and the
          milestones we’ve achieved over the years. Since our founding in 2005,
          we have grown to become the leading electronics retailer in Papua,
          Indonesia, serving thousands of satisfied customers across the region.
          Here are some of our proudest accomplishments:
        </span>
        <span>
          As the first and largest electronics store in Papua, we have played a
          key role in bringing cutting-edge technology to the region. From
          smartphones and laptops to home appliances and entertainment systems,
          we’ve made the latest innovations accessible to everyone.
        </span>
        <span>
          What started as a single store has now grown into a network of 3
          branches strategically located in Jayapura, Merauke, and Biak. This
          expansion allows us to serve more communities and provide exceptional
          service to customers across Papua.
        </span>
        <span>
          We are proud to partner with the world’s leading electronics brands,
          including Samsung, LG, Sony, and Apple. These partnerships enable us
          to offer our customers the latest and most reliable products on the
          market.
        </span>
        <span>
          Our dedication to excellence has been recognized with multiple awards,
          including Best Electronics Retailer in Papua and Customer Service
          Excellence Award. These accolades reflect our unwavering commitment to
          providing the best shopping experience.
        </span>
      </div>
    </>
  );
}
