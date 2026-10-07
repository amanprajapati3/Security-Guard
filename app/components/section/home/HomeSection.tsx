import SecurityAbout from "../../homelayout/AboutSection";
import SecurityBanner from "../../homelayout/Banner";
import SecurityCta from "../../homelayout/CTA";
import SecurityIndustries from "../../homelayout/IndustrySection";
import SecurityServices from "../../homelayout/ServiceSection";
import SecurityStats from "../../homelayout/Stats";
import SecurityTestimonial from "../../homelayout/TestimonialSection";

export default function HomeSection(){
    return(
        <>
        <SecurityBanner/>
        <SecurityAbout/>
        <SecurityServices/>
        <SecurityIndustries/>
        <SecurityStats/>
        <SecurityTestimonial/>
        <SecurityCta/>
        </>

    )
}