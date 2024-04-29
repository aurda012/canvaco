import { infos } from "@/config/marketing";
import { BentoGrid } from "@/components/marketing/bentogrid";
import { Features } from "@/components/marketing/features";
import { HeroLanding } from "@/components/marketing/hero-landing";
import { InfoLanding } from "@/components/marketing/info-landing";
import { Powered } from "@/components/marketing/powered";
import { PreviewLanding } from "@/components/marketing/preview-landing";
import { Testimonials } from "@/components/marketing/testimonials";

const Page = () => {
  return (
    <>
      <HeroLanding />
      <PreviewLanding />
      <Powered />
      <BentoGrid />
      <InfoLanding data={infos[0]} reverse={true} />
      <InfoLanding data={infos[1]} reverse={false} />
      {/* <Features /> */}
      {/* <Testimonials /> */}
    </>
  );
};
export default Page;
